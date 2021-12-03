import styled from "styled-components";
import { device } from "../../../../components/utils/devices";

const StyledFormBanner = styled.div `
    width: 100%;
    min-height: 500px;
    background: #F9F9F9;
    
    .conteiner{
        box-sizing: border-box;
        max-width: 1120px;
        min-height: 252px;
        border: 1px solid #CCCCCC;
        border-radius: 3px;
        margin: 0 auto;
        padding: 33px 41px 37px 33px;
        
    }
    .header{
        margin-left: 17px;
    }
    .item_list {
        margin-top: 22px;
        margin-bottom: 0px;
        padding:0;
        counter-reset:item;
    }
 
    .item {
        margin:0;
        margin-bottom: 18px;
        padding:0 0 0 2em;
        text-indent:-2em;
        list-style-type:none;
        counter-increment:item;
    }

    .item_text {
        font-size: 16px;
        overflow: unset;        
        text-indent: 0;
    }

    .item :last-child{
        margin-bottom: 0px;
    }
 
    .item:before {
        display:inline-block;
        width:1.5em;
        padding-right:0.5em;
        font-weight:bold;
        text-align:right;
        content:counter(item) ".";
    }
    @media ${device.laptop} {
        display: none;
    }

    @media ${device.tablet} {
        
    }


`
export default StyledFormBanner;