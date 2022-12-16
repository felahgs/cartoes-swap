import styled from "styled-components";

import { devices } from "utils/breakpoints";

export const InfoCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  margin: 16px 0;
  padding: 16px;
  min-height: 100px;
  height: 175px;

  font-size: 16px;
  color: #6B7280;
  background: #FFFFFF;

  transition: bottom 0.1s ease-in-out 0s;
  bottom: 0;

  white-space: nowrap;

  &:hover {
    box-shadow: 0px 1px 20px 6px rgba(0, 0, 0, 0.08);
    position: relative;
    bottom: 2px;
  }

  @media ${devices.mobileL} {
    padding: 0 16px;
    height: auto;
  }
`;

export const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 75%;
  row-gap: 20px;
  column-gap: 75px;

  @media ${devices.mobileL} {
    flex-direction: row;
    align-items: center;
  }

  @media ${devices.laptop} {
      width: 60%;
      justify-content: space-between;
     }
`;

export const ActionsContainer = styled.div`  
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    column-gap: 10px;
    flex-direction: column;

    width: 20%;
    height: 100%;

    @media ${devices.mobileL} {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
     }

    @media ${devices.laptop} {
      width: 35%;
     }
  `;
  
export const TypeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    width: 40%;
  `;

export const SensibleDataContainer =styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  column-gap: 30px;
  row-gap: 20px;
  justify-content: space-between;
    
  @media ${devices.laptop} {
    width: 50%;
    flex-direction: row;
  }
`;

export const UserContainer = styled.div`  
`;

export const CodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media ${devices.laptop} {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const CardNumber = styled.div`
  color: #233876;
`;



