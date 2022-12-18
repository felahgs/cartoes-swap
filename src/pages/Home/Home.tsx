import { useLocalStorage } from "react-use";

import { localStorages } from "constants/storage";
import { CardModel } from "models/card.model";

import { CardsList } from "components/CardsList";
import { Navbar } from "components/Navbar";

import * as S from "./styles";

const { CARDS } = localStorages;

function Home() {
  const [cards, setCards] = useLocalStorage<CardModel[]>(CARDS, []);

  return (
    <>
      <Navbar />
      <S.HomeContainer>
        <CardsList cards={cards} setCards={setCards} />
      </S.HomeContainer>
    </>
  );
}

export default Home;
