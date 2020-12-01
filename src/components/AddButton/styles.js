import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: absolute;
  bottom: 30px;
  right: 40px;
  border-radius: 50%;
  background: rgb(255, 189, 46);
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  svg {
    font-size: 32px;
  }
  &:hover {
    cursor: pointer;
    background: ${darken(0.1, 'rgb(255, 189, 46)')};
  }
`;
