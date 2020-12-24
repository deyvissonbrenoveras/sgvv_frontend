import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  overflow-y: hidden;
`;

export const FlexItem = styled.div`
  width: 50%;
  padding: 10px;
  @media (max-width: 600px) {
    width: 100%;
  }
  /* overflow-y: hidden; */
`;
