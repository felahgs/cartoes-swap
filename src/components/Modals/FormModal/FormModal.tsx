import React, { useState } from "react";
import { useAsyncFn , useDebounce, useLocalStorage } from "react-use";

import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { v4 as uuidv4 } from "uuid";

import { api } from "services/binlist";

import { 
  cardHolder as cardHolderRgx,
  cardNumber as cardNumberRgx,
  cardNumberWhiteSpaces as spacedNumberRgx,
  expDate as expDateRgx,
  cvc as cvcRgx,
} from "utils/regexValidation";
import { 
  formatCardNumber, 
  formatExpirationDate,
  toCamelCase,
  removeWhiteSpaces
} from "utils/strings";


import * as S from "./styles";
import * as T from "./types";

function FormModal({ show, onClose } :T.FormModalProps) {
  
  const defaultValues = {
    cardAlias: "",
    cardHolder: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
    scheme: "none",
  };

  const [ cardsStorage, setCardsStorage ] = useLocalStorage<any>("cards", []);
  const [ isTypingCardNumber, setIsTypingCardNumber ] = useState(false);
  const [ formValues, setformValues ] = useState(defaultValues);
  const [ validated, setValidated ] = useState(false);

  const [ cardSchema, fetchSchema ] = useAsyncFn(async () => {
    try {
      const { cardNumber } = formValues;
      const response = await api.get(cardNumber);
      const result = response.data;
      const { scheme } = result;
      result.scheme ? setformValues({ ...formValues, scheme }) 
        : setformValues({ ...formValues, scheme: "none" });
  
      return result;
    }
    catch(err) {
      setformValues({ ...formValues, scheme: "none" });
    }
  }, [ formValues ]);

  const [ , ] = useDebounce(
    () => {
      const { cardNumber }  = formValues;

      console.log("regex test", !!cardNumber.match(cardNumberRgx));
      if (cardNumber.match(cardNumberRgx)) {
        fetchSchema();
      }
      setIsTypingCardNumber(false);
    },
    1500,
    [ formValues.cardNumber ]
  );
  const isLoading = cardSchema.loading || isTypingCardNumber;

  function saveCard() {
    const newCard = { id: uuidv4(), ...formValues };
    setCardsStorage([ ...cardsStorage, newCard ]);
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>)  {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else saveCard();

    // fetchSchema();
    setValidated(true);
  }

  console.log("card info", cardSchema);

  function handleOnChange (event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const formattedName = toCamelCase(name);
    let formattedValue = value;

    if (formattedName === "cardNumber") {
      setIsTypingCardNumber(true);
      formattedValue = removeWhiteSpaces(value);
    }
    
    setformValues({ ...formValues, [ formattedName ]: formattedValue });
  }

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
              value={formValues.cardAlias}
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
              value={formValues.cardHolder}
              placeholder="e.g Dino S Sauro"
              onChange={handleOnChange}
            />
            <S.Form.Control.Feedback type="invalid">
              {formValues.cardHolder.length > 0 ? 
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
                pattern={spacedNumberRgx}
                maxLength={19}
                value={formatCardNumber(formValues.cardNumber)}
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
                maxLength={7}
                value={formatExpirationDate(formValues.expDate)}
                placeholder="MM/YYYY"
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
                value={formValues.cvc}
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

        {formValues.cardHolder} <br></br>
        {formValues.cardAlias} <br></br>
        {formValues.cardNumber} <br></br>
        {formValues.expDate} <br></br>
        {formValues.cvc} <br></br>
        {formValues.scheme} <br></br>
      </S.ModalBody>

      <S.ModalFooter>
        <Button disabled={isLoading} form="card-form" variant="primary" type="submit">
          { isLoading ? 
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {" Loading..."}
            </>
            : "Add card"
          }
        </Button>
        <Button variant="outline-secondary" onClick={onClose}>
          {"cancel"}
        </Button>
      </S.ModalFooter>
    </S.Modal>
  );
}

export default FormModal;