/*
 * (c) Copyright Ascensio System SIA 2009-2026
 *
 * This program is a free software product.
 * You can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
 * Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
 * to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
 * any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
 * the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions of the Program must
 * display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product logo when
 * distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
 * trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
 * content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
 * International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 */

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable from "formidable";
import nodemailer from "nodemailer";
import CONFIG from "@src/config/config.json";
import { cmsLocale } from "@src/utils/cmsLocale";
import { ILocale } from "@src/types/locale";
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import { validateHCaptcha } from "@src/lib/validateHCaptcha";
import {
  MAX_UPLOAD_FILE_SIZE,
  sanitizeFileName,
  EXTENSION_MIME_TYPES,
} from "@src/utils/formSubmit";
import {
  NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from "@src/components/templates/FormSubmit/FormSubmit.constants";

export const config = {
  api: {
    bodyParser: false,
  },
};

const toStringValue = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const toIdList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter(
        (item): item is string => typeof item === "string" && item.length > 0,
      )
    : typeof value === "string" && value.length > 0
      ? [value]
      : [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    STRAPI_API_TOKEN,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_AUTH_USER,
    EMAIL_AUTH_PASSWORD,
    EMAIL_ACCOUNT_1,
    EMAIL_ACCOUNT_2,
  } = process.env;
  if (!STRAPI_API_TOKEN) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const form = formidable({
    maxFiles: 1,
    maxFileSize: MAX_UPLOAD_FILE_SIZE,
  });

  let fields: formidable.Fields;
  let files: formidable.Files;
  try {
    [fields, files] = await form.parse(req);
  } catch {
    return res.status(400).json({ error: "Invalid upload" });
  }

  const file = files.file?.[0];

  try {
    const name = toStringValue(fields.name?.[0]);
    const description = toStringValue(fields.description?.[0]);
    const countries = toIdList(fields.countries);
    const subcategories = toIdList(fields.subcategories);
    const captchaToken = toStringValue(fields.captchaToken?.[0]);
    const locale = cmsLocale(
      toStringValue(fields.languageKey?.[0]) as ILocale["locale"],
    );

    if (!captchaToken) {
      return res
        .status(400)
        .json({ error: "Captcha verification is required" });
    }

    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      null;

    const captcha = await validateHCaptcha(captchaToken, ip);

    if (!captcha.success) {
      return res.status(400).json({ error: "Captcha verification failed" });
    }

    if (!name) {
      return res.status(400).json({ error: "Template name is required" });
    }
    if (name.length > NAME_MAX_LENGTH) {
      return res.status(400).json({
        error: `Template name must be at most ${NAME_MAX_LENGTH} characters`,
      });
    }
    if (!description) {
      return res
        .status(400)
        .json({ error: "Template description is required" });
    }
    if (description.length > DESCRIPTION_MAX_LENGTH) {
      return res.status(400).json({
        error: `Template description must be at most ${DESCRIPTION_MAX_LENGTH} characters`,
      });
    }
    if (countries.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one country is required" });
    }
    if (subcategories.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one subcategory is required" });
    }

    if (!file) {
      return res.status(400).json({ error: "Template file is required" });
    }

    const fileType = file.originalFilename
      ?.match(/\.(\w+)$/)?.[1]
      ?.toLowerCase();

    if (
      !fileType ||
      !ALLOWED_TYPES.includes(fileType as (typeof ALLOWED_TYPES)[number]) ||
      file.mimetype !== EXTENSION_MIME_TYPES[fileType]
    ) {
      return res.status(415).json({
        error: "Invalid file format! The uploaded file is not valid.",
      });
    }

    const createResponse = await fetch(
      `${CONFIG.api.cmsUpload}/api/oforms?status=draft`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            name_form: name,
            template_desc: description,
            countries: { connect: countries },
            subcategories: { connect: subcategories },
            locale,
          },
        }),
      },
    );

    const created = await createResponse.json();

    if (!createResponse.ok) {
      console.error(
        "[form-submission] strapi error:",
        createResponse.status,
        JSON.stringify(created, null, 2),
      );
      throw new Error(
        `Create template failed: ${createResponse.status} ${JSON.stringify(created?.error ?? created)}`,
      );
    }

    const entryId = created?.data?.id;

    if (!entryId) {
      throw new Error("Create template failed: missing entry id in response");
    }

    const uploadData = new FormData();
    const fileBuffer = await fs.promises.readFile(file.filepath);
    uploadData.append(
      "files",
      new Blob([fileBuffer], {
        type: file.mimetype ?? "application/octet-stream",
      }),
      sanitizeFileName(file.originalFilename),
    );
    uploadData.append("ref", "api::oform.oform");
    uploadData.append("refId", String(entryId));
    uploadData.append("field", "file_oform");

    const uploadResponse = await fetch(`${CONFIG.api.cmsUpload}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: uploadData,
    });

    if (!uploadResponse.ok) {
      const uploadError = await uploadResponse.json().catch(() => null);
      console.error(
        "[form-submission] file upload error:",
        uploadResponse.status,
        JSON.stringify(uploadError, null, 2),
      );
      throw new Error(`Template file upload failed: ${uploadResponse.status}`);
    }

    if (EMAIL_HOST && EMAIL_AUTH_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: EMAIL_HOST,
          port: Number(EMAIL_PORT),
          auth: {
            user: EMAIL_AUTH_USER,
            pass: EMAIL_AUTH_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `${process.env.NEXT_PUBLIC_SITE_URL} <${EMAIL_AUTH_USER}>`,
          to: [EMAIL_ACCOUNT_1, EMAIL_ACCOUNT_2].filter(Boolean) as string[],
          subject: `You have a new form from ${process.env.NEXT_PUBLIC_SITE_URL}/form-submit`,
          text: `You have a new form from ${process.env.NEXT_PUBLIC_SITE_URL}/form-submit. Please review it.`,
        });
      } catch (error) {
        console.error("[form-submission] notification email:", error);
      }
    }

    return res.status(201).json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[form-submission]", message);
    return res.status(500).json({ error: message });
  } finally {
    if (file) {
      await fs.promises.unlink(file.filepath).catch(() => undefined);
    }
  }
}
