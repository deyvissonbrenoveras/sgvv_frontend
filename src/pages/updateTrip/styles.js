import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

export const AvatarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
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
