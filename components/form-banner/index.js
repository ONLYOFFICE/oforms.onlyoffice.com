import React from 'react';
import StyledFormBanner from './styled-form-banner';
import Box from '../box';
import Heading from '../heading';
import { ReactSVG } from "react-svg";
import Button from '../button';
import Text from '../text';

const FormBanner = ({
    t,
    label,
    link,
    ...rest
}) => {    
    
        return (
            <StyledFormBanner>
                <Box 
                    className={'conteiner'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Box flexDirection={'column'} alignItems={'flex-start'}>
                        <Box>
                            <ReactSVG 
                                className={"chevronContainer "}
                                src="/icons/pensil-icon.react.svg"
                                height="33px"
                                width="33px"
                            />
                            <Heading
                                label={label}
                                fontSize={'24px'}
                                className={'header'}
                            />
                        </Box>
                       
                        <ol>
                            <li><Text as={"p"}> {t("Click")} </Text><Text as={"p"} fontWeight={"bold"}> {t("Fill Out")} </Text><Text as={"p"}> {t("to launch the form editor online")} </Text></li>
                            <li><Text as={"p"}> {t("Fill in the necessary information in the empty fields")} </Text></li>
                            <li><Text as={"p"}> {t("Download the ready document from the editor")} </Text></li>
                        </ol>                        

                    </Box>       
                
                    <Box>
                        <Button
                            label={'FILL OUT'}
                            width={'164px'}
                            height={'56px'} 
                        >

                        </Button>
        
                    </Box>
                </Box>
    
            </StyledFormBanner>
        );
    
};

export default FormBanner;