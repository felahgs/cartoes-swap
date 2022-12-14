import Button from "react-bootstrap/Button";

import { InfoCard } from "components/InfoCard";
import {IconNames} from "components/Icon";


import * as S from "./style";

const cards = [
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
          <Button>Add new card</Button>
        </S.HeaderContainer>
        <S.CardsContainer>
          {
            cards.length > 0 ?
              cards.map(card => <InfoCard key={card.id} {...card} type={card.type as IconNames} />)
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
