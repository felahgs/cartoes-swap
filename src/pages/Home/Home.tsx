import { useState } from "react";
import { useLocalStorage } from "react-use";

import { modalNames } from "constants/modal";
import { localStorages } from "constants/storage";
import { CardModel } from "models/card.model";

import { Button } from "components/Button";
import { IconNames } from "components/Icon";
import { InfoCard } from "components/InfoCard";
import { CofirmationModal, FormModal } from "components/Modals";

export { localStorages } from "constants/storage";

import * as S from "./styles";

const { CARDS } = localStorages;

function Home() {
  const { CONFIRMATION_MODAL, FORM_MODAL } = modalNames;
  const [ activeModal, setActiveModal ] = useState<string>("");
  const [ editingCard, setEditingCard ] = useState<CardModel | null>(null);
  const [ selectedCard, setSelectedCard ] = useState<string>("");
  const [ cards, setCards ] = useLocalStorage<CardModel[]>(CARDS, []);

  function handleCloseModal() {
    if(activeModal === modalNames.FORM_MODAL) setEditingCard(null);
    setActiveModal("");
  }

  function handleAddCard() {
    setEditingCard(null);
    setActiveModal(FORM_MODAL);
  }

  function handleCardEditAction(id: string) {
    const cardToEdit = cards?.find((card) => card.id === id);
    setActiveModal(FORM_MODAL);

    return cardToEdit ? setEditingCard(cardToEdit) : null;
  }

  function handleCardDeleteAction(id: string) {
    setActiveModal(CONFIRMATION_MODAL);
    setSelectedCard(id);
  }

  function handleOnConfirm() {
    const updatedCards = cards?.filter((card) => card.id !== selectedCard);
    setCards(updatedCards);
    setActiveModal("");
  }

  return (
    <S.PageContainer className="Home">
      <FormModal editingCard={editingCard} show={activeModal === FORM_MODAL} onClose={handleCloseModal} />
      <CofirmationModal
        message="Are you sure you want to delete this card?"
        show={activeModal === CONFIRMATION_MODAL}
        onClose={handleCloseModal}
        onConfirm={handleOnConfirm}
      />
      <S.ListContainer>
        <S.HeaderContainer>
          <h1>My Cards</h1>
          <Button onClick={handleAddCard}>
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
                onEdit={() => handleCardEditAction(card.id)}
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
