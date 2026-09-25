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
    const fileType = validateTemplateFileType(remoteFileName);

    if ("error" in fileType) {
      return res.status(fileType.error.status).json({
        error: fileType.error.error,
      });
    }

    const fileBuffer = await fetchAllowedUrl(fileUrl);

    const strapi = { token: STRAPI_API_TOKEN, label: LABEL };
    const entryId = await createStrapiEntry(validated.fields, strapi);

    await uploadToStrapi(
      {
        buffer: fileBuffer,
        name: remoteFileName,
        mimeType: fileType.mimeType,
      },
      entryId,
      strapi,
    );

    await notifyByEmail(LABEL);

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
