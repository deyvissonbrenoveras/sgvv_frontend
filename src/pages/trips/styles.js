import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
export const AvatarContainer = styled.div`
  width: 100%;
  text-align: center;
`;
export const AvatarImg = styled.img`
  text-align: center;
  justify-self: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;
export const TripsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  padding: 20px;
  thead {
    tr {
      th {
        font-size: 14px;
        letter-spacing: 2px;
        padding: 0 5px;
      }
    }
  }
  tbody {
    padding: 5px;
    width: 100%;
    tr {
      cursor: pointer;
      width: 100%;
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
      td {
        text-align: center;
        padding: 5px;
        font-size: 15px;
      }
      &:hover {
        background-color: ${darken(0.03, '#FFF')};
      }
    }
  }
`;
export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  font-size: 13px;
  /* @media (max-width: 600px) {
    flex-direction: column;
  } */
  form {
    width: auto;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    input {
      display: inline;
      margin: 0 5px;
      max-width: 135px;
    }
    label {
      text-align: center;
      display: inline;
      margin: 0;
    }
    button[type='submit'] {
      width: auto;
      margin: 0;
    }
  }

  svg {
    font-size: 14px;
  }
  label {
    padding: 2px;
  }
  select {
    margin: 5px;
  }
`;

export const DateFilter = styled.div`
  font-size: 26px;
  font-weight: bold;
  /* border: 1px solid red; */
`;
