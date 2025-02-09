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

### ✅ Valid Cases:
1. **Sum of comma-separated numbers** → `1,2,3` → **Output: 6**
2. **Sum of newline-separated numbers** → `1\n2\n3` → **Output: 6**
3. **Supports custom delimiters** → `//;\n1;2;3` → **Output: 6**
4. **Handles multiple lines with gaps** → `1\n\n2\n\n3` → **Output: 6**

### ❌ Invalid Cases:
1. **Empty input** → `""` → **Output: "Enter a valid number."**
2. **Alphabets in input** → `"abc,5,def"` → **Output: "Invalid input: abc, def. Only numbers are allowed."**
3. **Only alphabets provided** → `"xyz"` → **Output: "Alphabets are not allowed."**
4. **Negative numbers** → `"1,-2,3,-4"` → **Output: "Negative numbers not allowed: -2, -4"**

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

