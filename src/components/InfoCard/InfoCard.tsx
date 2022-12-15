import { Icon } from "components/Icon";

import { hideCardNumber } from "utils/strings";

import * as S from "./styles";
import * as T from "./types";

function InfoCard({ cardAlias, scheme, cardNumber, cardHolder, cvc, expDate }: T.InfoCardProps) {
  return (
    <S.InfoCardContainer>
      <S.InfoContainer>
        <S.TypeContainer>
          <Icon name={scheme} />
          <div>{cardAlias}</div>
        </S.TypeContainer>

        <S.PersonalDataContainer>
          <S.UserContainer>
            <S.CardNumber>{hideCardNumber(cardNumber)}</S.CardNumber>
            <div>{cardHolder}</div>
          </S.UserContainer>

          <S.CodeContainer>
            <div>{cvc}</div>
            <div>{expDate}</div>
          </S.CodeContainer>
        </S.PersonalDataContainer>
      </S.InfoContainer>

      <S.ActionsContainer>
        <Icon onClick={() => console.log("do something")} name="edit" />
        <Icon onClick={() => console.log("do something")} name="delete" />
      </S.ActionsContainer>
    </S.InfoCardContainer>
  );
}

export default InfoCard;