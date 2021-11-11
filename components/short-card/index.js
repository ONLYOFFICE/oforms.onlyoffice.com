import React from "react";
import PropTypes from "prop-types";
import StyledShortCard from "./styled-short-card";
import Text from "../text";
import Link  from "../link";
import Button from "../button";




const ShordCard = ({title, subtitle, linkUrl, hrefButtom, t, ...rest}) => {
 

    return (

        <StyledShortCard>
            <Text
                className="title"
                fontSize="18px"
                fontWeight="bold"
                lineHeight="24px"
                display="block"
                label={title}
                
            ></Text>
            <Text
                className="subtitle"
                fontSize="13px"
                fontStyle="italic"
                fontWeight="normal"   
                color="#808080"  
                display="block"
                label={subtitle}
            ></Text>
            <Link
                className="link"
                display="block"
                label={t("Learn more")}
                href={linkUrl}
            ></Link>
            <Link
                href={hrefButtom}
            >
                <Button 
                    className="button"
                    label={t("Open")}
                    typeButton="transparent"
                    isScale
                    height="48px"

                ></Button>
            </Link>
            
        </StyledShortCard>

    );


};


ShordCard.propTypes = {
    /** Card title */
    title: PropTypes.string,    
    /**Card subtitle */
    subtitle: PropTypes.string,
    /** Link for learn more */
    linkUrl: PropTypes.string,      
    /** Link for button */
    hrefButtom: PropTypes.string,   
  };

export default ShordCard;