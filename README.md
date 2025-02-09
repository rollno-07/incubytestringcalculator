# String Calculator (TDD Approach)

## Overview
This project implements a **String Calculator** using the **Test-Driven Development (TDD)** approach. The calculator accepts numbers in a comma-separated format and supports custom delimiters. It also validates inputs, handles errors, and prevents negative numbers.

## Features
- Accepts comma and newline-separated numbers.
- Supports custom delimiters.
- Displays errors for invalid inputs (alphabets, special characters, etc.).
- Restricts negative numbers.
- UI built with **Next.js** and **Tailwind CSS**.
- Fully tested with **Jest** and **React Testing Library**.

---

## Installation & Setup

### Prerequisites
Ensure you have **Node.js** and **npm** installed.

### Clone the repository:
```sh
git clone <repository-url>
cd string-calculator-tdd
```

### Install dependencies:
```sh
npm install
```

---

## Available Scripts

### Run the development server
```sh
npm run dev
```
- Runs the Next.js app on **localhost:3000**.

### Build for production
```sh
npm run build
```
- Compiles the application for production.

### Start the production server
```sh
npm run start
```
- Starts the compiled app.

### Lint the code
```sh
npm run lint
```
- Runs ESLint to check for code style issues.

### Run test cases
```sh
npm run test
```
- Runs Jest tests to validate functionality.

---

## Test Cases (Jest & React Testing Library)



#### ✅ Valid Cases:
- **Sum of comma-separated numbers**  
  Input: `1,2,3` → Output: `6`
- **Sum of newline-separated numbers**  
  Input: `1\n2\n3` → Output: `6`
- **Supports custom delimiters**  
  Input: `//;\n1;2;3` → Output: `6`
- **Handles multiple lines with gaps**  
  Input: `1\n\n2\n\n3` → Output: `6`
- **Ignores numbers greater than 1000**  
  Input: `2,1001,3` → Output: `5`
- **Supports delimiters of any length**  
  Input: `//[***]\n1***2***3` → Output: `6`
- **Supports multiple delimiters**  
  Input: `//[*][%]\n1*2%3` → Output: `6`
- **Supports multiple delimiters with length longer than one character**  
  Input: `//[**][%%]\n1**2%%3` → Output: `6`

#### ❌ Invalid Cases:
- **Empty input**  
  Input: `""` → Output: `"Enter a valid number."`
- **Alphabets in input**  
  Input: `"abc,5,def"` → Output: `"Invalid input: abc, def. Only numbers are allowed."`
- **Only alphabets provided**  
  Input: `"xyz"` → Output: `"Alphabets are not allowed."`
- **Negative numbers**  
  Input: `"1,-2,3,-4"` → Output: `"Negative numbers not allowed: -2, -4"`

---

## UI Mechanism

### Input Box
- Users enter numbers separated by **commas or new lines**.
- Custom delimiters can be defined using `//[delimiter]\n[numbers]` format.
- Error messages appear for invalid inputs.

### Calculate Button
- Click triggers the sum calculation.
- The result is displayed dynamically.

### Result Display
- Shows the calculated sum or error message.
- Updates reactively based on input.

---

## Deployment
The project can be deployed to **Vercel**, **Netlify**, or any **Node.js hosting** service.

To deploy with Vercel:
```sh
npm install -g vercel
vercel
```

---
## Live
https://incubytestringcalculator.vercel.app/

## Author
**Vivek Kumar Rawat**

---

## License
This project is open-source and available under the **MIT License**.

