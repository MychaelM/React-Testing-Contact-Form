import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm";
import { act } from "react-dom/test-utils";

test("renders App without crashing", () => {
  render(<App />);
});

test("user can fill out form and submit", async () => {
  render(<ContactForm />);

  // query VDOM for the input field
  const firstNameInput = screen.getByPlaceholderText(/first name/i);
  const lastNameInput = screen.getByPlaceholderText(/last name/i);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const messageInput = screen.getByRole("textbox");
  
  // fill out input
  fireEvent.change(firstNameInput, {target: {value: "Mychael"}});
  fireEvent.change(lastNameInput, {target: {value: "Menges"}});
  fireEvent.change(emailInput, {target: {value: "me@email.com"}});
  fireEvent.change(messageInput, {target: {value: "Hello"}});
  
  // assert that input contains expected value
  expect(firstNameInput).toHaveValue("Mychael")
  expect(lastNameInput).toHaveValue("Menges")
  expect(emailInput).toHaveValue("me@email.com")
  expect(messageInput).toHaveValue("Hello")

  await act(async () => {
  const button = screen.getByRole("button");
    fireEvent.click(button);
      const formData = await screen.findByTestId(/submitteddata/i);
      expect(formData).toBeTruthy();
    })
    // const error = await screen.findByTestId(/errorData/i);
    // expect(error).not.toBeInTheDocument();
  })

test("user can't submit form when form is not filled out", async () => {
  render(<ContactForm/>)
   await act(async () => {
     const button = screen.getByRole("button");
     fireEvent.click(button);
   });
        const error = screen.findByTestId(/errorData/i);
        expect(error).toBeTruthy();
})

test("user can't input invalid email", () => {
  render(<ContactForm/>);
  const emailInput = screen.getByPlaceholderText(/email/i);
  fireEvent.change(emailInput, { target: { value: "me@email.com" } });
  fireEvent.focusOut(emailInput);
    
  const error = screen.findByTestId(/errorData/i);
  expect(error).not.toBeInTheDocument();

})
