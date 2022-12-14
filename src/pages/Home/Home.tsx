import { InfoCard } from "components/InfoCard";
import {IconNames} from "components/Icon";

import * as S from "./style";
import "./Home.css";


const mockedCards = [
  {id: 1, type: "visa", title: "Cartão do Uber", number: "1234567898765432", client: "JOHN DOE", code: "123", expDate: "07/2032"},
  {id: 2, type: "masterCard", title: "ifood de sexta", number: "1234567898765432", client: "JOHN DOE", code: "123", expDate: "07/2030"},
  {id: 3, type: "visa", title: "Livros da Amazon", number: "1234567898765432", client: "JOHN DOE", code: "123", expDate: "07/2030"},
  {id: 4, type: "none", title: "Cartão do Uber", number: "1234567898765432", client: "JOHN DOE", code: "123", expDate: "07/2030"},
  {id: 5, type: "none", title: "Cartão do Uber", number: "1234567898765432", client: "JOHN DOE", code: "123", expDate: "07/2030"},
  {id: 6, type: "masterCard", title: "Caju", number: "1234567898765432", client: "JOHN DOE", code: "123", expDate: "07/2030"},
  {id: 7, type: "jcb", title: "Livrarias", number: "1234567898765432", client: "JOHN DOE", code: "123", expDate: "07/2030"}
];

function Home() {
  return (
    <S.PageContainer className="Home">
      <S.ListContainer>

        <S.HeaderContainer>
          <h1>My Cards</h1>
          <button>Add new card</button>
        </S.HeaderContainer>
        <S.CardsContainer>
          {mockedCards.map(card => <InfoCard key={card.id} {...card} type={card.type as IconNames} />)}
        </S.CardsContainer>
      </S.ListContainer>
    </S.PageContainer>
  );
}

export default Home;
