import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { 
  cardHolder as cardHolderRgx,
  cardNumber as cardNumberRgx,
  expDate as expDateRgx,
  cvc as cvcRgx
} from "utils/regexValidation";
import { formatCardNumber, formatExpirationDate, toCamelCase } from "utils/strings";

import * as T from "./types";
import * as S from "./styles";

function FormModal({show, onClose} :T.FormModalProps) {
  
  const defaultValues = {
    cardAlias: "",
    cardHolder: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
  };

  const [formValue, setFormValue] = useState(defaultValues);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      alert("invalid form");
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    console.log("form event", event);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setFormValue({...formValue, [toCamelCase(name)]: value});
  };

  return (
    <S.Modal
      show={show}
      onHide={onClose}
      centered
    >
      <S.ModalHeader closeButton/>
      <S.ModalBody >
        <S.ModalTitle>Add new card</S.ModalTitle>
        <S.Form 
          id="card-form" 
          autoComplete="on" 
          noValidate 
          validated={validated} 
          onSubmit={handleSubmit}
        >
          <S.FormGroup controlid="card-alias">
            <S.FormLabel>Card Alias*</S.FormLabel>
            <S.Form.Control
              required
              name="card-alias"
              type="text"
              value={formValue.cardAlias}
              placeholder="e.g Blackfriday Sales"
              onChange={handleOnChange}
            />
            <S.Form.Control.Feedback type="invalid">
              {"Card alias is required!"}
            </S.Form.Control.Feedback>
          </S.FormGroup>

          <S.FormGroup controlid="card-holder">
            <S.FormLabel>Card holder*</S.FormLabel>
            <S.Form.Control
              required
              name="card-holder"
              type="text"
              pattern={cardHolderRgx}
              value={formValue.cardHolder}
              placeholder="Dino S. Sauro"
              onChange={handleOnChange}
            />
            <S.Form.Control.Feedback type="invalid">
              {formValue.cardHolder.length > 0 ? 
                "It cannot contain accentuation or special characters!" 
                : "Card holder is required!"
              }
            </S.Form.Control.Feedback>
          </S.FormGroup>

          <S.FormGroup controlid="card-number">
            <S.FormLabel>Credit/debit card number*</S.FormLabel>
            <InputGroup hasValidation>
              <S.Form.Control
                type="tel"
                name="card-number"
                inputMode="numeric"
                autoComplete="cc-number"
                required
                pattern={cardNumberRgx}
                maxLength={19}
                value={formatCardNumber(formValue.cardNumber)}
                placeholder="XXXX XXXX XXXX XXXX"
                onChange={handleOnChange}
              />
              <S.Form.Control.Feedback type="invalid">
                {"Insert a valid number between 14 and 16 digits!"}
              </S.Form.Control.Feedback>
            </InputGroup>
          </S.FormGroup>

          <Row>
            <S.FormGroup as={Col} md="7" controlid="exp-date">
              <S.FormLabel>Expiration month and year*</S.FormLabel>
              <S.Form.Control 
                type="tel" 
                name="exp-date"
                inputMode="numeric"
                required 
                pattern={expDateRgx}
                maxLength={5}
                value={formatExpirationDate(formValue.expDate)}
                placeholder="MM/YY"
                onChange={handleOnChange}
              />
              <S.Form.Control.Feedback type="invalid">
                {"Insert a valid date!"}
              </S.Form.Control.Feedback>
            </S.FormGroup>

            <S.FormGroup as={Col} md="5" controlid="cvc">
              <S.FormLabel>CVC*</S.FormLabel>
              <S.Form.Control 
                type="tel" 
                name="cvc"
                inputMode="numeric"
                required 
                pattern={cvcRgx}
                maxLength={4}
                value={formValue.cvc}
                placeholder="CVC"
                onChange={handleOnChange}
              />
              <S.Form.Control.Feedback type="invalid">
                {"Should have ate least 3 characters"}
              </S.Form.Control.Feedback> 
            </S.FormGroup>
          </Row>

          <S.FormLegend>*This field is mandatory</S.FormLegend>

          {/* <Button type="submit">Submit form</Button> */}
        </S.Form>
      </S.ModalBody>

      <S.ModalFooter>
        <Button form="card-form" variant="primary" type="submit">Add card</Button>
        <Button variant="outline-secondary" onClick={onClose}>
          {"cancel"}
        </Button>
      </S.ModalFooter>
    </S.Modal>
  );
}

export default FormModal;