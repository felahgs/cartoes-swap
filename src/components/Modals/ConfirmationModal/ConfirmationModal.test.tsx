import { fireEvent, render, screen } from "@testing-library/react";

import ConfirmationModal from "./ConfirmationModal";

describe("ConfirmationModal", () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  const ConfirmationModalRender = (
    <ConfirmationModal
      message={"Are you sure about this?"}
      show={true}
      onClose={onCloseMock}
      onConfirm={onConfirmMock}
    />
  );

  it("should render the component with the message", () => {
    render(ConfirmationModalRender);

    expect(screen.getByText(/Are you sure about this?/i)).toBeInTheDocument;
  });

  it("should not show the modal when the 'show' attribute is false ", () => {
    render(
      <ConfirmationModal
        message={"Are you sure about this?"}
        show={false}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );

    expect(screen.queryByText(/Are you sure about this?/i)).not
      .toBeInTheDocument;
  });

  it("should call onConfirmMock when clicking the confirm button", () => {
    render(ConfirmationModalRender);

    const confirmBtn = screen.getByRole("button", { name: "Yes, I'm sure" });
    fireEvent.click(confirmBtn);
    expect(onConfirmMock).toBeCalled();
  });

  it("should call onCloseMock when clicking the close button", () => {
    render(ConfirmationModalRender);

    const cancelBtn = screen.getByRole("button", { name: "No, cancel" });
    fireEvent.click(cancelBtn);
    expect(onCloseMock).toBeCalled();
  });
});
