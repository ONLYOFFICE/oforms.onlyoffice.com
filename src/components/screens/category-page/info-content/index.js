import Box from "@common/box";
import Text from "@common/text";
import Heading from "@common/heading";
import StyledInfoContent from "./styled";
import {useTranslation} from "next-i18next";

const InfoContent = ({category, header}) => {
    const { t } = useTranslation('common')
    return (
        <StyledInfoContent
            padding="56px 0 90px"
            tabletPadding="46px 0 70px"
            mobileLPadding="36px 0 50px"
        >
            <Box
                className="category-box"
                flexDirection="column"
                alignContent="center"
                justifyContent="center"
            >
                <Heading className="category-heading" level={1} label={category}/>
                {header ? (
                    <Text
                        className="category-description"
                        label={header}
                        id="forms"
                    />
                ) : (
                    <Text
                        className="category-description"
                        label={t("SubHeadingCategoryPage")}
                        id="forms"
                    />
                )
                }
            </Box>
        </StyledInfoContent>
    );
};

export default InfoContent;