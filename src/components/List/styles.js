import styled from 'styled-components';

export const Container = styled.ul``;
export const Item = styled.li`
  a {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    &:hover {
      cursor: pointer;
    }
    img {
      max-width: 60px;
      max-height: 60px;
      border-radius: 50%;
    }
    svg {
      width: 60px;
      font-size: 20;
    }
    display: flex;
    align-items: center;
    height: 64px;
  }
`;
