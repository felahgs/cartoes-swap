import { Button as BSButton } from "react-bootstrap";

import styled from "styled-components";

export const Button = styled(BSButton)`
  height: 37px;
  display: flex;
  align-items: center;
  &.btn-primary {
    background-color: #233876;
    border-color: #233876;

    font-weight: 500;
  }

  &.btn-outline-secondary {
    color: #1f2a37;
  }

  &.btn-danger {
    --bs-btn-bg: #f98080;
    --bs-btn-border-color: #f98080;
    --bs-btn-hover-bg: #b85f5f;
    --bs-btn-hover-border-color: #b85f5f;
    --bs-btn-active-bg: #b85f5f;
    --bs-btn-disabled-bg: #f98080;
    --bs-btn-disabled-border-color: #f98080;
  }

  &.btn-primary:disabled {
    background-color: #233876;
    border-color: #233876;
  }
`;
