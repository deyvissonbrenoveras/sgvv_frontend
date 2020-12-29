import styled from 'styled-components';

export const Container = styled.div`
  position: ${(props) => (props.expanded ? 'relative' : 'absolute')};
  bottom: 20px;
  width: ${(props) => (props.expanded ? '100%' : '200px')};
  height: ${(props) => (props.expanded ? '100%' : '100px')};
`;

export const ExpandButton = styled.button`
  background-color: transparent;
  z-index: 500;
  position: absolute;
  bottom: ${(props) => (props.expanded ? 'auto' : '90px')};
  left: ${(props) => (props.expanded ? 'auto' : '183px')};
  right: ${(props) => (props.expanded ? '40px' : 'auto')};
  top: ${(props) => (props.expanded ? '20px' : 'auto')};
  border: none;
  outline: none;
`;
