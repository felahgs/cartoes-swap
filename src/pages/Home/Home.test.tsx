import { render, screen } from "@testing-library/react";

import Home from "./Home";

test("renders Hello world", () => {
  render(<Home />);
  const text = screen.getAllByText(/My Cards/i);
  expect(text[0]).toBeInTheDocument();
});
