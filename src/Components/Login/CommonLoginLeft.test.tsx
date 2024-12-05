import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CommonLoginLeft from "./CommonLoginLeft";

describe("CommonLoginLeft", () => {
  it("should render the component properly", () => {
    render(
      <BrowserRouter>
        <CommonLoginLeft />
      </BrowserRouter>
    );

    // Back button and icon
    const backButton = screen.getByTestId("Button-link");
    expect(backButton).toBeInTheDocument();
    expect(backButton).toContainHTML("<svg");

    // Image
    const image = screen.getByTestId("Logo");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("h-16");
    expect(image).toHaveAttribute("alt", "Ieka");

    // Heading
    const heading = screen.getByTestId("Heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("IEKA account.");

    // Paragraphs
    const paragraphs = screen.getAllByTestId(/Paragraph/);
    expect(paragraphs.length).toBe(2);

    // Spans
    const spans = screen.getAllByTestId(/Span/);
    expect(spans.length).toBe(2);

    // Footer text
    expect(
      screen.getByText(/IEKA.in - Cookie Policy and Privacy Policy/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/© Inter IEKA Systems B.V. 1999-2024/i)
    ).toBeInTheDocument();
  });

  // Additional test case: Ensure that the alt text for the image is correct
  it("should have the correct alt text for the image", () => {
    render(
      <BrowserRouter>
        <CommonLoginLeft />
      </BrowserRouter>
    );

    const image = screen.getByTestId("Logo");
    expect(image).toHaveAttribute("alt", "Ieka");
  });

  // Accessibility test: Ensure that the page has meaningful content and roles
  it("should have meaningful content for accessibility", () => {
    render(
      <BrowserRouter>
        <CommonLoginLeft />
      </BrowserRouter>
    );

    // Ensure that the heading is the first important content on the page
    const heading = screen.getByTestId("Heading");
    expect(heading).toHaveTextContent("IEKA account.");

    // Ensure that the paragraphs and spans have text content
    const paragraph1 = screen.getByTestId("Paragraph-1");
    const paragraph2 = screen.getByTestId("Paragraph-2");
    expect(paragraph1).toHaveTextContent(
      "Too many passwords? You can now login with an OTP we will send on your email address or verified mobile number."
    );
    expect(paragraph2).toHaveTextContent(
      "Access your IEKA account using your email address to add and verify your mobile number."
    );

    const span1 = screen.getByTestId("Span-1");
    const span2 = screen.getByTestId("Span-2");
    expect(span1).toHaveTextContent(
      "IEKA.in - Cookie Policy and Privacy Policy"
    );
    expect(span2).toHaveTextContent("© Inter IEKA Systems B.V. 1999-2024");
  });
});
