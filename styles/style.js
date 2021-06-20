import { createGlobalStyle } from "styled-components";
import { darken, lighten } from "polished";

export const MainStyle = {
  breakpoint: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },
  radius: {
    s: 4,
    m: 8
  },
  color: {
    primary: "#146cda",
    primary80: lighten(0.2, "#146cda"),
    primary60: lighten(0.4, "#146cda"),
    primary40: lighten(0.6, "#146cda"),
    primary20: lighten(0.8, "#146cda"),
    primary10: lighten(0.9, "#146cda"),

    light: "white",

    dark: "#10233A",
    dark80: "#404F61",
    dark60: "#707B89",
    dark40: "#9FA7B0",
    dark20: "#CFD3D8",
    dark10: "#E8E9EC",

    backgroundColor: "#f2f2f2",

    danger: "#ff4c61"
  },
  text: {
    body: {
      fontSize: "14px",
      fontWeight: "normal"
    },
    bodyBold: {
      fontSize: "14px",
      fontWeight: "600"
    },
    subtitle: {
      fontSize: "18px",
      fontWeight: "600"
    },
    small: {
      fontSize: "12px",
      fontWeight: "normal"
    }
  },
  space: {
    none: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 48
  }
};

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        line-height: 1.5;
        color: ${MainStyle.color.dark};
    }

    h1, h2, h3, h4, h5, h6 {
      color: ${MainStyle.color.dark};
      font-weight: 500;
    }
    
    * {
        font-family: 'Open Sans', sans-serif !important;
    }

    //Import fonts
    @font-face {
        font-family: 'Open Sans';
        src: url('/fonts/OpenSans-Light.woff2') format("truetype");
        font-weight: 300;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url("/fonts/OpenSans-Regular.woff2") format("truetype");
        font-style: normal;
        font-weight: normal;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url("/fonts/OpenSans-SemiBold.woff2") format("truetype");
        font-weight: 600;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url("/fonts/OpenSans-Bold.woff2") format("truetype");
        font-weight: 700;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url("/fonts/OpenSans-ExtraBold.woff2") format("truetype");
        font-weight: 800;
    }

    .no-text-decoration {
        text-decoration: none;
    }

    a {
        color: ${MainStyle.color.primary};
        cursor: pointer;

        &:hover {
            color:  ${darken(0.1, MainStyle.color.primary)};
        }
    }

    .ant-message-notice-content {
      color: ${MainStyle.color.dark};
      border-radius: ${MainStyle.radius.s}px;
    }
`;
