import { Icon } from "components/Icon";

import { hideCardNumber } from "utils/strings";

import * as S from "./styles";
import * as T from "./types";

function InfoCard({
  cardAlias,
  scheme,
  cardNumber,
  cardHolder,
  cvc,
  expDate,
  onDelete,
  onEdit,
}: T.InfoCardProps) {

  return (
    <S.InfoCardContainer>
      <S.MainContent>
        <S.TypeContainer>
          <Icon name={scheme} />
          <div>{cardAlias}</div>
        </S.TypeContainer>

        <S.SensibleDataContainer>
          <S.UserContainer>
            <S.CardNumber>{hideCardNumber(cardNumber)}</S.CardNumber>
            <div>{cardHolder}</div>
          </S.UserContainer>

          <S.CodeContainer>
            <div>{cvc}</div>
            <div>{expDate}</div>
          </S.CodeContainer>
        </S.SensibleDataContainer>
      </S.MainContent>

      <S.ActionsContainer>
        <Icon onClick={onEdit} name="edit" />
        <Icon onClick={onDelete} name="delete" />
      </S.ActionsContainer>
    </S.InfoCardContainer>
  );
}

export default InfoCard;
