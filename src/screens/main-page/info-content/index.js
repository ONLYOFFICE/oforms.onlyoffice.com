import Scrollbar from "@common/scrollbar";
import Heading from "@common/heading";
import Box from "@common/box";
import Banner from "../../common/banner";

import StyledInfoContent from "./styled-content";
import {ShortCard} from "@common/card";
import itemsShortCards from "@utils/data/pages/short-cards";
import {useTranslation} from "next-i18next";

const InfoContent = ({currentLanguage}) => {
    const { t } = useTranslation('common')
    let lng = currentLanguage === "en" ? "" : `/${currentLanguage}`;
    const shortCardItems = itemsShortCards[currentLanguage]?.map((it, idx) => {
        let url = it.linkUrl
            .replace(/^./, "")
        let href = `${lng}/editor/?filename=${url}&fillform=${it.fillForm}`;
        return (
            <ShortCard
                key={`items-short-card-${idx}`}
                title={it.title}
                subtitle={it.subtitle}
                linkUrl={lng + it.linkUrl}
                hrefButtom={href}
                alt={it.title}
            />
        );
    });
    return (
        <StyledInfoContent
            padding="88px 0 110px 0"
            background="#333333"
            tabletPadding="60px 0 134px 0"
            mobileLPadding="60px 0 113px 0"
        >
            <Heading className="heading-info-content">
                <span style={{color: "#FF6F3D"}}>{t("OFORMS")}: </span>
                {t("FREEforms")}
            </Heading>
            <Heading
                level={2}
                className="description-info-content"
                label={t("FillOutTheForms")}
            />
            <Heading
                className="subheading-info-content"
                level={3}
                label={t("FeaturedForms")}
            />
            <Box justifyContent="space-between" className="box-info-content">
                <Scrollbar
                    className="scrollbar-items-content"
                    style={{width: 1140, height: 250}}
                >
                    {shortCardItems}
                </Scrollbar>
            </Box>
            <Banner currentLanguage={currentLanguage}/>
        </StyledInfoContent>
    );
};

export default InfoContent;