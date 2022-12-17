import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { fakeLocalStorage } from "test/storage";

import FormModal from "./FormModal";

jest.mock("axios");
// jest.useFakeTimers();
// jest.spyOn(global, "setTimeout");

describe("FormModal", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: fakeLocalStorage,
    });
  });

  (axios.get as jest.Mock).mockResolvedValueOnce({
    data: { result: { scheme: "none" } },
  });

  const onCloseMock = jest.fn();
  const mockedCard = {
    id: "1",
    cardAlias: "Mocked Alias",
    cardHolder: "Mocked Holder Name",
    cardNumber: "5555555555555555",
    cvc: "555",
    expDate: "12/2022",
    scheme: "master",
  };

  it("should render the form modal with empty values and in Add mode", () => {
    render(<FormModal show={true} onClose={onCloseMock} />);

    expect(screen.getByText(/Add new Card/i)).toBeInTheDocument;
    expect(screen.queryByText(/Mocked Alias/i)).not.toBeInTheDocument;
    expect(screen.queryByText(/Mocked Holder Name/i)).not.toBeInTheDocument;
    expect(screen.queryByText(/1234567898765/i)).not.toBeInTheDocument;
  });

  it("should not show the modal when the 'show' attribute is false ", () => {
    render(<FormModal show={false} onClose={onCloseMock} />);

    expect(screen.queryByText(/Add new Card/i)).not.toBeInTheDocument;
    expect(screen.queryByText(/Edit Card/i)).not.toBeInTheDocument;
  });

  it("should render the modal on edit mode and with filled value", () => {
    render(
      <FormModal show={true} editingCard={mockedCard} onClose={onCloseMock} />
    );

    expect(screen.getByText(/Edit Card/i)).toBeInTheDocument;
    expect(screen.findByText(/Mocked Alias/i)).toBeInTheDocument;
    expect(screen.findByText(/Mocked Holder Name/i)).toBeInTheDocument;
    expect(screen.findByText(/1234567898765/i)).toBeInTheDocument;
  });

  it("should call onCloseMock when clicking the close button", () => {
    render(<FormModal show={true} onClose={onCloseMock} />);

    const cancelBtn = screen.getByRole("button", { name: "cancel" });
    fireEvent.click(cancelBtn);
    expect(onCloseMock).toBeCalled();
  });

  it("should show errors when trying to submit a empty form", () => {
    render(<FormModal show={true} onClose={onCloseMock} />);

    const addCardBtn = screen.getByRole("button", { name: "Add card" });
    fireEvent.click(addCardBtn);
    expect(screen.getByText(/Card alias is required!/i)).toBeInTheDocument();
    expect(screen.getByText(/Card holder is required!/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Insert a valid number between 14 and 16 digits!/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Insert a valid date!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Should have ate least 3 characters/i)
    ).toBeInTheDocument();
  });

  it("should save an edited version of the card", () => {
    render(
      <FormModal show={true} editingCard={mockedCard} onClose={onCloseMock} />
    );

    expect(screen.getByText(/Edit Card/i)).toBeInTheDocument;
    expect(screen.findByText(/Mocked Alias/i)).toBeInTheDocument;
    expect(screen.findByText(/Mocked Holder Name/i)).toBeInTheDocument;
    expect(screen.findByText(/1234567898765/i)).toBeInTheDocument;

    const cardholderInput = screen.getByRole("textbox", {
      name: "card-holder",
    });
    fireEvent.change(cardholderInput, {
      target: { value: "Testing editing holder name" },
    });

    // const editBtn = screen.getByRole("button", { name: "Edit" });
    // fireEvent.click(editBtn);

    const form = screen.getByRole("form", { hidden: true });
    fireEvent.submit(form);
    
    // console.log("form", form);

    console.log(
      "fake storage",
      window.localStorage.getItem("cards")
    );

    // screen.debug();
  });

  // it.only("should save the value of the a new cards on the local storage", async () => {
  //   render(<FormModal show={true} onClose={onCloseMock} />);

  //   const cardAliasInput = screen.getByRole("textbox", { name: "card-alias" });
  //   fireEvent.change(cardAliasInput, {
  //     target: { value: "some card alias for testing" },
  //   });

  //   const cardholderInput = screen.getByRole("textbox", {
  //     name: "card-holder",
  //   });
  //   fireEvent.change(cardholderInput, {
  //     target: { value: mockedCard.cardHolder },
  //   });

  //   const expirationDateInput = screen.getByRole("textbox", {
  //     name: "exp-date",
  //   });
  //   fireEvent.change(expirationDateInput, {
  //     target: { value: mockedCard.expDate },
  //   });

  //   const cvcInput = screen.getByRole("textbox", { name: "cvc" });
  //   fireEvent.change(cvcInput, { target: { value: mockedCard.cvc } });

  //   const cardNumberInput = screen.getByRole("textbox", {
  //     name: "card-number",
  //   });
  //   fireEvent.change(cardNumberInput, {
  //     target: { value: mockedCard.cardNumber },
  //   });

  //   // await waitFor(() => {
  //   //   expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  //   // });

  //   jest.advanceTimersByTime(1500);

  //   screen.debug();

  //   // const addCardBtn = screen.getByRole("button", { name: "Add card" });
  //   // fireEvent.click(addCardBtn);

  //   // await waitFor(() =>
  //   //   expect(
  //   //     screen.getByRole("button", { name: "Add card" })
  //   //   ).toBeInTheDocument()
  //   // );

  //   // screen.debug();

  //   // console.log(
  //   //   "fake storage",
  //   //   window.localStorage.getItem("cards")
  //   // );
  // });
});
