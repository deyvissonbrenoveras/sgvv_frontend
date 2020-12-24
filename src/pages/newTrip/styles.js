import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: scroll;
  height: 100%;
  form {
    max-width: 100%;
    display: block;
    height: 95%;
    div {
      > button {
        margin-top: 10px;
        width: 100%;
      }
    }
  }
`;
