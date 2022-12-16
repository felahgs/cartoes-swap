import { ButtonProps } from "react-bootstrap";

import * as S from "./styles";

function Button({ ...props }: ButtonProps) {
  return (
    <S.Button {...props} />
  );
}

export default Button;