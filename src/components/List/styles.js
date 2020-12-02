import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.ul``;
export const Item = styled.li`
  a {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    border-radius: 4px;
    &:hover {
      cursor: pointer;
      background-color: ${darken(0.03, '#FFF')};
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }
    svg {
      width: 60px;
      font-size: 60px;
      margin-right: 10px;
      color: #e3e3e3;
    }
    display: flex;
    align-items: center;
    height: 64px;
  }
`;
