document.addEventListener("DOMContentLoaded", () => {
const sizeInput = document.getElementById("sizeInput");
const setSizeBtn = document.getElementById("setSizeBtn");
const sizeMsg = document.getElementById("sizeMsg");
const addInput = document.getElementById("addInput");
const addBtn = document.getElementById("addBtn");
const addMsg = document.getElementById("addMsg");
const checkIndex = document.getElementById("checkIndex");
const checkBtn = document.getElementById("checkBtn");
const checkMsg = document.getElementById("checkMsg");
const removeIndex = document.getElementById("removeIndex");
const removeBtn = document.getElementById("removeBtn");
const removeMsg = document.getElementById("removeMsg");
const arrayDisplay = document.getElementById("arrayDisplay");
let arr = [];
let capacity = 0;
function renderArray() {
// show in single line
arrayDisplay.textContent = JSON.stringify(arr);
}
setSizeBtn.addEventListener("click", () => {
sizeMsg.classList.remove("error");
const n = parseInt(sizeInput.value, 10);
if (isNaN(n) || n <= 0) {
sizeMsg.textContent = "Please enter a valid positive size.";
sizeMsg.classList.add("error");
return;
}
capacity = n;
arr = [];
sizeMsg.textContent = `Array size set to ${capacity}.`;
renderArray();
});
addBtn.addEventListener("click", () => {
addMsg.classList.remove("error");
if (capacity === 0) {
addMsg.textContent = "Set the size first.";
addMsg.classList.add("error");
return;
}
if (arr.length >= capacity) {
addMsg.textContent = "Array overflow!";
addMsg.classList.add("error");
return;
}
const valRaw = addInput.value.trim();
if (valRaw === "") {
addMsg.textContent = "Enter a value.";
addMsg.classList.add("error");
return;
}
let val;
try {
val = JSON.parse(valRaw); // e.g. "[1,2]" becomes array
} catch {
val = valRaw;
}
arr.push(val);
addMsg.textContent = `Added element at index ${arr.length - 1}.`;
addInput.value = "";
renderArray();
});
checkBtn.addEventListener("click", () => {
checkMsg.classList.remove("error");
const idx = parseInt(checkIndex.value, 10);
if (isNaN(idx) || idx < 0 || idx >= arr.length) {
checkMsg.textContent = "Invalid index.";
checkMsg.classList.add("error");
return;
}
const element = arr[idx];
if (Array.isArray(element)) {
checkMsg.textContent = `Element at index ${idx} is an array.`;
} else {
checkMsg.textContent = `Element at index ${idx} is not an array.`;
}
});
removeBtn.addEventListener("click", () => {
removeMsg.classList.remove("error");
const idx = parseInt(removeIndex.value, 10);
if (isNaN(idx) || idx < 0 || idx >= arr.length) {
removeMsg.textContent = "Invalid index.";
removeMsg.classList.add("error");
return;
}
const removed = arr.splice(idx, 1);
removeMsg.textContent = `Removed element ${JSON.stringify(removed[0])} from index ${idx}.`;
renderArray();
});
renderArray();
});