/**
 * Multiplication Table Generator
 * Name: Raj Pravin Pawar
 * Roll No: 42152
 */

const args = process.argv;

if (args.length < 3) {
  console.log("Please provide a number as a command-line argument.");
  process.exit(1);
}

const number = parseInt(args[2]);

if (isNaN(number)) {
  console.log("Invalid input. Please provide a valid number.");
  process.exit(1);
}

if (number === 0) {
  console.log("Please enter a non-zero number.");
  process.exit(1);
}

function printMultiplicationTable(num) {
  console.log("Name: Raj Pravin Pawar");
  console.log("Roll No: 42152");
  console.log(`Multiplication Table for ${num}:`);
  console.log("----------------------------");
  
  console.log("For Loop");
  for (let i = 1; i <= 10; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
  }
  
  console.log("\nWhile Loop");
  let k = 1;
  while (k <= 10) {
    console.log(`${num} x ${k} = ${num * k}`);
    k++;
  }
  
  console.log("\nDo While Loop");
  k = 1;
  do {
    console.log(`${num} x ${k} = ${num * k}`);
    k++;
  } while (k <= 10);
}

printMultiplicationTable(number);
