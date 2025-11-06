// index_while.js
// Generates multiplication table using a while loop
(function () {
  const multiplicandEl = document.getElementById("multiplicand");
  const multiplierEl = document.getElementById("multiplier");
  const generateBtn = document.getElementById("generate");
  const clearBtn = document.getElementById("clear");
  const resultList = document.getElementById("result");
  const warning = document.getElementById("warning");

  function showWarning(msg) {
    warning.textContent = msg;
    warning.style.display = "block";
  }

  function hideWarning() {
    warning.textContent = "";
    warning.style.display = "none";
  }

  function clearResults() {
    resultList.innerHTML = "";
  }

  function generateTableWhile() {
    hideWarning();
    clearResults();

    const a = parseInt(multiplicandEl.value, 10);
    const n = parseInt(multiplierEl.value, 10);

    if (isNaN(a) || isNaN(n)) {
      showWarning("Please enter valid numbers.");
      return;
    }

    if (a === 0 || n === 0) {
      showWarning("Add positive value.");
      return;
    }

    if (n <= 0) {
      showWarning("Multiplier must be a positive number.");
      return;
    }

    let i = 1;
    while (i <= n) {
      const li = document.createElement("li");
      li.textContent = `${a} x ${i} = ${a * i}`;
      resultList.appendChild(li);
      i++;
    }
  }

  generateBtn.addEventListener("click", generateTableWhile);
  clearBtn.addEventListener("click", function () {
    multiplicandEl.value = "";
    multiplierEl.value = "";
    hideWarning();
    clearResults();
  });
})();



// // index_dowhile.js
// // Generates multiplication table using a do...while loop
// (function () {
// const multiplicandEl = document.getElementById("multiplicand");
// const multiplierEl = document.getElementById("multiplier");
// const generateBtn = document.getElementById("generate");
// const clearBtn = document.getElementById("clear");
// const resultList = document.getElementById("result");
// const warning = document.getElementById("warning");
// function showWarning(msg) {
// warning.textContent = msg;
// warning.style.display = "block";
// }
// function hideWarning() {
// warning.textContent = "";
// warning.style.display = "none";
// }
// function clearResults() {
// resultList.innerHTML = "";
// }
// function generateTableDoWhile() {
// hideWarning();
// clearResults();
// const a = parseInt(multiplicandEl.value, 10);
// const n = parseInt(multiplierEl.value, 10);
// if (isNaN(a) || isNaN(n)) {
// showWarning("Please enter valid numbers (non-zero positive integers).");
// return;
// }
// if (a <= 0 || n <= 0) {
// showWarning("Please enter non zero number (positive integers only).");
// return;
// }
// let i = 1;
// do {
// const li = document.createElement("li");
// li.textContent = `${a} x ${i} = ${a * i}`;
// resultList.appendChild(li);
// i++;
// } while (i <= n);
// }
// generateBtn.addEventListener("click", generateTableDoWhile);
// clearBtn.addEventListener("click", function () {
// multiplicandEl.value = "";
// multiplierEl.value = "";
// hideWarning();
// clearResults();
// });
// })();

