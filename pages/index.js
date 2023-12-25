import { useState } from "react";
import {lazy, Suspense} from "react";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import getAllForms from "@lib/strapi/getForms";
import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";
import Layout from "@components/layout";
import HeadSEO from "../src/screens/head-content";
import HeadingContent from "../src/screens/heading-content";
import InfoContent from "../src/screens/main-page/info-content";
import MainContent from "../src/screens/main-page/main-content";
import DesktopClientContent from "../src/screens/desktop-client-content";
import AdventAnnounce from "../src/screens/heading-content/advent-announce";

const Accordion = lazy(() => import("../src/screens/common/accordion"), {
    suspense: true,
    ssr: false,
});
const Footer = lazy(() => import("../src/screens/footer-content"), {
    suspense: true,
    ssr: false,
});

const Index = ({forms, page, locale, sort, types, categories, compilations}) => {
    const {t} = useTranslation("common");
    const router = useRouter();
    const isDesktopClient = router.query.desktop === 'true'
    const [stateMobile, setStateMobile] = useState(false);

    return (
        isDesktopClient ?
            <Layout>
                <Layout.PageHead>
                    <HeadSEO
                        title={t("titleIndexPage")}
                        metaSiteNameOg={t("metaSiteNameOg")}
                        metaDescription={t("titleIndexPage")}
                        metaDescriptionOg={t("metaDescriptionOgIndexPage")}
                        metaKeywords={t("metaKeywordsIndexPage")}
                        isDesktopClient
                    />
                </Layout.PageHead>
                <DesktopClientContent
                    currentLanguage={locale}
                    data={forms}
                    sort={sort}
                    page={+page}
                    types={types}
                    categories={categories}
                    compilations={compilations}
                    locale={locale}
                />
            </Layout>
            :
            <Layout>
                <Layout.PageHead>
                    <HeadSEO
                        title={t("titleIndexPage")}
                        metaSiteNameOg={t("metaSiteNameOg")}
                        metaDescription={t("titleIndexPage")}
                        metaDescriptionOg={t("metaDescriptionOgIndexPage")}
                        metaKeywords={t("metaKeywordsIndexPage")}
                    />
                </Layout.PageHead>
                <Layout.PageAnnounce>
                    <AdventAnnounce t={t} currentLanguage={locale} stateMobile={stateMobile} />
                </Layout.PageAnnounce>
                <Layout.PageHeader>
                    <HeadingContent t={t} currentLanguage={locale} stateMobile={stateMobile} setStateMobile={setStateMobile} />
                </Layout.PageHeader>
                <Layout.SectionMain>
                    <InfoContent currentLanguage={locale}/>
                    <MainContent
                        currentLanguage={locale}
                        data={forms}
                        sort={sort}
                        page={+page}
                        types={types}
                        categories={categories}
                        compilations={compilations}
                    />
                    <Suspense>
                        <Accordion currentLanguage={locale}/>
                    </Suspense>
                </Layout.SectionMain>
                <Layout.PageFooter>
                    <Suspense>
                        <Footer t={t} locale={locale}/>
                    </Suspense>
                </Layout.PageFooter>
            </Layout>
    )
};

export const getServerSideProps = async ({locale, query}) => {
    const isDesktop = query.desktop === "true";
    const page = query.page || 1;
    const sort = query._sort || "asc";
    const pageSize = query.pageSize || isDesktop ? 32 : 9;
    const forms = await getAllForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
    const types = await getAllTypes(locale === "pt" ? "pt-br" : locale);
    const categories = await getAllCategories(locale === "pt" ? "pt-br" : locale);
    const compilations = await getAllCompilations(locale === "pt" ? "pt-br" : locale);

    return {
        props: {
            ...(await serverSideTranslations(locale, "common")),
            forms,
            page,
            locale,
            sort,
            types,
            categories,
            compilations
        },
    };
}


export default Index;
