import amex from "assets/icons/card-amex.svg";
import cardBack from "assets/icons/card-back.svg";
import diners from "assets/icons/card-diners-club.svg";
import discover from "assets/icons/card-discover.svg";
import jcb from "assets/icons/card-jcb.svg";
import mastercard from "assets/icons/card-master.svg";
import visa from "assets/icons/card-visa.svg";
import editIcon from "assets/icons/edit.svg";
import trashIcon from "assets/icons/trash.svg";

import * as S from "./styles";
import * as T from "./types";

const iconList = {
  edit: editIcon,
  delete: trashIcon,
  amex: amex,
  none: cardBack,
  diners: diners,
  discover: discover,
  visa: visa,
  mastercard: mastercard,
  jcb: jcb,
};

function Icon({ name, onClick }: T.IconProps) {
  return (
    <S.ClicklabeIcon clickable={!!onClick} title={name} onClick={onClick}>
      <img src={iconList?.[ name ]} alt={name} />
    </S.ClicklabeIcon>
  );
}

export default Icon;