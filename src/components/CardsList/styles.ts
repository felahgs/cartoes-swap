import styled from "styled-components";

import { devices } from "utils/breakpoints";

export const ListContainer = styled.div`
  padding: 0 16px;
  width: 100%;

  @media ${devices.tablet} {
    width: 90%;
    margin-bottom: 40px;
  }

  @media ${devices.laptop} {
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
    align-self: center;
    color: #233876;
    font-weight: 700;
    font-size: 20px;
    margin: 0;

    @media ${devices.mobileL} {
      font-size: 24px;
    }

    @media ${devices.tablet} {
      font-size: 36px;
    }
  }
`;

export const CardsContainer = styled.div``;

export const NoCards = styled.div`
  text-align: center;
  padding-top: 36px;

  h2 {
    font-weight: 700;
    font-size: 24px;
    color: #6b7280;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    color: #6b7280;
  }
`;
