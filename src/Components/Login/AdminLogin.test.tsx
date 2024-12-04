import React from "react";
import { render, screen } from "@testing-library/react";
import AdminLogin from "./AdminLogin";

jest.mock("axios");

describe("AdminLogin Component", () => {
  test("renders Admin Login form", () => {
    render(<AdminLogin />);

    // Ensure the form fields are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
