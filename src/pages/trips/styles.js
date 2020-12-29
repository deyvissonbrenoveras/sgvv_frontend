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
  border-collapse: collapse;
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
      width: 100%;
      td {
        text-align: center;
        padding: 5px;
      }
    }
  }
`;
