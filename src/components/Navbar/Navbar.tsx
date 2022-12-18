import logoImg from "assets/images/logo.svg";

import * as S from "./styles";

function Navbar() {
  return (
    <header>
      <S.NavbarContainer>
        <img src={logoImg} alt="logo" />
        <p>My Cards</p>
      </S.NavbarContainer>
    </header>
  );
}

export default Navbar;
