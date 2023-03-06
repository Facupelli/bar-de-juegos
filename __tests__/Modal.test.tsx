import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../src/components/Modal/Modal";

describe("Modal Component Test", () => {
  const onClick = jest.fn();
  beforeEach(() => {
    render(
      <Modal isOpen={true} handleCloseModal={onClick}>
        <div>Children</div>
      </Modal>
    );
  });

  test("render the close button", async () => {
    const button = await screen.findByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("render backdrop", async () => {
    const backdrop = await screen.findByRole("backdrop");
    expect(backdrop).toBeInTheDocument();
  });

  test("close button handles onClik", async () => {
    const button = await screen.findByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("renders its children", () => {
    const children = screen.getByText("Children");
    expect(children).toBeDefined();
  });
});
