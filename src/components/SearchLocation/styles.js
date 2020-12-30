import styled from 'styled-components';
import { darken } from 'polished';
import { VscLoading } from 'react-icons/vsc';

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

export const LoadingIcon = styled(VscLoading)`
  display: ${(props) => (props.loading ? 'block' : 'none')};
  position: absolute;
  right: 2px;
  top: 55%;
  -webkit-animation: spin 2s linear infinite;
  -moz-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
