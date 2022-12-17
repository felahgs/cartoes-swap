import React, { useLayoutEffect, useState } from "react";
import { useAsyncFn, useDebounce, useLocalStorage } from "react-use";

import { Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { localStorages } from "constants/storage";
import { CardModel } from "models/card.model";
import { v4 as uuidv4 } from "uuid";

import { api } from "services/binlist";

import { Button } from "components/Button";

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
  formatToNumberOnly,
  toCamelCase,
  removeWhiteSpaces,
} from "utils/strings";

import * as S from "./styles";
import * as T from "./types";

function FormModal({ show, onClose, editingCard }: T.FormModalProps) {
  const defaultValues = {
    id: "",
    cardAlias: "",
    cardHolder: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
    scheme: "none",
  };

  const { CARDS } = localStorages;
  const [ cardsStorage, setCardsStorage ] = useLocalStorage<CardModel[]>(
    CARDS,
    []
  );
  const [ isTypingCardNumber, setIsTypingCardNumber ] = useState(false);
  const [ formValues, setformValues ] = useState(editingCard || defaultValues);
  const [ validated, setValidated ] = useState(false);
  const isEditing = !!editingCard;

  const buttonLabel = isEditing ? "Edit" : "Add card";

  const [ cardSchema, fetchSchema ] = useAsyncFn(async () => {
    try {
      const { cardNumber } = formValues;
      const response = await api.get(cardNumber);
      const result = response.data;
      const { scheme } = result;
      result.scheme
        ? setformValues({ ...formValues, scheme })
        : setformValues({ ...formValues, scheme: "none" });

      return result;
    } catch (err) {
      setformValues({ ...formValues, scheme: "none" });
    }
  }, [ formValues ]);

  const [ , ] = useDebounce(
    () => {
      const { cardNumber } = formValues;

      if (cardNumber.match(cardNumberRgx)) {
        fetchSchema();
      }
      setIsTypingCardNumber(false);
    },
    1500,
    [ formValues.cardNumber ]
  );

  const isLoading = cardSchema.loading || isTypingCardNumber;

  function createCard() {
    const newCard = { ...formValues, id: uuidv4() };

    return cardsStorage
      ? setCardsStorage([ ...cardsStorage, newCard ])
      : setCardsStorage([ newCard ]);
  }

  function updateCard() {
    if (!cardsStorage) return;

    const updatedCardList = cardsStorage.map((card) =>
      card.id === formValues.id ? formValues : card
    );

    setCardsStorage(updatedCardList);
  }

  function handleSaveCard() {
    return isEditing ? updateCard() : createCard();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleSaveCard();
    }

    setValidated(true);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { title, value } = event.target;
    const formattedName = toCamelCase(title);
    let formattedValue = value;

    if (formattedName === "cardNumber") {
      if (formatToNumberOnly(formValues.cardNumber) 
        !== formatToNumberOnly(value)) {
        setIsTypingCardNumber(true);
      }

      formattedValue = removeWhiteSpaces(value);
    }

    setformValues({ ...formValues, [ formattedName ]: formattedValue });
  }

  function handleClose() {
    onClose();
    setValidated(false);
  }

  useLayoutEffect(() => {
    if (editingCard) {
      setformValues(editingCard);
    } else {
      setformValues(defaultValues);
    }
  }, [ editingCard ]);

  return (
    <S.Modal show={show} onHide={handleClose} centered>
      <S.ModalHeader closeButton />
      <S.ModalBody>
        <S.ModalTitle>{isEditing ? "Edit card" : "Add new Card"}</S.ModalTitle>
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
              title="card-alias"
              type="text"
              maxLength={25}
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
              title="card-holder"
              type="text"
              pattern={cardHolderRgx}
              maxLength={25}
              value={formValues.cardHolder}
              placeholder="e.g Dino S Sauro"
              onChange={handleOnChange}
            />
            <S.Form.Control.Feedback type="invalid">
              {formValues.cardHolder.length > 0
                ? "It cannot contain accentuation or special characters!"
                : "Card holder is required!"}
            </S.Form.Control.Feedback>
          </S.FormGroup>

          <S.FormGroup controlid="card-number">
            <S.FormLabel>Credit/debit card number*</S.FormLabel>
            <InputGroup hasValidation>
              <S.Form.Control
                type="numbers"
                title="card-number"
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
                title="exp-date"
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
                title="cvc"
                inputMode="numeric"
                required
                pattern={cvcRgx}
                maxLength={4}
                value={formatToNumberOnly(formValues.cvc)}
                placeholder="CVC"
                onChange={handleOnChange}
              />
              <S.Form.Control.Feedback type="invalid">
                {"Should have ate least 3 characters"}
              </S.Form.Control.Feedback>
            </S.FormGroup>
          </Row>

          <S.FormLegend>*This field is mandatory</S.FormLegend>
        </S.Form>
      </S.ModalBody>

      <S.ModalFooter>
        <Button
          disabled={isLoading}
          form="card-form"
          variant="primary"
          type="submit"
        >
          {isLoading ? (
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
          ) : (
            buttonLabel
          )}
        </Button>
        <Button variant="outline-secondary" onClick={handleClose}>
          {"cancel"}
        </Button>
      </S.ModalFooter>
    </S.Modal>
  );
}

export default FormModal;
