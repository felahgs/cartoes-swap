import { useState } from "react";
import { useLocalStorage } from "react-use";

import Button from "react-bootstrap/Button";

import { modalNames } from "constants/modal";
import { localStorages } from "constants/storage";
import { CardModel } from "models/card.model";

import { IconNames } from "components/Icon";
import { InfoCard } from "components/InfoCard";
import { CofirmationModal, FormModal } from "components/Modals";

export { localStorages } from "constants/storage";

import * as S from "./styles";

const { CARDS } = localStorages;

function Home() {
  const { CONFIRMATION_MODAL, FORM_MODAL } = modalNames;
  const [activeModal, setModal] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [cards, setCards] = useLocalStorage<CardModel[]>(CARDS, []);

  function handleOpenModal(value: string) {
    setModal(value);
  }

  function handleCloseModal() {
    setModal("");
  }

  function handleCardEditAction() {
    handleOpenModal(FORM_MODAL);
  }

  function handleCardDeleteAction(id: string) {
    handleOpenModal(CONFIRMATION_MODAL);
    setSelectedCard(id);
  }

  function handleOnConfirm() {
    const updatedCards = cards?.filter((card) => card.id !== selectedCard);
    setCards(updatedCards);
  }

  return (
    <S.PageContainer className="Home">
      <FormModal show={activeModal === FORM_MODAL} onClose={handleCloseModal} />
      <CofirmationModal
        show={activeModal === CONFIRMATION_MODAL}
        onClose={handleCloseModal}
        onConfirm={handleOnConfirm}
      />
      <S.ListContainer>
        <S.HeaderContainer>
          <h1>My Cards</h1>
          <Button onClick={() => handleOpenModal(FORM_MODAL)}>
            Add new card
          </Button>
        </S.HeaderContainer>
        <S.CardsContainer>
          {cards && cards.length > 0 ? (
            cards.map((card) => (
              <InfoCard
                key={card.id}
                {...card}
                scheme={card.scheme as IconNames}
                onEdit={handleCardEditAction}
                onDelete={() => handleCardDeleteAction(card.id)}
              />
            ))
          ) : (
            <S.NoCards>
              <h2>No cards yet</h2>
              <p>{"When you have cards you'll"}</p>
              <p>see them here</p>
            </S.NoCards>
          )}
        </S.CardsContainer>
      </S.ListContainer>
    </S.PageContainer>
  );
}

export default Home;
