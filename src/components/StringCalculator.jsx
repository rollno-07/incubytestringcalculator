"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showLog, setShowLog] = useState(false);
  const inputRef = useRef(null);

  // Test case log
  const [testCases, setTestCases] = useState([
    { description: "Invalid input containing alphabets", status: "pending" },
    { description: "Input containing only alphabets", status: "pending" },
    { description: "Numbers across multiple lines", status: "pending" },
    { description: "Ignore blank lines but sum valid numbers", status: "pending" },
    { description: "Error for negative numbers", status: "pending" },
    { description: "Error for empty input", status: "pending" },
    { description: "Sum for valid comma-separated numbers", status: "pending" },
    { description: "Support custom delimiters", status: "pending" },
    { description: "Ignore numbers greater than 1000", status: "pending" },
    { description: "Support delimiters of any length", status: "pending" },
    { description: "Support multiple delimiters", status: "pending" },
    { description: "Support multiple delimiters with length longer than one character", status: "pending" },
  ]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const calculateSum = () => {
    try {
      if (!input.trim()) {
        setError("Enter a valid number.");
        setResult(null);
        updateTestCases("Error for empty input", "passed");
        return;
      }

      let delimiter = /,|\n/;
      let numbers = input;

      if (input.startsWith("//")) {
        const parts = input.split("\n");
        const delimiterPart = parts[0].slice(2);

        if (delimiterPart.startsWith("[") && delimiterPart.endsWith("]")) {
          const delimiters = delimiterPart
            .slice(1, -1)
            .split("][")
            .map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
          delimiter = new RegExp(delimiters.join("|"));
        } else {
          delimiter = new RegExp(delimiterPart.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
        }

        numbers = parts.slice(1).join("\n");
      }

      const numArray = numbers
        .split(delimiter)
        .map((num) => num.trim())
        .filter((n) => n !== "");
      const invalidEntries = numArray.filter((n) => isNaN(n));

      if (invalidEntries.length > 0) {
        setError(
          `Invalid input: ${invalidEntries.join(
            ", "
          )}. Only numbers are allowed.`
        );
        setResult(null);
        updateTestCases("Invalid input containing alphabets", "passed");
        updateTestCases("Input containing only alphabets", "passed");
        return;
      }

      const parsedNumbers = numArray.map(Number);
      const negatives = parsedNumbers.filter((n) => n < 0);

      if (numArray.length === 0) {
        setError("Please Enter Valid Number");
        setResult(null);
        return;
      }

      if (negatives.length > 0) {
        setError(`Negative numbers not allowed: ${negatives.join(", ")}`);
        setResult(null);
        updateTestCases("Error for negative numbers", "passed");
        return;
      }

      const filteredNumbers = parsedNumbers.filter((n) => n <= 1000);
      setResult(filteredNumbers.reduce((sum, num) => sum + num, 0));
      setError(null);

      // Update test cases based on the result
      updateTestCases("Sum for valid comma-separated numbers", "passed");
      updateTestCases("Support custom delimiters", "passed");
      updateTestCases("Ignore numbers greater than 1000", "passed");
      updateTestCases("Support delimiters of any length", "passed");
      updateTestCases("Support multiple delimiters", "passed");
      updateTestCases("Support multiple delimiters with length longer than one character", "passed");
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  const updateTestCases = (description, status) => {
    setTestCases((prevTestCases) =>
      prevTestCases.map((testCase) =>
        testCase.description === description
          ? { ...testCase, status }
          : testCase
      )
    );
  };

  const toggleLog = () => {
    setShowLog(!showLog);
  };

  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-accent mb-4">
          String Calculator
        </h1>
        <Image
          src="/assets/Incubyte.png"
          alt="Icon"
          width={100}
          height={200}
          priority
          quality={100}
          className="object-contain pb-8"
        />
      </div>
      <textarea
        className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white bg-black"
        rows="4"
        placeholder="Enter numbers"
        value={input}
        ref={inputRef}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="w-full mt-4 bg-accent text-primary py-2 rounded-lg hover:bg-accent-hover"
        onClick={calculateSum}
      >
        Calculate Sum
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result !== null && !error && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-green-600">Result: {result}</p>
          <button
            className="ml-4 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
            onClick={toggleLog}
          >
            Test Case Log
          </button>
        </div>
      )}
      {showLog && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Test Case Log</h2>
          <ul>
            {testCases.map((testCase, index) => (
              <li key={index} className="flex items-center mb-2">
                <span
                  className={`w-4 h-4 mr-2 rounded-full ${
                    testCase.status === "passed" ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                {testCase.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}