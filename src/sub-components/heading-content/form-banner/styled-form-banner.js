import styled from "styled-components";
import { device } from "../../../../components/utils/devices";

const StyledFormBanner = styled.div `
    width: 100%;
    min-height: 500px;
    background: #F9F9F9;
    
    .conteiner {
        box-sizing: border-box;
        max-width: 1120px;
        min-height: 252px;
        border: 1px solid #CCCCCC;
        border-radius: 3px;
        margin: 0 auto;
        padding: 33px 41px 37px 33px; 
    }

    .header {
        margin-left: 17px;
    }

    .item_list {
        margin-top: 22px;
        margin-bottom: 0px;
        padding:0;
        counter-reset:item;
    }

    .item_text {
        font-size: 16px;
        overflow: unset;        
        text-indent: 0;
        margin:0;
        margin-bottom: 18px;
        padding:0 0 0 2em;
        text-indent:-2em;
    }

    .box-items {
        margin-bottom: 18px;
        padding:0 0 0 2em;
    }

    @media ${device.laptop} {
        display: none;
    }

    @media ${device.tablet} {
        
    }


`
export default StyledFormBanner;