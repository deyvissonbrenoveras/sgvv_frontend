import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

export const AvatarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const LocationContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      display: flex;
      align-items: end;
      justify-content: center;
      svg {
        font-size: 24px;
      }
    }
  }
  h2 {
    /* display: inline; */
  }
  svg {
    /* display: inline; */
    font-size: 32px;
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  svg {
    font-size: 30px;
  }
  & > div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      font-size: 20px;
      font-weight: normal;
    }
  }
`;

export const CloseButton = styled.button`
  margin-top: 15px;
  background: #ff0000;
  color: #fff;
  outline: 0;
  border: 0;
  padding: 5px 10px;
  border-radius: 10px;
`;
export const AmountContainer = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  input {
    display: inline;
  }
`;

export const Amount = styled.div`
  color: white;
  background-color: green;
  border-radius: 5px;
  padding: 0 5px;
`;

export const AmountSpent = styled.div`
  color: white;
  background-color: red;
  border-radius: 5px;
  padding: 0 5px;
`;
export const ReturnedAmount = styled.div`
  color: white;
  background-color: blue;
  border-radius: 5px;
  padding: 0 5px;
`;

export const AmountBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2px;
`;
