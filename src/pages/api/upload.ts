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
import zlib from "zlib";
import formidable from "formidable";
import jwt from "jsonwebtoken";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { PDFDocument } from "pdf-lib";
import CONFIG from "@src/config/config.json";
import { languages } from "@src/config/languages";
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import {
  FOLDER_NAME,
  MAX_UPLOAD_FILE_SIZE,
  generateKey,
  sanitizeFileName,
} from "@src/utils/formSubmit";
import { apiRequest } from "@src/lib/api/apiRequest";

export const config = {
  api: {
    bodyParser: false,
  },
};

const getFieldValue = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

const getLanguagePrefix = (language: string): string => {
  const isSupported = languages.some((item) => item.shortKey === language);

  if (!isSupported || language === "en") {
    return "";
  }

  return `${language}/`;
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
    REGION,
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    FILES_DOCSERVICE_SECRET,
    EDITOR_API_URL,
    BUCKET,
  } = process.env;

  if (
    !REGION ||
    !ACCESS_KEY_ID ||
    !SECRET_ACCESS_KEY ||
    !FILES_DOCSERVICE_SECRET ||
    !EDITOR_API_URL ||
    !BUCKET
  ) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const form = formidable({
    maxFiles: 1,
    maxFileSize: MAX_UPLOAD_FILE_SIZE,
  });

  let fields;
  let files;
  try {
    [fields, files] = await form.parse(req);
  } catch {
    return res.status(400).json({ error: "Invalid upload" });
  }

  const file = files.file?.[0];

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const formName = getFieldValue(fields.formName);
  const language = getFieldValue(fields.language);
  const fileType = file.originalFilename?.match(/\.(\w+)$/)?.[1]?.toLowerCase();

  if (
    !fileType ||
    !ALLOWED_TYPES.includes(fileType as (typeof ALLOWED_TYPES)[number])
  ) {
    await fs.promises.unlink(file.filepath).catch(() => undefined);
    return res
      .status(415)
      .json({ error: "Invalid file format! The uploaded file is not valid." });
  }

  const safeName = sanitizeFileName(file.originalFilename);
  const fileName = `${FOLDER_NAME}/${Date.now()}_${safeName}`;
  const fileSize = file.size;
  const s3Url = `https://${BUCKET}/${fileName}`;

  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });

  let uploadedToS3 = false;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: fileName,
        Body: fs.createReadStream(file.filepath),
      }),
    );
    uploadedToS3 = true;

    const convertServiceUrl = `${EDITOR_API_URL}/ConvertService.ashx`;

    const pdfPayload = {
      filetype: fileType,
      key: generateKey(),
      outputtype: "pdf",
      title: fileName,
      url: s3Url,
    };
    const pdfConvertResponse = await apiRequest(convertServiceUrl, {
      label: "PDF conversion",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        AuthorizationJwt: `Bearer ${jwt.sign(pdfPayload, FILES_DOCSERVICE_SECRET)}`,
      },
      body: JSON.stringify(pdfPayload),
    });
    const pdfConvertData = await pdfConvertResponse.json();
    if (pdfConvertData?.error) {
      throw new Error(
        `PDF conversion failed: docservice error ${pdfConvertData.error}`,
      );
    }
    if (!pdfConvertData?.fileUrl) {
      throw new Error("PDF conversion failed: conversion not ready");
    }

    const pdfResponse = await apiRequest(pdfConvertData.fileUrl, {
      label: "PDF download",
    });
    const pdfArrayBuffer = await pdfResponse.arrayBuffer();
    const pdfDoc = await PDFDocument.load(new Uint8Array(pdfArrayBuffer));
    const { width, height } = pdfDoc.getPage(0).getSize();
    const pageCount = pdfDoc.getPageCount();
    const isLandscape = width > height;
    const fileOrientation = isLandscape ? "horizontal" : "vertical";

    const filePayload = {
      filetype: fileType,
      key: generateKey(),
      outputtype: fileType,
      title: fileName,
      url: s3Url,
    };
    const previewPayload = {
      filetype: fileType,
      key: generateKey(),
      outputtype: "png",
      thumbnail: {
        aspect: 0,
        first: true,
        height: isLandscape ? 1024 : 1448,
        width: isLandscape ? 1448 : 1024,
      },
      title: fileName,
      url: s3Url,
    };

    const [fileConvertResponse, previewConvertResponse] = await Promise.all([
      apiRequest(convertServiceUrl, {
        label: "File conversion",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          AuthorizationJwt: `Bearer ${jwt.sign(filePayload, FILES_DOCSERVICE_SECRET)}`,
        },
        body: JSON.stringify(filePayload),
      }),
      apiRequest(convertServiceUrl, {
        label: "Template preview conversion",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          AuthorizationJwt: `Bearer ${jwt.sign(previewPayload, FILES_DOCSERVICE_SECRET)}`,
        },
        body: JSON.stringify(previewPayload),
      }),
    ]);

    const fileConvertData = await fileConvertResponse.json();
    if (fileConvertData?.error) {
      throw new Error(
        `File conversion failed: docservice error ${fileConvertData.error}`,
      );
    }
    if (!fileConvertData?.fileUrl) {
      throw new Error("File conversion failed: conversion not ready");
    }

    const previewConvertData = await previewConvertResponse.json();
    if (previewConvertData?.error) {
      throw new Error(
        `Template preview conversion failed: docservice error ${previewConvertData.error}`,
      );
    }
    if (!previewConvertData?.fileUrl) {
      throw new Error(
        "Template preview conversion failed: conversion not ready",
      );
    }

    const compressedString = zlib
      .deflateSync(
        `${previewConvertData.fileUrl};${pageCount};${safeName};${fileSize};${formName};${fileConvertData.fileUrl};${fileOrientation}`,
      )
      .toString("base64");

    const cmsApiUrl = CONFIG.api.cms.replace("dashboard", "");
    const languagePrefix = getLanguagePrefix(language);

    return res
      .status(200)
      .send(
        `${cmsApiUrl}${languagePrefix}form-submit?index=${compressedString}`,
      );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[upload]", message);
    return res.status(502).json({
      status: "error",
      message: "Failed to process the uploaded file",
    });
  } finally {
    await Promise.allSettled([
      fs.promises.unlink(file.filepath),
      uploadedToS3
        ? s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: fileName }))
        : Promise.resolve(),
    ]);
  }
}
