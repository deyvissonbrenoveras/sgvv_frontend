import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;

  svg {
    font-size: 24px;
  }
  div {
    text-align: center;
    padding: 2px;
    border-radius: 4px;
    background-color: rgba(255, 189, 46, 1);
    font-size: ${(props) => (props.large ? '24px' : '12px')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: ${(props) => (props.large ? '230px' : '100px')};
    width: 70%;
    margin: 0 auto;
  }
  img {
    width: ${(props) => (props.large ? '150px' : '32px')};
    height: ${(props) => (props.large ? '150px' : '32px')};
    max-width: ${(props) => (props.large ? '150px' : '32px')};
    max-height: ${(props) => (props.large ? '150px' : '32px')};
    border-radius: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
