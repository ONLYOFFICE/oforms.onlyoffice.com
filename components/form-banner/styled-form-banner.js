import styled from "styled-components";
import { device } from "../../components/utils/devices";

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
    ol {
        margin-top: 22px;
        margin-bottom: 0px;
        padding:0;
        counter-reset:item;
    }
 
    ol>li {
        margin:0;
        margin-bottom: 18px;
        padding:0 0 0 2em;
        text-indent:-2em;
        list-style-type:none;
        counter-increment:item;
    }

    ol>li>p {
        font-size: 16px;
        overflow: unset;
        /* margin-left: 28px; */
        text-indent: 0;
    }

    ol>li :last-child{
        margin-bottom: 0px;
    }
 
    ol>li:before {
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