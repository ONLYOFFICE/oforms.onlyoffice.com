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

import type formidable from "formidable";
import nodemailer from "nodemailer";
import CONFIG from "@src/config/config.json";
import { cmsLocale } from "@src/utils/cmsLocale";
import { ILocale } from "@src/types/locale";
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import { sanitizeFileName, EXTENSION_MIME_TYPES } from "@src/utils/formSubmit";
import {
  NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from "@src/components/templates/FormSubmit/FormSubmit.constants";

export type TSubmissionError = { status: number; error: string };

export type TSubmissionFields = {
  name: string;
  description: string;
  countries: string[];
  subcategories: string[];
  locale: string;
};

export const toStringValue = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

export const toIdList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter(
        (item): item is string => typeof item === "string" && item.length > 0,
      )
    : typeof value === "string" && value.length > 0
      ? [value]
      : [];

export const validateSubmission = (
  fields: formidable.Fields,
): { fields: TSubmissionFields } | { error: TSubmissionError } => {
  const name = toStringValue(fields.name?.[0]);
  const description = toStringValue(fields.description?.[0]);
  const countries = toIdList(fields.countries);
  const subcategories = toIdList(fields.subcategories);

  if (!name) {
    return { error: { status: 400, error: "Template name is required" } };
  }

  if (name.length > NAME_MAX_LENGTH) {
    return {
      error: {
        status: 400,
        error: `Template name must be at most ${NAME_MAX_LENGTH} characters`,
      },
    };
  }

  if (!description) {
    return {
      error: { status: 400, error: "Template description is required" },
    };
  }

  if (description.length > DESCRIPTION_MAX_LENGTH) {
    return {
      error: {
        status: 400,
        error: `Template description must be at most ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    };
  }

  if (countries.length === 0) {
    return {
      error: { status: 400, error: "At least one country is required" },
    };
  }

  if (subcategories.length === 0) {
    return {
      error: { status: 400, error: "At least one subcategory is required" },
    };
  }

  return {
    fields: {
      name,
      description,
      countries,
      subcategories,
      locale: cmsLocale(
        toStringValue(fields.languageKey?.[0]) as ILocale["locale"],
      ),
    },
  };
};

export const validateTemplateFileType = (
  fileName: string | null | undefined,
): TSubmissionError | null => {
  const fileType = fileName?.match(/\.(\w+)$/)?.[1]?.toLowerCase();

  if (
    !fileType ||
    !ALLOWED_TYPES.includes(fileType as (typeof ALLOWED_TYPES)[number])
  ) {
    return {
      status: 415,
      error: "Invalid file format! The uploaded file is not valid.",
    };
  }

  return null;
};

export const createStrapiEntry = async (
  fields: TSubmissionFields,
  { token, label }: { token: string; label: string },
): Promise<number> => {
  const response = await fetch(
    `${CONFIG.api.cms}/api/oforms?status=draft&locale=${encodeURIComponent(fields.locale)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          name_form: fields.name,
          template_desc: fields.description,
          countries: { connect: fields.countries },
          subcategories: { connect: fields.subcategories },
        },
      }),
    },
  );

  const created = await response.json();

  if (!response.ok) {
    console.error(
      `[${label}] strapi error:`,
      response.status,
      JSON.stringify(created, null, 2),
    );
    throw new Error(
      `Create template failed: ${response.status} ${JSON.stringify(created?.error ?? created)}`,
    );
  }

  const entryId = created?.data?.id;

  if (!entryId) {
    throw new Error("Create template failed: missing entry id in response");
  }

  return entryId;
};

export const uploadToStrapi = async (
  file: { buffer: Buffer; name: string | null | undefined },
  entryId: number,
  { token, label }: { token: string; label: string },
): Promise<void> => {
  const uploadData = new FormData();
  const fileType = file.name?.match(/\.(\w+)$/)?.[1]?.toLowerCase();

  uploadData.append(
    "files",
    new Blob([new Uint8Array(file.buffer)], {
      type:
        (fileType && EXTENSION_MIME_TYPES[fileType]) ||
        "application/octet-stream",
    }),
    sanitizeFileName(file.name),
  );
  uploadData.append("ref", "api::oform.oform");
  uploadData.append("refId", String(entryId));
  uploadData.append("field", "file_oform");

  const response = await fetch(`${CONFIG.api.cms}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: uploadData,
  });

  if (!response.ok) {
    const uploadError = await response.json().catch(() => null);
    console.error(
      `[${label}] file upload error:`,
      response.status,
      JSON.stringify(uploadError, null, 2),
    );
    throw new Error(`Template file upload failed: ${response.status}`);
  }
};

export const notifyByEmail = async (label: string): Promise<void> => {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_AUTH_USER,
    EMAIL_AUTH_PASSWORD,
    EMAIL_ACCOUNT_1,
    EMAIL_ACCOUNT_2,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_AUTH_USER) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      auth: { user: EMAIL_AUTH_USER, pass: EMAIL_AUTH_PASSWORD },
    });

    await transporter.sendMail({
      from: `${siteUrl} <${EMAIL_AUTH_USER}>`,
      to: [EMAIL_ACCOUNT_1, EMAIL_ACCOUNT_2].filter(Boolean) as string[],
      subject: `You have a new form from ${siteUrl}/form-submit`,
      text: `You have a new form from ${siteUrl}/form-submit. Please review it.`,
    });
  } catch (error) {
    console.error(`[${label}] notification email:`, error);
  }
};
