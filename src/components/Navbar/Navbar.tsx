import logoImg from "assets/images/logo.svg";

import * as S from "./style";

function Navbar() {
  return (
    <S.NavbarContainer>
      <img src={logoImg} alt="logo" />
      <p>My Cards</p>
    </S.NavbarContainer>
  );
}

export default Navbar;