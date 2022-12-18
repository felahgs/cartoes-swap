import { render, screen } from "@testing-library/react";

import Home from "./Home";

test("renders Hello world", () => {
  render(<Home />);
  const linkElement = screen.getByText(/My Cards/i);
  expect(linkElement).toBeInTheDocument();
});
