import { render, screen } from "@testing-library/react";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("should render the component", () => {
    render(<Navbar />);

    expect(screen.getByText(/My Cards/i)).toBeInTheDocument;
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("alt", "logo");
  });
});
