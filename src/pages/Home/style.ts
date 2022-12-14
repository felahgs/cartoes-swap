import styled from "styled-components";
import {devices} from "utils/breakpoints";

export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 40px 0;
  background: #F9FAFB;
`;

export const ListContainer = styled.div`
  @media ${devices.desktop} {
    width: 860px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CardsContainer = styled.div`

`;
