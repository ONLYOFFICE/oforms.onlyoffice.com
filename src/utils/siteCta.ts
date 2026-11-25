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

import { ILocale } from "@src/types/locale";

type TParts = { namePhrase: string; format: string };

const SITE_CTA: Record<ILocale["locale"], (parts: TParts) => string> = {
  en: ({ namePhrase, format }) =>
    `Fill out ${namePhrase} right here online, open it in a free desktop app to edit it,` +
    ` or download it as ${format === "XLSX" ? "an" : "a"} ${format} - just use the buttons below.`,
  de: ({ namePhrase, format }) =>
    `Füllen Sie ${namePhrase} direkt hier online aus, öffnen Sie sie zum Bearbeiten in einer` +
    ` kostenlosen Desktop-App oder laden Sie sie als ${format} herunter - nutzen Sie einfach die Schaltflächen unten.`,
  fr: ({ namePhrase, format }) =>
    `Remplissez ${namePhrase} directement en ligne, ouvrez-le dans une application de bureau` +
    ` gratuite pour le modifier ou téléchargez-le au format ${format} - utilisez simplement les boutons ci-dessous.`,
  es: ({ namePhrase, format }) =>
    `Rellena ${namePhrase} aquí mismo en línea, ábrela en una aplicación de escritorio` +
    ` gratuita para editarla o descárgala en formato ${format} - solo usa los botones de abajo.`,
  it: ({ namePhrase, format }) =>
    `Compila ${namePhrase} direttamente online, aprilo in un'app desktop gratuita per` +
    ` modificarlo o scaricalo in formato ${format} - usa i pulsanti qui sotto.`,
  pt: ({ namePhrase, format }) =>
    `Preencha ${namePhrase} aqui mesmo online, abra-o em um aplicativo de desktop gratuito` +
    ` para editá-lo ou baixe-o em ${format} - basta usar os botões abaixo.`,
  ja: ({ namePhrase, format }) =>
    `${namePhrase}はこのままオンラインで記入できます。無料のデスクトップアプリで編集したり、${format}` +
    `形式でダウンロードすることもできます。下のボタンをご利用ください。`,
  zh: ({ namePhrase, format }) =>
    `您可以直接在线填写${namePhrase}，在免费桌面应用中编辑，或下载为 ${format} 格式 - 只需使用下方按钮。`,
  ar: ({ namePhrase, format }) =>
    `يمكنك ملء ${namePhrase} هنا مباشرة عبر الإنترنت، أو فتحه في تطبيق سطح مكتب مجاني لتحريره،` +
    ` أو تنزيله بصيغة ${format} - استخدم الأزرار أدناه.`,
};

// Only a PDF can be filled online; the rest open in Desktop.
const EDIT_CTA: Record<ILocale["locale"], (parts: TParts) => string> = {
  en: ({ namePhrase, format }) =>
    `Open ${namePhrase} in a free desktop app to edit it,` +
    ` or download it as ${format === "XLSX" ? "an" : "a"} ${format} - just use the buttons below.`,
  de: ({ namePhrase, format }) =>
    `Öffnen Sie ${namePhrase} zum Bearbeiten in einer kostenlosen Desktop-App` +
    ` oder laden Sie sie als ${format} herunter - nutzen Sie einfach die Schaltflächen unten.`,
  fr: ({ namePhrase, format }) =>
    `Ouvrez ${namePhrase} dans une application de bureau gratuite pour le modifier` +
    ` ou téléchargez-le au format ${format} - utilisez simplement les boutons ci-dessous.`,
  es: ({ namePhrase, format }) =>
    `Abre ${namePhrase} en una aplicación de escritorio gratuita para editarla` +
    ` o descárgala en formato ${format} - solo usa los botones de abajo.`,
  it: ({ namePhrase, format }) =>
    `Apri ${namePhrase} in un'app desktop gratuita per modificarlo` +
    ` o scaricalo in formato ${format} - usa i pulsanti qui sotto.`,
  pt: ({ namePhrase, format }) =>
    `Abra ${namePhrase} em um aplicativo de desktop gratuito para editá-lo` +
    ` ou baixe-o em ${format} - basta usar os botões abaixo.`,
  ja: ({ namePhrase, format }) =>
    `${namePhrase}は無料のデスクトップアプリで編集できます。${format}` +
    `形式でダウンロードすることもできます。下のボタンをご利用ください。`,
  zh: ({ namePhrase, format }) =>
    `您可以在免费桌面应用中编辑${namePhrase}，或下载为 ${format} 格式 - 只需使用下方按钮。`,
  ar: ({ namePhrase, format }) =>
    `افتح ${namePhrase} في تطبيق سطح مكتب مجاني لتحريره،` +
    ` أو نزّله بصيغة ${format} - استخدم الأزرار أدناه.`,
};

const NAME_PHRASE: Record<ILocale["locale"], (name: string) => string> = {
  // Keeps a leading acronym such as FIFA or HR as it is.
  en: (name) =>
    /^[A-Z0-9][A-Z0-9&.-]*[A-Z0-9]s?(?=\s|$)/.test(name)
      ? `the ${name}`
      : `the ${name.charAt(0).toLowerCase()}${name.slice(1)}`,
  de: (name) =>
    /^vorlage/i.test(name) ? `die ${name}` : `die Vorlage „${name}“`,
  fr: (name) =>
    /^mod[èe]le/i.test(name) ? `le ${name}` : `le modèle « ${name} »`,
  es: (name) =>
    /^plantilla/i.test(name) ? `la ${name}` : `la plantilla «${name}»`,
  it: (name) =>
    /^modello/i.test(name) ? `il ${name}` : `il modello «${name}»`,
  pt: (name) => (/^modelo/i.test(name) ? `o ${name}` : `o modelo “${name}”`),
  ja: (name) => name,
  zh: (name) => name,
  ar: (name) => (/^نموذج/.test(name) ? name : `نموذج «${name}»`),
};

export const siteCta = (
  locale: ILocale["locale"],
  title: string,
  ext: string,
): string => {
  let name = title.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const tail = name.match(/^(.*\S)\s+(\d{1,2})$/);
  if (tail && Number(tail[2]) <= 30 && tail[1].split(/\s+/).length >= 2) {
    name = tail[1];
  }
  return (ext === "pdf" ? SITE_CTA : EDIT_CTA)[locale]({
    namePhrase: NAME_PHRASE[locale](name),
    format: ext.toUpperCase(),
  });
};
