import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`  
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    * {
        box-sizing: border-box;
    }
    html, body, #root{
        width: 100vw;
        height: 100vh;
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
`;
