const arg = process.argv.slice(2);
const num = Number(arg[0]);

if (!num || num === 0) {
  console.log("⚠️ Please enter a valid number greater than 0");
  process.exit(); // stops further execution
}

console.log("Using For loop");
for (let i = 0; i <= 10; i++) {
  console.log(`${num} X ${i} = ${num * i}`);
}

console.log("\n");

console.log("Using While loop");
let i = 0;
while (i <= 10) {
  console.log(`${num} X ${i} = ${num * i}`);
  i++;
}

console.log("\n");

console.log("Using Do While loop");
i = 0;
do {
  console.log(`${num} X ${i} = ${num * i}`);
  i++;
} while (i <= 10);
