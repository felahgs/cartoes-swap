import styled from "styled-components";

import {devices} from "utils/breakpoints";

export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: calc(100% - 50px);
  position: relative;

  padding: 80px 0;
  background: #F9FAFB;
`;

export const ListContainer = styled.div`
  padding: 0 16px;
  
  @media ${devices.desktop} {
    width: 860px;
    margin-bottom: 40px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  padding: 36px 0;

  h1 {
    color: #233876;
    font-weight: 700;
    font-size: 36px;
  }
`;

export const CardsContainer = styled.div`
`;

export const NoCards = styled.div`
  text-align: center;
  padding-top: 36px;

  h2 {
    font-weight: 700;
    font-size: 24px;
    color: #6B7280;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    color: #6B7280;
  }
`;