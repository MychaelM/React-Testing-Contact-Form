import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm";

test("renders App without crashing", () => {
  render(<App />);
});

test("user can fill out form and submit", () => {
  render(<ContactForm />);

  // query VDOM for the input field
  const firstNameInput = screen.getByPlaceholderText(/firstName/i);
  
  // fill out input
  fireEvent.change(firstNameInput, {target: {value: "Mychael"}});

  // assert that input contains expected value
  expect(firstNameInput).toHaveValue("Mychael")
})
