// import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import * as T from "./types";
import * as S from "./styles";

// type Inputs = {
//   cardAlias: string,
//   cardHolder: string,
//   cardNumber: string,
//   expDate: string,
//   cvc: string,
// };

function FormModal({show, onClose} :T.FormModalProps) {
  // const { register, handleSubmit, watch, formState: { errors, isValid, isDirty } } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  
  // console.log(watch("cardAlias")); // watch input value by passing the name of it
  // console.log(errors);
  // console.log("has errors", !!errors);
  

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    console.log("form event", event);
  };

  return (
    <S.Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      centered
    >
      <S.ModalHeader closeButton/>
      {/* </S.ModalHeader> */}

      <S.ModalBody >
        <S.ModalTitle>Add new card</S.ModalTitle>
        <S.Form id="card-form" noValidate validated={validated} onSubmit={handleSubmit}>
          <S.FormGroup controlid="validationCustom01">
            <S.FormLabel>Card Alias*</S.FormLabel>
            <S.Form.Control
              required
              type="text"
              placeholder="e.g Blackfriday Sales"
              defaultValue="Mark"
              // {...register("cardAlias", { required: true })}
            />
            <S.Form.Control.Feedback type="invalid">
              {"It can't be empty!"}
            </S.Form.Control.Feedback>
            {/* <S.Form.Control.Feedback>Looks good!</S.Form.Control.Feedback> */}
          </S.FormGroup>

          <S.FormGroup controlid="validationCustom02">
            <S.FormLabel>Card holder*</S.FormLabel>
            <S.Form.Control
              required
              type="text"
            />
            <S.Form.Control.Feedback type="invalid">
              {"It can't be empty!"}
            </S.Form.Control.Feedback>
          </S.FormGroup>

          <S.FormGroup controlid="validationCustomUsername">
            <S.FormLabel>Credit/debit card number*</S.FormLabel>
            <InputGroup hasValidation>
              <S.Form.Control
                type="text"
                required
              />
              <S.Form.Control.Feedback type="invalid">
                {"It can't be empty!"}
              </S.Form.Control.Feedback>
            </InputGroup>
          </S.FormGroup>

          <Row>
            <S.FormGroup as={Col} md="7" controlid="validationCustom03">
              <S.FormLabel>Expiration month and year*</S.FormLabel>
              <S.Form.Control type="text" required />
              <S.Form.Control.Feedback type="invalid">
                {"It can't be empty!"}
              </S.Form.Control.Feedback>
            </S.FormGroup>

            <S.FormGroup as={Col} md="5" controlid="validationCustom04">
              <S.FormLabel>CVC*</S.FormLabel>
              <S.Form.Control type="text" required />
              <S.Form.Control.Feedback type="invalid">
                {"It can't be empty!"}
              </S.Form.Control.Feedback> 
            </S.FormGroup>
          </Row>

          <S.FormLegend>*This field is mandatory</S.FormLegend>

          {/* <Button type="submit">Submit form</Button> */}
        </S.Form>
      </S.ModalBody>

      <S.ModalFooter>
        <Button form="card-form" variant="primary" type="submit">Add card</Button>
        <Button variant="secondary" onClick={onClose}>
          {"cancel"}
        </Button>
      </S.ModalFooter>
    </S.Modal>
  );
}

export default FormModal;