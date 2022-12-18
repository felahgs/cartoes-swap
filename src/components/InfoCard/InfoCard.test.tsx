import { fireEvent, render, screen } from "@testing-library/react";

import InfoCard from "./InfoCard";

describe("InfoCard", () => {
  const mockedCard = {
    id: "test-id",
    scheme: "mocked-scheme",
    cardAlias: "Card for testing",
    cardHolder: "Holder Name",
    cardNumber: "12345678987654",
    expDate: "12/2020",
    cvc: "583",
  };
  const onDeleteMock = jest.fn();
  const onEditMock = jest.fn();

  it("should render the component", () => {
    render(
      <InfoCard
        {...mockedCard}
        scheme="none"
        onDelete={onDeleteMock}
        onEdit={onEditMock}
      />
    );

    expect(screen.getByText(/Card for testing/i)).toBeInTheDocument;
    expect(screen.getByText(/Holder Name/i)).toBeInTheDocument;
    expect(screen.getByText(/12\/2020/i)).toBeInTheDocument;
    expect(screen.getByText(/583/i)).toBeInTheDocument;
  });

  it("should render the card replacing every digit but the last 4", () => {
    render(
      <InfoCard
        {...mockedCard}
        scheme="none"
        onDelete={onDeleteMock}
        onEdit={onEditMock}
      />
    );

    expect(screen.queryByText("12345678987654")).not.toBeInTheDocument;
    expect(screen.getByText("**********7654")).toBeInTheDocument;
  });

  it("should call onDelete when clicking the edit button", () => {
    render(
      <InfoCard
        {...mockedCard}
        scheme="none"
        onDelete={onDeleteMock}
        onEdit={onEditMock}
      />
    );
    const editBtn = screen.getByRole("button", { name: "edit" });
    fireEvent.click(editBtn);
    expect(onEditMock).toBeCalled();
  });

  it("should call onDelete when clicking the delete button", () => {
    render(
      <InfoCard
        {...mockedCard}
        scheme="none"
        onDelete={onDeleteMock}
        onEdit={onEditMock}
      />
    );
    const deleteBtn = screen.getByRole("button", { name: "delete" });
    fireEvent.click(deleteBtn);
    expect(onDeleteMock).toBeCalled();
  });
});
