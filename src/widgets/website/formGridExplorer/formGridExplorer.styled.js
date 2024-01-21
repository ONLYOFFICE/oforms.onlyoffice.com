import styled from 'styled-components';

export const FormGridExplorerStyled = styled.section`
    background-color: ${({ $isCategoryPage }) =>
            $isCategoryPage ? '#F9F9F9' : '#FFFFFF'};
`;

export const FormGridExplorerContainer = styled.div`
    max-width: 1208px;
    margin: 0 auto;

    padding: ${({ $isCategoryPage }) => $isCategoryPage ? '31px 44px 145px' : '64px 44px 112px'};

    @media screen and (max-width: 768px) {
        padding: 54px 44px 82px;
    }

    @media screen and (max-width: 550px) {
        padding: 48px 16px;
    }
`;

export const FormGridExplorerBreadCrumbWrapper = styled.div`
    padding-bottom: 16px;
    margin-bottom: 48px;
    border-bottom: 1px solid #E5E5E5;
`;

export const FormGridExplorerTitle = styled.h2`
    color: #333;

    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 133%;
    letter-spacing: -0.64px;

    margin: 0 0 40px 0;

    @media screen and (max-width: 375px) {
        text-align: center;
        font-variant-numeric: lining-nums proportional-nums;
        font-size: 20px;
        letter-spacing: -0.4px;
    }
`;

export const FormGridExplorerTopControls = styled.div`
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    gap: 32px;

    margin-bottom: ${({ $isCategoryPage }) => $isCategoryPage ? '24px' : '32px'};
`;

export const FormGridExplorerTopControlsBox = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
`;

export const FormGridExplorerFormsCount = styled.span`
    color: #808080;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;

    @media screen and (max-width: 600px) {
        display: none;
    }
`;

export const FormGridWrapper = styled.div`
    margin-bottom: 32px;
`;

export const FormGridExplorerLoadMoreButton = styled.button`
    display: block;
    margin: 0 auto 32px auto;
    padding: 16px 20px;
    background-color: transparent;
    border-radius: 3px;
    border: 1px solid #AAA;

    color: #444;
    
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: 0.48px;
    text-transform: uppercase;
    cursor: pointer;
`;
