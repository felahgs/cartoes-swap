import { InputGroup as BInputGroup } from "react-bootstrap";
import BForm from "react-bootstrap/Form";
import BModal from "react-bootstrap/Modal";

import styled from "styled-components";

import { devices } from "utils/breakpoints";

export const Form = styled(BForm)``;

export const FormGroup = styled(BForm.Group)`
  margin: 16px 0;
`;

export const FormLabel = styled(BForm.Label)`
  color: #233876;
  font-size: 14px;
  font-weight: 500;
`;

export const FormLegend = styled.p`
  font-size: 12px;
  color: #6b7280;
`;

export const InputGroupText = styled(BInputGroup.Text)`
  display: none;

  @media ${devices.mobileS} {
    display: block;
  }
`;

export const Modal = styled(BModal)`
  .modal-content {
    max-width: 416px;
  }
`;

export const ModalTitle = styled(BModal.Title)`
  color: #111c4e;
`;

export const ModalHeader = styled(BModal.Header)`
  border: none;
  padding: 24px 32px 0;
`;

export const ModalBody = styled(BModal.Body)`
  padding: 16px 32px;
`;

export const ModalFooter = styled(BModal.Footer)`
  justify-content: flex-start;
  border: none;
  margin-bottom: 20px;
  padding: 24px 32px 16px;
`;

export const LoadingMessage = styled.p`
  padding-left: 8px;
`;
