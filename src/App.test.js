import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm";

test("renders App without crashing", () => {
  render(<App />);
});

test("user can fill out form and submit", async () => {
  render(<ContactForm />);

  // query VDOM for the input field
  const firstNameInput = screen.getByPlaceholderText(/first name/i);
  const lastNameInput = screen.getByPlaceholderText(/last name/i);
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  
  // fill out input
  fireEvent.change(firstNameInput, {target: {value: "Mychael"}});
  fireEvent.change(lastNameInput, {target: {value: "Menges"}});
  fireEvent.change(emailInput, {target: {value: "me@email.com"}});
  
  // assert that input contains expected value
  expect(firstNameInput).toHaveValue("Mychael")

  // const button = screen.getByRole("button", { name: /submit/i });
  // fireEvent.click(button);
  
  
  
  
  // const errorMessage = await screen.getByRole("p")
  // expect(errorMessage).not.toBeFalsy();
})
