import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import CardsList from "./Cardslist";

const mockedCards = [
  {
    id: "1",
    cardAlias: "Mocked Alias 1",
    cardHolder: "Mocked Holder Name 1",
    cardNumber: "1000100010001000",
    cvc: "123",
    expDate: "12/2022",
    scheme: "master",
  },
  {
    id: "2",
    cardAlias: "Mocked Alias 2",
    cardHolder: "Mocked Holder Name 2",
    cardNumber: "2000200020002000",
    cvc: "234",
    expDate: "12/2022",
    scheme: "master",
  },

  {
    id: "3",
    cardAlias: "Mocked Alias 3",
    cardHolder: "Mocked Holder Name 3",
    cardNumber: "3000300030003000",
    cvc: "345",
    expDate: "12/2022",
    scheme: "master",
  },
];

describe("CardsList", () => {
  const setCardlistMocked = jest.fn();
  it("should render the list component with all the cards", () => {
    render(<CardsList cards={mockedCards} setCards={setCardlistMocked} />);

    expect(screen.getByText(/Mocked Holder Name 1/i)).not.toBeInTheDocument;
    expect(screen.getByText(/Mocked Holder Name 2/i)).not.toBeInTheDocument;
    expect(screen.getByText(/Mocked Holder Name 3/i)).not.toBeInTheDocument;
  });

  it("should render the with a 'no cards' message", () => {
    render(<CardsList cards={[]} setCards={setCardlistMocked} />);
    expect(screen.getByText(/No cards yet/i)).not.toBeInTheDocument;
  });

  it("should open a modal for creating a new card", () => {
    render(<CardsList cards={mockedCards} setCards={setCardlistMocked} />);

    const button = screen.getByRole("button", { name: "Add new card" });
    fireEvent.click(button);

    expect(screen.findByRole("button", { name: "Add card" })).toBeInTheDocument;
  });

  it("should be able to close a modal for creating a new card", async () => {
    render(<CardsList cards={mockedCards} setCards={setCardlistMocked} />);
    jest.useFakeTimers();

    const newCardBtn = screen.getByRole("button", { name: "Add new card" });
    fireEvent.click(newCardBtn);

    const cancelBtn = screen.getByRole("button", { name: "cancel" });
    fireEvent.click(cancelBtn);

    // Grant that the timeout for checking the screen will be concluded
    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: "Add card" })
      ).not.toBeInTheDocument()
    );

    jest.useRealTimers();
  });

  it("should be able to open a modal for editing a card", async () => {
    render(<CardsList cards={mockedCards} setCards={setCardlistMocked} />);

    const editBtn = screen.getAllByRole("button", { name: "edit" });
    fireEvent.click(editBtn[0]);

    const cardHolderInput = screen.getByRole("textbox", {
      name: "card-holder",
    });
    expect(cardHolderInput).toHaveDisplayValue("Mocked Holder Name 1");
  });

  it("should be able to open a modal for editing a card", async () => {
    render(<CardsList cards={mockedCards} setCards={setCardlistMocked} />);

    const editBtn = screen.getAllByRole("button", { name: "edit" });
    fireEvent.click(editBtn[0]);

    const cardHolderInput = screen.getByRole("textbox", {
      name: "card-holder",
    });
    expect(cardHolderInput).toHaveDisplayValue("Mocked Holder Name 1");
  });

  it("should open a confirmation modal for deleting the card", async () => {
    render(<CardsList cards={mockedCards} setCards={setCardlistMocked} />);

    const deleteBtn = screen.getAllByRole("button", { name: "delete" });
    fireEvent.click(deleteBtn[0]);

    expect(screen.getByText(/Are you sure you want to delete this card?/i)).not
      .toBeInTheDocument;
  });

  it("should call setCards removing the selected card", async () => {
    render(<CardsList cards={mockedCards} setCards={setCardlistMocked} />);

    const deleteBtn = screen.getAllByRole("button", { name: "delete" });
    fireEvent.click(deleteBtn[0]);

    const confirmBtn = screen.getByRole("button", { name: "Yes, I'm sure" });
    fireEvent.click(confirmBtn);

    const updatedCards = mockedCards.filter((card) => card.id !== "1");
    expect(setCardlistMocked).toHaveBeenCalledWith(updatedCards);
  });
});
