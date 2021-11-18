import styled from "styled-components";
import Section from "../../section";

const StyledInfoContent = styled(Section)`

.heading-info-content {
    font-size: 40px;
    text-align: center;
    line-height: 54px;
    font-weight: 700;
    color: #fff;
    padding-top: 48px;
}

.description-info-content {
    font-size: 22px;
    line-height: 33px;
    text-align: center;
    color: #ccc;
    padding-top: 32px;
    width: 100%;
    max-width: 756px;
    margin: 0 auto;
    display: block;
}

.subheading-info-content {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: #fff;
    padding-bottom: 48px;
    text-align: center;
    padding-top: 56px;
}

.scroll-body {
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 32px;
    }

@media(max-width: 768px) {
    .heading-info-content {
        font-size: 36px;
        line-height: 48px;
        padding-top: 48px;
    }

    .description-info-content {
        font-size: 20px;
        line-height: 30px;
        padding-top: 24px;
    }

    .subheading-info-content {
        font-size: 18px;
        line-height: 24px;
        padding-bottom: 50px;
        padding-top: 56px;
    }

    .box-info-content {
        overflow: overlay;
        column-gap: 32px;
    }

    .scroll-body {
        overflow: scroll;
    }
}

@media(max-width: 600px) {
    .heading-info-content {
        font-size: 24px;
        line-height: 31px;
        padding-top: 55px;
    }

    .description-info-content {
        font-size: 16px;
        line-height: 26px;
        padding-top: 16px;
    }

    .subheading-info-content {
        font-size: 18px;
        line-height: 24px;
        padding-bottom: 80px;
        padding-top: 53px;
    }
}


`;

export default StyledInfoContent;