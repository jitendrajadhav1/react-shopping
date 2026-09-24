import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { renderWithStore } from "./test-utils";

// Mock firebase so tests don't need real credentials
jest.mock("./lib/firebase", () => ({ db: {} }));

describe("App", () => {
  it("renders the heading", () => {
    renderWithStore(<App />);
    expect(screen.getByText(/React Assingment/i)).toBeInTheDocument();
  });

  it("shows all 5 products", () => {
    renderWithStore(<App />);
    expect(screen.getByText("Bread")).toBeInTheDocument();
    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Soup")).toBeInTheDocument();
    expect(screen.getByText("Butter")).toBeInTheDocument();
  });

  it("adds a product to the basket on click", async () => {
    renderWithStore(<App />);
    const addBreadBtn = screen.getByRole("button", { name: /add bread/i });

    await userEvent.click(addBreadBtn);

    // Button should now say "Added" and be disabled
    expect(addBreadBtn).toBeDisabled();
    expect(addBreadBtn).toHaveTextContent("Added");

    // Basket should show bread quantity
    expect(screen.getByTestId("qty-bread")).toHaveTextContent("1");
  });

  // increment and decrement buttons

  it("increments quantity with the + button", async () => {
    renderWithStore(<App />);

    await userEvent.click(screen.getByRole("button", { name: /add bread/i }));

    await userEvent.click(
      screen.getByRole("button", { name: /add one more bread/i }),
    );

    expect(screen.getByTestId("qty-bread")).toHaveTextContent("2");
  });

  it("removes a product from basket with − button", async () => {
    renderWithStore(<App />);

    await userEvent.click(screen.getByRole("button", { name: /add bread/i }));

    await userEvent.click(
      screen.getByRole("button", { name: /remove one bread/i }),
    );

    // Basket should be empty again
    expect(screen.getByText(/basket is empty/i)).toBeInTheDocument();
  });

  it("shows correct totals for the sample basket", () => {
    renderWithStore(<App />, {
      preloadedState: {
        basket: {
          items: { bread: 1, milk: 1, cheese: 1, soup: 2, butter: 1 },
        },
      },
    });

    // bread=110 + milk=50 + cheese=90 + soup*2=120 + butter=120 = 490
    expect(screen.getByTestId("subtotal")).toHaveTextContent("£4.90");
    // soup-half-bread=55 + butter-third-off=40 = 95
    expect(screen.getByTestId("savings")).toHaveTextContent("£0.95");
    // 490 - 95 = 395
    expect(screen.getByTestId("total")).toHaveTextContent("£3.95");
  });

  it("shows offer descriptions in the basket", () => {
    renderWithStore(<App />, {
      preloadedState: {
        basket: {
          items: { cheese: 2 },
        },
      },
    });

    expect(
      screen.getByText(/Buy one Cheese, get one free/i),
    ).toBeInTheDocument();
  });

  it("disables Save button when basket is empty", () => {
    renderWithStore(<App />);
    const saveBtn = screen.getByRole("button", { name: /save order/i });
    expect(saveBtn).toBeDisabled();
  });
});
