import { Icon } from "components/Icon";

import * as S from "./styles";
import * as T from "./types";

function InfoCard({title, type, number, client, code, expDate}: T.InfoCardProps) {
  return (
    <S.InfoCardContainer>
      <S.InfoContainer>
        <S.TypeContainer>
          <Icon name={type} />
          <div>{title}</div>
        </S.TypeContainer>

        <S.PersonalDataContainer>
          <S.UserContainer>
            <S.CardNumber>{number}</S.CardNumber>
            <div>{client}</div>
          </S.UserContainer>

          <S.CodeContainer>
            <div>{code}</div>
            <div>{expDate}</div>
          </S.CodeContainer>
        </S.PersonalDataContainer>
      </S.InfoContainer>

      <S.ActionsContainer>
        <Icon name="edit" />
        <Icon name="delete" />
      </S.ActionsContainer>
    </S.InfoCardContainer>
  );
}

export default InfoCard;