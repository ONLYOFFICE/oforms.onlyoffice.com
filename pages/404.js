import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import Layout from "@components/layout";
import HeadSEO from "../src/screens/head-content";
import {NotFound} from "@common/notFound";

const ErrorPage = () => {
    const {t} = useTranslation("common");
    return (
        <Layout footerContent={false} headerContent={false}>
            <Layout.PageHead>
                <HeadSEO
                    title={t("Page 404")}
                    metaSiteNameOg={t("Page 404")}
                    metaDescription={t("Page 404")}
                    metaDescriptionOg={t("Page 404")}
                />
            </Layout.PageHead>
            <Layout.SectionMain>
                <NotFound />
            </Layout.SectionMain>
        </Layout>
    );
};



export const getStaticProps = async ({locale, ...other}, a) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, "common")),
        },
    }
}

export default ErrorPage;
