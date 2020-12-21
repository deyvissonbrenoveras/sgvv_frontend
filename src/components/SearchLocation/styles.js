import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: relative;
  label {
    position: relative;
    input {
      width: 100%;
      padding-right: 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

export const LocationList = styled.ul`
  z-index: 10000;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  background-color: #f5f5f5;
  border-radius: 5px;
  width: 100%;
  button {
    border: none;
    outline: none;
    text-align: left;
    width: 100%;
    padding: 5px 3px;
    &:hover {
      cursor: pointer;
      background-color: ${darken(0.15, '#f5f5f5')};
    }
  }
`;

export const ClearButton = styled.button`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  background-color: transparent;
  outline: none;
  border: none;
  color: blue;
  position: absolute;
  right: 0;
  top: 45%;
`;
