import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgb(255, 189, 46);
  background: linear-gradient(
    31deg,
    rgba(255, 189, 46, 1) 29%,
    rgba(255, 0, 0, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const Content = styled.div`
  width: 400px;
  height: 95%;
  max-width: 1000px;
  background-color: white;
  border-radius: 10px;
`;
