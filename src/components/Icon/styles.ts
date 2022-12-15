import styled from "styled-components";

import { ClicklabeIconProps } from "./types";

export const ClicklabeIcon = styled.span`
  cursor: ${(props: ClicklabeIconProps) => props.clickable ? "pointer" : "default" };
`;