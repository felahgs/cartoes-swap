import { useState } from "react";
import { useLocalStorage } from "react-use";

import Button from "react-bootstrap/Button";

import { publicStorages } from "constants/storage";
import { CardModel } from "models/card.model";

import { IconNames } from "components/Icon";
import { InfoCard } from "components/InfoCard";
import { FormModal } from "components/Modals";

export { publicStorages } from "constants/storage";

import * as S from "./styles";

const { CARDS } = publicStorages;

function Home() {

  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [ cards ] = useLocalStorage<CardModel[]>(CARDS, []);


  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  return (
    <S.PageContainer className="Home">
      <FormModal show={showModal} onClose={handleHideModal} />
      <S.ListContainer>

        <S.HeaderContainer>
          <h1>My Cards</h1>
          <Button onClick={handleShowModal}>Add new card</Button>
        </S.HeaderContainer>
        <S.CardsContainer>
          {
            cards && cards.length > 0 ?
              cards.map(card => <InfoCard key={card.id} {...card} scheme={card.scheme as IconNames} />)
              :
              <S.NoCards>
                <h2>No cards yet</h2>
                <p>{"When you have cards you'll"}</p>
                <p>see them here</p>
              </S.NoCards>
          }
        </S.CardsContainer>
      </S.ListContainer>
    </S.PageContainer>
  );
}

export default Home;
