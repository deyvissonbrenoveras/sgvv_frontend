import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  input {
    display: none;
  }
  label {
    padding: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  img {
    width: 80%;
    max-width: 400px;
    max-height: 400px;
    margin: 0 auto;
    @media (max-width: 600px) {
      max-width: 150px;
      max-height: 150px;
    }
  }
  svg {
    font-size: 128px;
    color: #e3e3e3;
    margin: 0 auto;
  }
`;
