import styled from "styled-components";

export const InfoCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  margin: 16px 0;
  padding: 0 16px;
  min-height: 100px;

  font-size: 16px;
  color: #6B7280;
  background: #FFFFFF;

  transition: bottom 0.2s ease-in-out 0s;
  bottom: 0;

  &:hover {
    box-shadow: 0px 1px 20px 6px rgba(0, 0, 0, 0.08);
    position: relative;
    bottom: 4px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
  flex-wrap: wrap;

  width: 90%;
`;

export const TypeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  width: 30%;
`;

export const PersonalDataContainer =styled.div`
  flex-wrap: wrap;
  display: flex;
  column-gap: 30px;
  flex-direction: row;
`;

export const CardNumber = styled.div`
  color: #233876;
`;

export const UserContainer = styled.div`
  /* width: 30%; */
  
`;

export const CodeContainer = styled.div`
  /* width: 30%; */
  
`;

export const ActionsContainer = styled.div`  
`;
