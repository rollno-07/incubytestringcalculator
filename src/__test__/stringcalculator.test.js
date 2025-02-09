import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "../components/StringCalculator";
import "@testing-library/jest-dom";

describe("String Calculator", () => {
  test("displays error for invalid input containing alphabets", () => {
    render(<StringCalculator />);
    const textarea = screen.getByPlaceholderText(
      "Enter numbers"
    );
    fireEvent.change(textarea, { target: { value: "fgh,6,bh,-1,bhvd" } });
    fireEvent.click(screen.getByText("Calculate Sum"));
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument();
  });
  test("displays error for input containing only alphabets", () => {
    render(<StringCalculator />);
    const textarea = screen.getByPlaceholderText(
      "Enter numbers"
    );
    fireEvent.change(textarea, { target: { value: "bhbadc" } });
    fireEvent.click(screen.getByText("Calculate Sum"));
    expect(screen.getByText(/Only numbers are allowed/i)).toBeInTheDocument();
  });

  test("calculates sum when numbers are given across multiple lines", () => {
    render(<StringCalculator />);
    const textarea = screen.getByPlaceholderText(
      "Enter numbers"
    );
    fireEvent.change(textarea, { target: { value: "2\n3\n4" } });
    fireEvent.click(screen.getByText("Calculate Sum"));
    expect(screen.getByText(/Result: 9/i)).toBeInTheDocument();
  });

  test("ignores blank lines but sums valid numbers", () => {
    render(<StringCalculator />);
    const textarea = screen.getByPlaceholderText(
      "Enter numbers"
    );
    fireEvent.change(textarea, { target: { value: "2\n\n5\n" } });
    fireEvent.click(screen.getByText("Calculate Sum"));
    expect(screen.getByText(/Result: 7/i)).toBeInTheDocument();
  });

  test("displays error for negative numbers", () => {
    render(<StringCalculator />);
    const textarea = screen.getByPlaceholderText("Enter numbers");
    fireEvent.change(textarea, { target: { value: "-5,3,-2" } });
    fireEvent.click(screen.getByText("Calculate Sum"));
    expect(
      screen.getByText(/Negative numbers not allowed: -5, -2/i)
    ).toBeInTheDocument();
  });
  test("should display error for an empty input", () => {
    render(<StringCalculator />);
    const button = screen.getByText("Calculate Sum");

    fireEvent.click(button);

    expect(screen.getByText("Enter a valid number.")).toBeInTheDocument();
  });
  test("should return sum for valid comma-separated numbers", () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers"
    );
    const button = screen.getByText("Calculate Sum");

    fireEvent.change(input, { target: { value: "1,2,3" } });
    fireEvent.click(button);

    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });
  test("should support custom delimiters", () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers"
    );
    const button = screen.getByText("Calculate Sum");

    fireEvent.change(input, { target: { value: "//;\n1;2;3" } });
    fireEvent.click(button);

    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });
});
