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
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import CONFIG from "@src/config/config.json";
import { cmsLocale } from "@src/utils/cmsLocale";
import { ILocale } from "@src/types/locale";
import { generateKey } from "@src/utils/formSubmit";
import { apiRequest } from "@src/lib/api/apiRequest";
import { validateHCaptcha } from "@src/lib/validateHCaptcha";

export const config = {
  api: {
    bodyParser: false,
  },
};

const CONTENT_TYPES: Record<string, string> = {
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
};

const getFieldValue = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

const getRelationIds = (value: string | string[] | undefined): string[] =>
  getFieldValue(value)
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id.length > 0);

const getClientIp = (req: NextApiRequest): string | null => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0] ?? null;
  return req.socket.remoteAddress ?? null;
};

interface IConvertPreviewArgs {
  editorApiUrl: string;
  secret: string;
  payload: {
    filetype?: string;
    outputtype: string;
    title: string;
    url: string;
    key: string;
    thumbnail?: {
      aspect: number;
      first: boolean;
      height: number;
      width: number;
    };
  };
  label: string;
}

const convertPreview = async ({
  editorApiUrl,
  secret,
  payload,
  label,
}: IConvertPreviewArgs): Promise<string> => {
  const response = await apiRequest(`${editorApiUrl}/ConvertService.ashx`, {
    label,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      AuthorizationJwt: `Bearer ${jwt.sign(payload, secret)}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (data?.error) {
    throw new Error(`${label} failed: docservice error ${data.error}`);
  }
  if (!data?.fileUrl) {
    throw new Error(`${label} failed: conversion not ready`);
  }

  return data.fileUrl as string;
};

interface IUploadMediaArgs {
  uploadApiUrl: string;
  token: string;
  sourceUrl: string;
  filename: string;
  contentType?: string;
  refId: number;
  field: string;
  label: string;
}

const uploadMedia = async ({
  uploadApiUrl,
  token,
  sourceUrl,
  filename,
  contentType,
  refId,
  field,
  label,
}: IUploadMediaArgs): Promise<void> => {
  const assetResponse = await apiRequest(sourceUrl, {
    label: `${label} download`,
  });
  const blob = new Blob([await assetResponse.arrayBuffer()], {
    type: contentType,
  });

  const formData = new FormData();
  formData.append("files", blob, filename);
  formData.append("ref", "api::oform.oform");
  formData.append("refId", String(refId));
  formData.append("field", field);

  await apiRequest(uploadApiUrl, {
    label: `${label} upload`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    FILES_DOCSERVICE_SECRET,
    EDITOR_API_URL,
    STRAPI_API_TOKEN,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_AUTH_USER,
    EMAIL_AUTH_PASSWORD,
    EMAIL_ACCOUNT_1,
    EMAIL_ACCOUNT_2,
  } = process.env;

  if (!FILES_DOCSERVICE_SECRET || !EDITOR_API_URL || !STRAPI_API_TOKEN) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const form = formidable({
    maxFiles: 1,
  });

  let fields: formidable.Fields;
  try {
    [fields] = await form.parse(req);
  } catch {
    return res.status(400).json({ error: "Invalid upload" });
  }

  const captcha = await validateHCaptcha(
    getFieldValue(fields.captchaToken),
    getClientIp(req),
  );
  if (!captcha.success) {
    console.error("[form-upload-submission] captcha:", captcha.error);
    return res.status(403).json({ error: "captcha" });
  }

  const templateImage = getFieldValue(fields.templateImage);
  const fileOrientation = getFieldValue(fields.fileOrientation);
  const queryUrl = getFieldValue(fields.queryUrl);
  const fileName = getFieldValue(fields.fileName);

  const fileType = queryUrl.match(/\.(\w+)$/)?.[1]?.toLowerCase();
  const fileNameSubstring = fileName.replace(/\.(\w+)$/, "");
  const uniqueFileName = `${Date.now()}_${fileName}`;

  const hasFileTypeAndUrl = Boolean(fileType) && Boolean(queryUrl);

  try {
    await apiRequest(templateImage, { label: "Template preview check" });
  } catch {
    return res.json({ error: "card_prewiew" });
  }

  try {
    let cardPreviewUrl: string | undefined;
    let cardDesktopPreviewUrl: string | undefined;
    let desktopPreviewUrl: string | undefined;

    if (hasFileTypeAndUrl) {
      const isVertical = fileOrientation === "vertical";
      const previewBase = {
        filetype: fileType,
        outputtype: "png",
        title: uniqueFileName,
        url: queryUrl,
      };

      [cardPreviewUrl, cardDesktopPreviewUrl, desktopPreviewUrl] =
        await Promise.all([
          convertPreview({
            editorApiUrl: EDITOR_API_URL,
            secret: FILES_DOCSERVICE_SECRET,
            label: "Card preview conversion",
            payload: {
              ...previewBase,
              key: generateKey(),
              thumbnail: {
                aspect: 0,
                first: true,
                height: isVertical ? 916 : 648,
                width: isVertical ? 648 : 916,
              },
            },
          }),
          convertPreview({
            editorApiUrl: EDITOR_API_URL,
            secret: FILES_DOCSERVICE_SECRET,
            label: "Card desktop preview conversion",
            payload: {
              ...previewBase,
              key: generateKey(),
              thumbnail: {
                aspect: 0,
                first: true,
                height: isVertical ? 260 : 184,
                width: isVertical ? 184 : 260,
              },
            },
          }),
          convertPreview({
            editorApiUrl: EDITOR_API_URL,
            secret: FILES_DOCSERVICE_SECRET,
            label: "Desktop preview conversion",
            payload: {
              ...previewBase,
              key: generateKey(),
              thumbnail: {
                aspect: 0,
                first: true,
                height: isVertical ? 566 : 400,
                width: isVertical ? 400 : 566,
              },
            },
          }),
        ]);
    }

    let entryId: number | undefined;
    try {
      const createResponse = await apiRequest(
        `${CONFIG.api.cmsUpload}/api/oforms?status=draft`,
        {
          label: "Create oform",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              name_form: getFieldValue(fields.name),
              template_desc: getFieldValue(fields.description),
              categories: { connect: getRelationIds(fields.categoryId) },
              locale: cmsLocale(
                getFieldValue(fields.languageKey) as ILocale["locale"],
              ),
              form_exts: { connect: getRelationIds(fields.formExt) },
            },
          }),
        },
      );
      const created = await createResponse.json();
      entryId = created?.data?.id;

      if (!entryId) {
        throw new Error("Create oform failed: missing entry id in response");
      }
    } catch (error) {
      console.error("[form-upload-submission] create entry:", error);
      return res.json({ error: "name_form" });
    }

    const uploadApiUrl = `${CONFIG.api.cmsUpload}/api/upload`;

    await Promise.all([
      uploadMedia({
        uploadApiUrl,
        token: STRAPI_API_TOKEN,
        sourceUrl: templateImage,
        filename: `${fileNameSubstring}.png`,
        contentType: "image/png",
        refId: entryId,
        field: "card_prewiew",
        label: "Template preview",
      }),
      ...(hasFileTypeAndUrl
        ? [
            uploadMedia({
              uploadApiUrl,
              token: STRAPI_API_TOKEN,
              sourceUrl: cardPreviewUrl as string,
              filename: `${fileNameSubstring}.png`,
              contentType: "image/png",
              refId: entryId,
              field: "template_image",
              label: "Card preview",
            }),
            uploadMedia({
              uploadApiUrl,
              token: STRAPI_API_TOKEN,
              sourceUrl: cardDesktopPreviewUrl as string,
              filename: `${fileNameSubstring}.png`,
              contentType: "image/png",
              refId: entryId,
              field: "card_desktop_preview",
              label: "Card desktop preview",
            }),
            uploadMedia({
              uploadApiUrl,
              token: STRAPI_API_TOKEN,
              sourceUrl: desktopPreviewUrl as string,
              filename: `${fileNameSubstring}.png`,
              contentType: "image/png",
              refId: entryId,
              field: "desktop_preview",
              label: "Desktop preview",
            }),
            uploadMedia({
              uploadApiUrl,
              token: STRAPI_API_TOKEN,
              sourceUrl: queryUrl,
              filename: `${fileNameSubstring}.${fileType}`,
              contentType: fileType ? CONTENT_TYPES[fileType] : undefined,
              refId: entryId,
              field: "file_oform",
              label: "Source file",
            }),
          ]
        : []),
    ]);

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
        console.error("[form-upload-submission] notification email:", error);
      }
    }

    return res.status(200).end();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[form-upload-submission]", message);
    return res.status(500).json({ error: message });
  }
}
