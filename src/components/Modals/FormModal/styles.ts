import BForm from "react-bootstrap/Form";
import BModal from "react-bootstrap/Modal";

import styled from "styled-components";


export const CardFormContainer = styled.div`
  
`;

export const Form = styled(BForm)`
  /* padding: 0 32px; */
`;

export const FormGroup = styled(BForm.Group)`
  /* background-color: blue; */
  margin: 16px 0;
`;

export const FormLabel = styled(BForm.Label)`
  color: #233876;
  font-size: 14px;
  font-weight: 500;
`;

export const FormLegend = styled.p`
  font-size: 12px;
  color: #6B7280;
`;

export const Modal = styled(BModal)``;

export const ModalTitle = styled(BModal.Title)`
  color: #111C4E;
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
