import styled from 'styled-components';

export const Container = styled.div`
  input {
    display: none;
  }
  label {
    &:hover {
      cursor: pointer;
    }
  }
  img {
    width: 100%;
    max-height: 600px;
  }
  svg {
    font-size: 128px;
    color: #e3e3e3;
  }
`;
