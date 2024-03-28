import styled from "styled-components";
import Section from "@common/section";
import emptyFilterImg from "@public/icons/empty-filter.svg";
import emptyFilterDarkImg from "@public/icons/empty-filter-dark.svg";

const StyledDesktopClientContent = styled(Section)`
  padding: 0;
  background-color: ${props =>
    props.theme === "theme-dark" ? "#333333" :
    props.theme === "theme-contrast-dark" ? "#1E1E1E" : 
    "#ffffff"
  };

  .header {
    padding: 40px 50px 20px 40px;
    background-color: ${props =>
      props.theme === "theme-dark" ? "#333333" :
      props.theme === "theme-contrast-dark" ? "#1E1E1E" : 
      "#ffffff"
    };

    @media screen and (max-width: 592px) {
      padding: 16px 16px 24px;
    }
  }

  .header-title {
    margin-bottom: 12px;
    font-size: 24px;
    line-height: 32px;
    font-weight: 300;
    color: ${props =>
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "rgba(0, 0, 0, 0.8)"
    };
  }

  .header-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    .category-selector {
      margin-right: auto;
    }

    .sort-btn {
      margin-right: 16px;
    }
  }

  .section-page {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    max-width: 100%;
  }

  .wrapper {
    margin-right: 2px;
    padding: 0 48px 40px 40px;
    overflow-y: auto;

    @media screen and (max-width: 592px) {
      padding: 0 48px 40px 16px;
    }
  }

  .error-desktop-content {
    margin-top: 147px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-desktop-image {
    margin-right: 24px;
    width: 108px;
    height: 108px;
    background-image: url(${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? emptyFilterDarkImg.src : 
      emptyFilterImg.src
    });
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .error-desktop-title {
    margin-bottom: 12px;
    letter-spacing: -0.02em;
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };
  }

  .error-desktop-text {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 21px;
    color: ${props =>
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.6)" :
      props.theme === "theme-contrast-dark" ? "#B8B8B8" : 
      "#A5A5A5"
    };
  }

  .error-desktop-link {
    display: inline-flex;
    font-size: 14px;
    line-height: 21px;
    color: ${props =>
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.6)" :
      props.theme === "theme-contrast-dark" ? "#B8B8B8" : 
      "#A5A5A5"
    };

    &:hover {
      text-decoration: underline;
    }
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .scroll-to-top-btn {
    position: fixed;
    right: 12px;
    bottom: 44px;
    border: none;
    border-radius: 2px;
    padding: 0;
    width: 32px;
    height: 32px;
    background-color: ${props => 
      props.theme === "theme-light" ? "#444444" :
      props.theme === "theme-dark" ? "#DDDDDD" :
      props.theme === "theme-contrast-dark" ? "#E6E6E6" : 
      "#A5A5A5"
    };
    cursor: pointer;
    transition: background-color 0.3s;

    svg {
      path {
        fill: ${props =>
          props.theme === "theme-dark" ? "#333333" :
          props.theme === "theme-contrast-dark" ? "#121212" : 
          "#FFFFFF"
        };
      }
    }

    &:hover {
      background-color: ${props =>
        props.theme === "theme-light" ? "#1C1C1C" :
        props.theme === "theme-dark" ? "#FCFCFC" :
        props.theme === "theme-contrast-dark" ? "#A6A6A6" : 
        "#C3C3C3"
      };
    }
  }
`;

export default StyledDesktopClientContent;
