import { createGlobalStyle } from "styled-components";
import { darken } from 'polished'

export const MainStyle = {
    breakpoint: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
    },
    rardius: {
        s: 4,
        m: 8
    },
    color: {
        primary: '#146cda'
    },
    text: {
        body: {
            fontSize: '14px',
            fontWeight: 'normal'
        },
        bodyBold: {
            fontSize: '14px',
            fontWeight: 'bold'
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

}

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        line-height: 1.5;
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
        color: ${ MainStyle.color.primary};
        cursor: pointer;

        &:hover {
            color:  ${darken(0.1, MainStyle.color.primary)};
        }
    }
`;