import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgb(255, 189, 46);
  background: linear-gradient(
    31deg,
    rgba(255, 189, 46, 1) 29%,
    rgba(255, 0, 0, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const Content = styled.div`
  width: 100%;
  flex: 0.9;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
`;
export const BottomMenu = styled.ul`
  flex: 0.1;
  width: 100%;
  max-width: 1000px;
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  li {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14;
    cursor: pointer;
    &:hover {
      background-color: ${lighten(0.2, 'rgba(255, 189, 46, 1)')};
    }
    svg {
      font-size: 32px;
      margin: 0 5px;
    }
  }
`;
