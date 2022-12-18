import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import server from "mocks/server";
import { rest } from "msw";

import { formatCardNumber } from "utils/strings";

import FormModal from "./FormModal";

describe("FormModal", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const setLocalStorage = (id: string, data: { [value: string]: string }[]) => {
    localStorage.setItem(id, JSON.stringify(data));
  };

  const onCloseMock = jest.fn();
  const mockedCard = {
    id: "0",
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

  it("should have the form invalid when not filling the fields", () => {
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

    const form = screen.getByRole("form", { hidden: true }) as HTMLFormElement;
    expect(form.checkValidity()).toBeFalsy();
  });

  it("shouldn't be possible to enter letters on number only inputs", () => {
    render(<FormModal show={true} onClose={onCloseMock} />);

    const cardNumberInput = screen.getByRole("textbox", {
      name: "card-number",
    });
    const expirationDateInput = screen.getByRole("textbox", {
      name: "exp-date",
    });
    const cvcInput = screen.getByRole("textbox", { name: "cvc" });

    fireEvent.change(cardNumberInput, {
      target: { value: "invalid value 23" },
    });
    fireEvent.change(expirationDateInput, {
      target: { value: "invalid value 122020" },
    });
    fireEvent.change(cvcInput, { target: "invalid value" });

    expect(cardNumberInput).toHaveDisplayValue(formatCardNumber("23"));
    expect(expirationDateInput).toHaveDisplayValue("12/2020");
    expect(cvcInput).toHaveDisplayValue("");
  });

  it("should be able to fill all the fields and save a new card on the localstorage", async () => {
    render(<FormModal show={true} onClose={onCloseMock} />);

    server.use(
      rest.get("https://lookup.binlist.net/5555555555555555", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            number: {},
            scheme: "mastercard",
          })
        );
      })
    );

    // get the reference for all the input fields
    const cardAliasInput = screen.getByRole("textbox", { name: "card-alias" });
    const cardholderInput = screen.getByRole("textbox", {
      name: "card-holder",
    });
    const cardNumberInput = screen.getByRole("textbox", {
      name: "card-number",
    });
    const expirationDateInput = screen.getByRole("textbox", {
      name: "exp-date",
    });
    const cvcInput = screen.getByRole("textbox", { name: "cvc" });

    // fill every input field with a value
    fireEvent.change(cardAliasInput, {
      target: { value: mockedCard.cardAlias },
    });
    fireEvent.change(cardholderInput, {
      target: { value: mockedCard.cardHolder },
    });
    fireEvent.change(cardNumberInput, {
      target: { value: mockedCard.cardNumber },
    });
    fireEvent.change(expirationDateInput, {
      target: { value: mockedCard.expDate },
    });
    fireEvent.change(cvcInput, { target: { value: mockedCard.cvc } });

    // assert all the filled inputs
    expect(cardAliasInput).toHaveDisplayValue(mockedCard.cardAlias);
    expect(cardholderInput).toHaveDisplayValue(mockedCard.cardHolder);
    expect(cardNumberInput).toHaveDisplayValue(
      formatCardNumber(mockedCard.cardNumber)
    );
    expect(expirationDateInput).toHaveDisplayValue(mockedCard.expDate);
    expect(cvcInput).toHaveDisplayValue(mockedCard.cvc);

    // submit form
    const form = screen.getByRole("form", { hidden: true });
    fireEvent.submit(form);

    const addedCard = JSON.parse(localStorage.getItem("cards") as string)[0];

    expect(addedCard.cardAlias).toBe(mockedCard.cardAlias);
    expect(addedCard.cardHolder).toBe(mockedCard.cardHolder);
    expect(addedCard.expDate).toBe(mockedCard.expDate);
    expect(addedCard.cvc).toBe(mockedCard.cvc);
  });

  it("should call localstorage when saving an edit", () => {
    render(
      <FormModal show={true} editingCard={mockedCard} onClose={onCloseMock} />
    );

    setLocalStorage("cards", [ mockedCard ]);
    // localStorage.setItem("cards", JSON.stringify([ mockedCard ]));

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

    const form = screen.getByRole("form", { hidden: true }) as HTMLFormElement;
    fireEvent.submit(form);
    expect(form.checkValidity()).toBeTruthy();

    const editedCard = JSON.parse(localStorage.getItem("cards") as string)[0];

    expect(editedCard.cardAlias).toBe(mockedCard.cardAlias);
  });

  it("should change the stat of the button to loading while confirming the card scheme", async () => {
    jest.useFakeTimers();

    server.use(
      rest.get("https://lookup.binlist.net/37443920915208", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            number: {},
            scheme: "mastercard",
          })
        );
      })
    );

    render(<FormModal show={true} onClose={onCloseMock} />);
    // get the reference for all the input fields
    const cardNumberInput = screen.getByRole("textbox", {
      name: "card-number",
    });

    fireEvent.change(cardNumberInput, {
      target: { value: "37443920915208" },
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(cardNumberInput).toHaveDisplayValue(
      formatCardNumber("37443920915208")
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    jest.useRealTimers();

    await waitFor(() =>
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    );
  });
});
