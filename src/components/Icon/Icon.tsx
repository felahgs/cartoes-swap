import trashIcon from "assets/icons/trash.svg";
import editIcon from "assets/icons/edit.svg";
import amex from "assets/icons/card-amex.svg";
import cardBack from "assets/icons/card-back.svg";
import dinersClub from "assets/icons/card-diners-club.svg";
import discover from "assets/icons/card-discover.svg";
import jcb from "assets/icons/card-jcb.svg";
import visa from "assets/icons/card-visa.svg";
import masterCard from "assets/icons/card-master.svg";

import * as T from "./types";

const iconList = {
  edit: editIcon,
  delete: trashIcon,
  amex: amex,
  none: cardBack,
  dinersClub: dinersClub,
  discover: discover,
  visa: visa,
  masterCard: masterCard,
  jcb: jcb,
};

function Icon({name}: T.IconProps) {
  return (
    <i title={name}>
      <img src={iconList[name]} alt={name} />
    </i>
  );
}

export default Icon;