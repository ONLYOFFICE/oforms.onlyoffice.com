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
    const  price = labelPrice.toLowerCase();
        return (
            <StyledFormBanner>
                <Box
                    className="conteiner"                     
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box flexDirection="column" alignItems="flex-start">
                        <Box>
                            <ReactSVG                                 
                                src="/icons/pensil-icon.react.svg"
                                height="33px"
                                width="33px"
                            />
                            <Heading 
                                className="header"
                                fontSize="24px"
                                fontWeight="700"
                                level="3"
                            >
                                {t("How to create a")} <Text as="span" color="#FF6F3D" fontSize="24px" fontWeight="700">{t(`${price}`)}</Text> {t(`${labelName} with ONLYOFFICE`)}
                            </Heading>
                        </Box>
                       
                        <ol className="item_list">
                            <li className="item"><Text as="p" className="item_text"> {t("Click")}</Text><Text as="p" fontWeight="bold" className="item_text"> {t("Fill Out")}</Text><Text as="p" className="item_text"> {t("to launch the form editor online")} </Text></li>
                            <li className="item"><Text as="p" className="item_text"> {t("Fill in the necessary information in the empty fields")} </Text></li>
                            <li className="item"><Text as="p" className="item_text"> {t("Download the ready document from the editor")} </Text></li>
                        </ol>                        

                    </Box>       
                
                    <Box> 
                        <Button
                            label={t("FILL OUT")}
                            width="164px"
                            height="56px"
                        >

                        </Button>
        
                    </Box>
                </Box>
    
            </StyledFormBanner>
        );
    
};

export default FormBanner;