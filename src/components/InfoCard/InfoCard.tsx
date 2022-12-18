import { Button } from "components/Button";
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
        <Button title="edit-card" onClick={onEdit} size="sm" variant="link">
          <Icon name="edit" />
        </Button>
        <Button title="delete-card" onClick={onDelete} size="sm" variant="link">
          <Icon name="delete" />
        </Button>
      </S.ActionsContainer>
    </S.InfoCardContainer>
  );
}

export default InfoCard;
