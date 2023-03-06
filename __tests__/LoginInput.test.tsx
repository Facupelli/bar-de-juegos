import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginInput from "../src/components/LoginInpunt/LoginInput";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("LoginInput Component Test", () => {
  const onClick = jest.fn();
  beforeEach(() => {
    useRouter.mockReturnValue({ query: {} });
    render(<LoginInput />);
  });

  test("render input", async () => {
    const input = await screen.findByRole("id-input");
    expect(input).toBeInTheDocument();
  });
});
