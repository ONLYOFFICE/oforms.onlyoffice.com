import React from "react";
import PropTypes from "prop-types";
import StyledBanner from "./styled-banner";
import Heading from "../heading";
import Text from "../text";
import Button from "../button/";
import Box from "../box/";

const Banner= ({header, description, button_primary_label, button_secondary_label, ...rest}) => {
  
    return (
      <StyledBanner>
        <Box flexDirection={'column'} justifyContent={'center'} {...rest}> 
            <Heading as={`h3`} fontSize ={'24px'} textAlign={'center'} {...rest}>
                {header}
            </Heading>
            <Text className={'description'}textAlign={'center'} isInline={false} display={'block'} {...rest}>
                {description}
            </Text>
        </Box>
        <Box className={'banner_buttons '} justifyContent={'center'} {...rest}> 
            <Button
                className={'buttons'}
                label={button_primary_label}
            >
                
            </Button>
            <Button
                className={'buttons'}
                label={button_secondary_label}
                type={"white"}
            >            
            </Button>
        </Box>      
        
      </StyledBanner>
    );
  };

export default Banner;