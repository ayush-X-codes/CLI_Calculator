const { styleText } = require("node:util");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (input) => {
      resolve(input);
    });
  });
}

let history = [];

// History of calculation
function addCalculationToHistory(firstNumber, secondNumber, operation, result) {
  const calculationToAdd = `${firstNumber} ${operation} ${secondNumber} = ${result}`;
  history.push(calculationToAdd);
}

// this function sum two numbers
async function addition(firstNumber, secondNumber, callback) {
  const result = firstNumber + secondNumber;
  console.log(styleText("blue", `The result is: ${result}\r\n`));
  console.log(
    styleText(
      "white",
      "----------------------------------------------------------------\r\n",
    ),
  );
 
  exitCalculator(callback);
  addCalculationToHistory(firstNumber, secondNumber, "+", result);
}

// view or recall previous calculation
function viewCalculationHistory() {
  if (history.length === 0) {
    console.log("No calculation exits");
  } else {
    console.log(
    styleText(
      "gray",
      "=====================================History of calculations=====================================",
    ),
  )
    for (let i = 0; i < history.length; i++) {
      const calHistory = history[i];
      console.log(calHistory);
    }

    console.log("\n")
  }
}

// this function subtract two numbers
async function subtraction(firstNumber, secondNumber, callback) {
  const result = firstNumber - secondNumber;
  console.log(styleText("blue", `The result is: ${result}\r\n`));
  console.log(
    styleText(
      "white",
      "----------------------------------------------------------------\r\n",
    ),
  );
  addCalculationToHistory(firstNumber, secondNumber, "-", result);
  exitCalculator(callback);
}

// this function multiply two numbers
async function multiplication(firstNumber, secondNumber, callback) {
  const result = secondNumber * firstNumber;
  console.log(`The result is: ${result}\r\n`);
  console.log(
    styleText(
      "white",
      "----------------------------------------------------------------\r\n",
    ),
  );
  exitCalculator(callback);
  addCalculationToHistory(firstNumber, secondNumber, "*", result);
}

// this function divide two numbers
async function division(firstNumber, secondNumber, callback) {
  if (secondNumber === 0) {
    console.log("Cannot be divided by 0");
    console.log(
      styleText(
        "white",
        "----------------------------------------------------------------\r\n",
      ),
    );
    exitCalculator(callback);
    addCalculationToHistory(
      firstNumber,
      secondNumber,
      "/",
      "Cannot be divided by 0",
    );
  } else {
    const result = firstNumber / secondNumber;
    console.log(`The result is: ${result}\r\n`);
    console.log(
      styleText(
        "white",
        "----------------------------------------------------------------\r\n",
      ),
    );
    exitCalculator(callback);
    addCalculationToHistory(firstNumber, secondNumber, "/", result);
  }
}

// this function exit the user from calculator
async function exitCalculator(callback) {
  const exitChoice = await new Promise((resolve, reject) => {
    rl.question("Do you want to exit? (y/n): ", (answer) => {
      resolve(answer);
    });
  });

  console.log(
    styleText(
      "white",
      "----------------------------------------------------------------\r\n",
    ),
  );

  if (exitChoice.toLowerCase() === "y") {
     viewCalculationHistory();
    console.log("Exiting calculator...");
    rl.close();
  } else {
     viewCalculationHistory();
    callback();
  }
}

// this function start the calculator
async function main() {
  console.log(
    styleText(
      "red",
      "======================================CLI Calculator======================================",
    ),
  );

  //   this function take input from user for calculation
  async function promptUser() {
    console.log("Enter first number: ");
    const firstNumber = await getUserInput("");
    console.log("Enter second number: ");
    const secondNumber = await getUserInput("");

    console.log("Enter operation you want to do (+ - * /): ");
    const operation = await getUserInput("");

    const firstConvertToNumber = parseFloat(firstNumber);
    const secondConvertToNumber = parseFloat(secondNumber);

    if (
      typeof firstConvertToNumber === "number" &&
      !isNaN(firstConvertToNumber) &&
      typeof secondConvertToNumber === "number" &&
      !isNaN(secondConvertToNumber)
    ) {
      if (operation === "+") {
        addition(firstConvertToNumber, secondConvertToNumber, promptUser);
       
      } else if (operation === "-") {
        subtraction(firstConvertToNumber, secondConvertToNumber, promptUser);
       
      } else if (operation === "*") {
        multiplication(firstConvertToNumber, secondConvertToNumber, promptUser);
       
      } else if (operation === "/") {
        division(firstConvertToNumber, secondConvertToNumber, promptUser);
       
      } else {
        console.log(
          styleText(
            "yellow",
            "------------------------------Enter valid operation------------------------------\r\n",
          ),
        );
        promptUser();
      }
    } else {
      console.log(
        styleText(
          "yellow",
          "--------------------------------Enter valid number--------------------------------\r\n",
        ),
      );
      promptUser();
    }
  }

  promptUser();
}

main();
