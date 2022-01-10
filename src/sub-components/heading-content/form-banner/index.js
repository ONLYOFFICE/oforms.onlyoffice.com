import React from 'react';
import StyledFormBanner from './styled-form-banner';
import Box from '../../../../components/box';
import Heading from '../../../../components/heading';
import { ReactSVG } from "react-svg";
import Button from '../../../../components/button';
import Text from '../../../../components/text';

const FormBanner = ({
    t,
    labelPrice,
    labelName,
    link,
    ...rest
}) => {
    const price = labelPrice.toLowerCase();
    return (
        <StyledFormBanner>
            <Box
                className="conteiner"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box flexDirection="column" alignItems="flex-start">
                    <Box className="banner_title">
                        <ReactSVG
                            src="/icons/pensil-icon.react.svg"
                            height="33px"
                            width="33px"
                        />
                        <Heading
                            className="header"
                            fontSize="24px"
                            fontWeight="700"
                            level={3}
                        >
                            {t("How to create a")} <Text color="#FF6F3D" fontSize="24px" fontWeight="700">{t(`${price}`)}</Text> {t(`${labelName} with ONLYOFFICE`)}
                        </Heading>
                    </Box>
                    <Box className="box-items" flexDirection="column" alignItems="flex-start">
                        <Text className="item_text"><span style={{fontWeight: "700"}}>1.</span> {t("Click Fill Out to launch the form editor online")} </Text> 
                        <Text className="item_text"><span style={{fontWeight: "700"}}>2.</span> {t("Fill in the necessary information in the empty fields")} </Text>
                        <Text className="item_text"><span style={{fontWeight: "700"}}>3.</span> {t("Download the ready document from the editor")} </Text>
                    </Box>
                </Box>
                <Button
                    label={t("FILL OUT")}
                    width="164px"
                    height="56px"
                />
            </Box>

        </StyledFormBanner>
    );

};

export default FormBanner;