import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
  form {
    margin: 0 auto;
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    input {
      border-radius: 4px;
      margin: 5px;
    }
    button {
      margin: 0 auto;
      width: 128px;
      height: 32px;
      border: 0;
      outline: 0;
      color: #fff;
      background-color: #ffb947;
      margin-top: 12px;

      &:hover {
        background-color: ${darken(0.05, '#ffb947')};
      }
    }
  }
`;
