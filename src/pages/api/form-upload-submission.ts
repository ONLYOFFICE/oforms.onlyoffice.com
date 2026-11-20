/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import {
  fetchAllowedUrl,
  isAllowedRemoteUrl,
  remoteUrlFileName,
  RemoteHostsNotConfiguredError,
} from "@src/lib/server/safeFetch";
import { MAX_UPLOAD_FILE_SIZE } from "@src/utils/formSubmit";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { enforceRateLimit } from "@src/lib/server/rateLimit";
import { enforceCaptcha } from "@src/lib/server/uploadGuards";
import {
  createStrapiEntry,
  notifyByEmail,
  toStringValue,
  uploadToStrapi,
  validateSubmission,
  validateTemplateFileType,
} from "@src/lib/server/templateSubmission";

export const config = {
  api: {
    bodyParser: false,
  },
};

const LABEL = "form-upload-submission";
const RATE_LIMIT = new RateLimiterMemory({ points: 5, duration: 10 * 60 });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!(await enforceRateLimit(req, res, LABEL, RATE_LIMIT))) {
    return;
  }

  const { STRAPI_API_TOKEN } = process.env;

  if (!STRAPI_API_TOKEN) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const form = formidable({
    maxFiles: 1,
    maxFileSize: MAX_UPLOAD_FILE_SIZE,
    filter: () => false,
  });

  let fields: formidable.Fields;
  try {
    [fields] = await form.parse(req);
  } catch {
    return res.status(400).json({ error: "Invalid upload" });
  }

  try {
    if (!(await enforceCaptcha(req, res, fields, LABEL))) {
      return;
    }

    const validated = validateSubmission(fields);

    if ("error" in validated) {
      return res.status(validated.error.status).json({
        error: validated.error.error,
      });
    }

    const fileUrl = toStringValue(fields.fileUrl?.[0]);

    if (!fileUrl) {
      return res.status(400).json({ error: "Template file is required" });
    }

    if (!isAllowedRemoteUrl(fileUrl)) {
      console.error(
        "[form-upload-submission] rejected file url host:",
        (() => {
          try {
            return new URL(fileUrl).host;
          } catch {
            return "<unparsable>";
          }
        })(),
      );
      return res.status(400).json({ error: "Template file is not available" });
    }

    const remoteFileName = remoteUrlFileName(fileUrl);
    const fileTypeError = validateTemplateFileType(remoteFileName);

    if (fileTypeError) {
      return res.status(fileTypeError.status).json({
        error: fileTypeError.error,
      });
    }

    const fileBuffer = await fetchAllowedUrl(fileUrl);

    const strapi = { token: STRAPI_API_TOKEN, label: LABEL };
    const entryId = await createStrapiEntry(validated.fields, strapi);

    await uploadToStrapi(
      {
        buffer: fileBuffer,
        name: remoteFileName,
      },
      entryId,
      strapi,
    );

    await notifyByEmail(LABEL, validated.fields);

    return res.status(201).json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[form-upload-submission]", message);

    if (error instanceof RemoteHostsNotConfiguredError) {
      return res.status(500).json({ error: "Template upload is unavailable" });
    }

    return res.status(500).json({ error: message });
  }
}
