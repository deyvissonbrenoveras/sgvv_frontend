import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`  
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    * {
        box-sizing: border-box;
    }
    html, body, #root{
        width: 100%;
        height: 100%;
    }
    body {
        padding: 0;
        margin: 0;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
    }   
    input {
        background-color: #f5f5f5;
        border: none;
        outline: none;
        height: 24px;
        padding: 4px;

    } 
    button {
        cursor: pointer;
        padding: 4px;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    a {
       text-decoration: none;
      &:link,
      &:visited,
      &:active {
        color: #000;
      }
    }
`;
