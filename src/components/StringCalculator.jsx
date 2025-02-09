"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const calculateSum = () => {
    try {
      if (!input.trim()) {
        setError("Enter a valid number.");
        setResult(null);
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
          delimiter = new RegExp(
            delimiterPart.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          );
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
        return;
      }

      const filteredNumbers = parsedNumbers.filter((n) => n <= 1000);
      setResult(filteredNumbers.reduce((sum, num) => sum + num, 0));
      setError(null);
    } catch (err) {
      setError("Something went wrong.");
    }
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
        <p className="text-accent mt-2">Result: {result}</p>
      )}
    </div>
  );
}
