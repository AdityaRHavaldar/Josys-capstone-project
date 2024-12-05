import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AdminLogin from "./AdminLogin";

const queryClient = new QueryClient();

describe("AdminLogin", () => {
  it("should render the component properly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AdminLogin />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("email-label")).toBeInTheDocument();
    expect(await screen.findByTestId("password-label")).toBeInTheDocument();
  });

  it("should display the correct labels and inputs", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AdminLogin />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("email-label")).toBeInTheDocument();
    expect(await screen.findByTestId("password-label")).toBeInTheDocument();

    expect(await screen.findByTestId("email-input")).toBeInTheDocument();
    expect(await screen.findByTestId("password-input")).toBeInTheDocument();
  });
});
