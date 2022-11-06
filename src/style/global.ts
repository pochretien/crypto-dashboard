import {createGlobalStyle} from "styled-components"

export const GlobalStyle =  createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
    }
    #root{
        margin:0 auto;
    }
    body {
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
    }
   :root { font-family: 'Inter', sans-serif; }
   @supports (font-variation-settings: normal) {
    :root { font-family: 'Inter var', sans-serif; }
   }
 `
