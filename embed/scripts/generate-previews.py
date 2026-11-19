#
# Copyright (C) Ascensio System SIA, 2009-2026
#
# This program is a free software product. You can redistribute it and/or
# modify it under the terms of the GNU Affero General Public License (AGPL)
# version 3 as published by the Free Software Foundation, together with the
# additional terms provided in the LICENSE file.
#
# This program is distributed WITHOUT ANY WARRANTY; without even the implied
# warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
# details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
#
# You can contact Ascensio System SIA by email at info@onlyoffice.com
# or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
# LV-1050, Latvia, European Union.
#
# The interactive user interfaces in modified versions of the Program
# are required to display Appropriate Legal Notices in accordance with
# Section 5 of the GNU AGPL version 3.
#
# No trademark rights are granted under this License.
#
# All non-code elements of the Product, including illustrations,
# icon sets, and technical writing content, are licensed under the
# Creative Commons Attribution-ShareAlike 4.0 International License:
# https://creativecommons.org/licenses/by-sa/4.0/legalcode
#
# This license applies only to such non-code elements and does not
# modify or replace the licensing terms applicable to the Program's
# source code, which remains licensed under the GNU Affero General
# Public License v3.
#
# SPDX-License-Identifier: AGPL-3.0-only
#

"""
Renders template previews with ONLYOFFICE Document Builder.

For each .docx, .pdf, .pptx and .xlsx under INPUT (a file or a directory), writes
next to its path under OUTPUT_DIR:
  <name>.card.webp     page 1, 480 px wide
  <name>.page.<n>.webp pages 1-10, 1024 px wide
Pages keep their own proportions. A spreadsheet ignores its paper: each sheet prints
landscape, one page wide, without margins, and its pages are trimmed to the content.
A file is skipped when its card is newer.

--strip first empties the author, the last editor and the catalog's custom properties
of every file that has any, and saves it over itself: the room keeps them, the bucket
does not (authors as onlyoffice/tools/metadata does). The properties it empties go to
<name>.meta.json, {} when there were none, written even when the render then fails.

Usage:
  pip3 install document-builder==10.0.0.170 pillow
  python3 embed/scripts/generate-previews.py [--strip] INPUT OUTPUT_DIR

Env: DOCBUILDER_LICENSE, path to license.xml. Without it every page is
watermarked "Unregistered Version".
"""

import io
import json
import os
import sys
import tempfile
import zipfile

import docbuilder
from PIL import Image, ImageOps

EXTS = {".docx", ".pdf", ".pptx", ".xlsx"}
CARD_WIDTH = 480
PAGE_WIDTH = 1024
MAX_PAGES = 10
QUALITY = 80

# Undocumented: SaveFile hands these to x2t as is (core docbuilder_p.h). Without
# them form fields lose their placeholders and highlight, as in tools/thumbnails.
LAYOUT = '"documentLayout":{"drawPlaceHolders":true,"drawFormHighlight":true,"isPrint":true}'
# aspect 1 fits the page in the box at its own proportions, so the box only has to be taller
# than any page for the width to bind; the catalog's tallest page is 2.0 times its width.
THUMBNAIL = (
    "<m_oThumbnail><format>4</format><aspect>1</aspect><first>false</first>"
    f"<width>{PAGE_WIDTH}</width><height>{PAGE_WIDTH * 4}</height></m_oThumbnail>"
)
# Landscape A4 is only the widest page the fit can fill: content narrower than it keeps 100%,
# wider shrinks to fit, and the trim then drops the paper. The print area is every formatted
# cell, so a sheet with formatting past its content prints small (fix the file, not this).
FIT = (
    "Api.GetSheets().forEach(function (s) { var p = s.GetPageSetup();"
    " p.SetOrientation('xlLandscape'); p.SetFitToPagesWide(1); p.SetFitToPagesTall(0);"
    " p.SetLeftMargin(0); p.SetRightMargin(0); p.SetTopMargin(0); p.SetBottomMargin(0); });"
)

# Builder cannot list or remove custom properties, so these are emptied by name: the same
# names the meta is written under.
META = ["slug", "category", "card-text", "description", "seo-title", "seo-description",
        "popular", "added", "card-title"]
# Where GetCore and GetCustomProperties live, and the save type. A pdf form opens as its
# docx, and saving it as OFORM_PDF puts the docx back inside.
TARGETS = {
    ".docx": ("Api.GetDocument()", "Api.GetDocument()", docbuilder.FileTypes.Document.DOCX),
    ".pdf": ("Api.GetDocument()", "Api.GetDocument()", docbuilder.FileTypes.Document.OFORM_PDF),
    ".pptx": ("Api.GetPresentation()", "Api.GetPresentation()", docbuilder.FileTypes.Presentation.PPTX),
    ".xlsx": ("Api", "Api.GetActiveWorkbook()", docbuilder.FileTypes.Spreadsheet.XLSX),
}
STRIP = (
    "(function () {{ var c = {core}.GetCore(), p = {props}.GetCustomProperties(), changed = false, m = {{}};"
    " if (c.GetCreator() || c.GetLastModifiedBy()) {{ c.SetCreator(''); c.SetLastModifiedBy(''); changed = true; }}"
    " {meta}.forEach(function (k) {{ var v = p.Get(k); if (v) {{ m[k] = v; p.Add(k, ''); changed = true; }} }});"
    " return JSON.stringify({{ changed: changed, meta: m }}); }})()"
)


# The stripped copy, or None when there was nothing to strip, and the properties emptied.
def strip(builder, src, tmp):
    core, props, file_type = TARGETS[os.path.splitext(src)[1].lower()]
    # Linux (V8) segfaults on reading the result outside an entered context; macOS (JSC) does not.
    context = builder.GetContext()
    result = docbuilder.CDocBuilderValue()
    ran = builder.ExecuteCommand(STRIP.format(core=core, props=props, meta=META), result)
    out = json.loads(result.ToString()) if ran else None
    del result, context
    # A plain pdf has no core, and sdkjs throws on the Gantt xlsx: both fail, checked by hand.
    if not ran:
        raise RuntimeError("strip script failed: a plain pdf, or sdkjs throws on the file (the Gantt xlsx)")
    if not out["changed"]:
        return None, out["meta"]
    saved = os.path.join(tmp, "stripped" + os.path.splitext(src)[1])
    error = builder.SaveFile(file_type, saved)
    if error or not os.path.exists(saved):
        raise RuntimeError(f"SaveFile error {error} stripping")
    return saved, out["meta"]


def sources(root):
    if os.path.isfile(root):
        yield root, os.path.basename(root)
        return
    for folder, _, names in os.walk(root):
        for name in sorted(names):
            if os.path.splitext(name)[1].lower() in EXTS:
                path = os.path.join(folder, name)
                yield path, os.path.relpath(path, root)


def page_number(name):
    return int("".join(c for c in name if c.isdigit()) or 0)


def render(builder, src, stem, tmp, stripping):
    archive = os.path.join(tmp, "pages.zip")
    if os.path.exists(archive):
        os.remove(archive)
    # Both return an error code, 0 on success; the docs' bool is wrong. SaveFile also returns
    # 0 when x2t crashes (JSON in single quotes does that), so check the file too.
    error = builder.OpenFile(src, "")
    if error:
        raise RuntimeError(f"OpenFile error {error}")
    sheet = src.lower().endswith(".xlsx")
    stripped = None
    try:
        # Before FIT, which changes the page setup.
        if stripping:
            stripped, meta = strip(builder, src, tmp)
            with open(f"{stem}.meta.json", "w", encoding="utf-8") as f:
                json.dump(meta, f, ensure_ascii=False)
        if sheet and not builder.ExecuteCommand(FIT):
            raise RuntimeError("FIT script failed")
        error = builder.SaveFile(
            docbuilder.FileTypes.Graphics.PNG, archive, f"<m_sJsonParams>{{{LAYOUT}}}</m_sJsonParams>{THUMBNAIL}"
        )
    finally:
        builder.CloseFile()
        if stripped:
            os.replace(stripped, src)
    if error or not os.path.exists(archive):
        raise RuntimeError(f"SaveFile error {error}")

    folder = os.path.dirname(stem)
    prefix = os.path.basename(stem) + "."
    for name in os.listdir(folder):
        if name.startswith(prefix) and name.endswith(".webp"):
            os.remove(os.path.join(folder, name))

    with zipfile.ZipFile(archive) as pages:
        names = sorted(pages.namelist(), key=page_number)
        n = 0
        for name in names:
            if n == MAX_PAGES:
                break
            page = Image.open(io.BytesIO(pages.read(name))).convert("RGB")
            if sheet:
                box = ImageOps.invert(page).getbbox()
                if not box:
                    continue
                page = page.crop(box)
            n += 1
            page.save(f"{stem}.page.{n}.webp", quality=QUALITY, method=6)
            if n == 1:
                height = round(page.height * CARD_WIDTH / page.width)
                card = page.resize((CARD_WIDTH, height), Image.LANCZOS)
                card.save(f"{stem}.card.webp", quality=QUALITY, method=6)
    os.remove(archive)
    if not n:
        raise RuntimeError("every page is blank")
    return n, bool(stripped)


def main():
    args = [a for a in sys.argv[1:] if a != "--strip"]
    if len(args) != 2:
        sys.exit(__doc__)
    root, out = args
    stripping = "--strip" in sys.argv

    license_path = os.environ.get("DOCBUILDER_LICENSE")
    if license_path and docbuilder.registerLibrary(license_path) != 0:
        sys.exit(f"cannot register {license_path}")

    builder = docbuilder.CDocBuilder()
    rendered = skipped = failed = 0
    with tempfile.TemporaryDirectory() as tmp:
        for src, rel in sources(root):
            stem = os.path.join(out, os.path.splitext(rel)[0])
            card = f"{stem}.card.webp"
            if os.path.exists(card) and os.path.getmtime(card) > os.path.getmtime(src):
                skipped += 1
                continue
            os.makedirs(os.path.dirname(stem), exist_ok=True)
            # Before the work: a crash in Builder kills the process with no line of its own.
            print(f"  · {rel}", flush=True)
            try:
                pages, stripped = render(builder, os.path.abspath(src), stem, tmp, stripping)
                rendered += 1
                print(f"  ✓ {rel}  {pages} pages{'  (stripped)' if stripped else ''}")
            except Exception as err:
                failed += 1
                print(f"  ✗ {rel}  {err}")

    print(f"{rendered} rendered, {skipped} up to date, {failed} failed")
    # Not 1: Python exits 1 when it cannot start, and the sync must not take that for a run.
    sys.exit(3 if failed else 0)


if __name__ == "__main__":
    main()
