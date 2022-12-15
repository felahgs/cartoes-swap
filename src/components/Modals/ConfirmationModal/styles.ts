import { Modal as BModal } from "react-bootstrap";

import styled from "styled-components";

export const Modal = styled(BModal)`
  color: #6B7280;
  font-size: 16px;

  .modal-content {
      max-width: 416px;
    }
`;

export const ModalHeader = styled(BModal.Header)`
    border: none;
    padding: 22px 22px 0;
`;

export const ModalBody = styled(BModal.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  padding: 12px;
`;

export const ModalFooter = styled(BModal.Footer)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding-bottom: 24px;

  border: none;
`;