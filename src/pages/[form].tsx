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

import { useState, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getForm } from "@src/lib/requests/getForm";
import { getCategories } from "@src/lib/requests/getCategories";
import { Layout } from "@src/components/Layout";
import { Head } from "@src/components/modules/Head";
import { Header } from "@src/components/modules/Header";
import { AdventAnnounce } from "@src/components/modules/AdventAnnounce";
import { Footer } from "@src/components/modules/Footer";
import { FormTemplate, IFormTemplate } from "@src/components/templates/Form";
import { ILocale } from "@src/types/locale";

interface IRecentForm {
  id: number;
  url: string | null;
  card_prewiew: string | null;
  name_form: string | null;
}

const FormPage = ({ locale, form, categories }: IFormTemplate & ILocale) => {
  const [recentForms, setRecentForms] = useState<IRecentForm[]>([]);
  const seoTitle =
    form.data[0].attributes.seo_title || form.data[0].attributes.name_form;
  const seoDescription =
    form.data[0].attributes.seo_description ||
    form.data[0].attributes.description_card;

  useEffect(() => {
    const localStorageKey = `recentForms_${locale}`;
    const maxForms = 7;

    let recentForms: IRecentForm[] = JSON.parse(
      localStorage.getItem(localStorageKey) || "[]",
    );

    const formData: IRecentForm = {
      id: form.data[0].id,
      url: form.data[0].attributes.url ? form.data[0].attributes.url : null,
      card_prewiew: form.data[0].attributes.card_prewiew.data.attributes.url
        ? form.data[0].attributes.card_prewiew.data.attributes.url
        : null,
      name_form: form.data[0].attributes.name_form
        ? form.data[0].attributes.name_form
        : null,
    };

    recentForms = recentForms.filter((f) => f.id !== formData.id);
    recentForms.unshift(formData);
    recentForms = recentForms.slice(0, maxForms);
    setRecentForms(recentForms);

    localStorage.setItem(localStorageKey, JSON.stringify(recentForms));
  }, [form, locale]);

  return (
    <Layout>
      <Layout.Head>
        <Head title={seoTitle} description={seoDescription} />
      </Layout.Head>
      <Layout.AdventAnnounce>
        <AdventAnnounce locale={locale} />
      </Layout.AdventAnnounce>
      <Layout.Header>
        <Header locale={locale} />
      </Layout.Header>
      <Layout.Main>
        <FormTemplate form={form} categories={categories} />
      </Layout.Main>
      <Layout.Footer>
        <Footer locale={locale} />
      </Layout.Footer>
    </Layout>
  );
};

export const getServerSideProps = async ({
  query,
  locale,
}: GetServerSidePropsContext & ILocale) => {
  const [form, categories] = await Promise.all([
    getForm(locale, query.form as string),
    getCategories(locale, "categories", "categorie"),
  ]);

  if (form.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "form"])),
      locale,
      form,
      categories,
    },
  };
};

export default FormPage;
