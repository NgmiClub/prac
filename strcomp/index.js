// index.js
// Compare two strings: length, loose equality, strict equality, localeCompare
(function () {
  const str1El = document.getElementById("str1");
  const str2El = document.getElementById("str2");
  const btnCompare = document.getElementById("btn-compare");
  const btnClear = document.getElementById("btn-clear");
  const warningEl = document.getElementById("warning");
  const resultsEl = document.getElementById("results");
  const outStr1 = document.getElementById("out-str1");
  const outStr2 = document.getElementById("out-str2");
  const outLength = document.getElementById("out-length");
  const outLoose = document.getElementById("out-loose");
  const outStrict = document.getElementById("out-strict");
  const outCase = document.getElementById("out-case");
  const outLocale = document.getElementById("out-locale");

  // Show/hide warning
  function showWarning(msg) {
    warningEl.textContent = msg;
    warningEl.style.display = "block";
    resultsEl.hidden = true;
  }

  function hideWarning() {
    warningEl.textContent = "";
    warningEl.style.display = "none";
  }

  function showResults() {
    resultsEl.hidden = false;
  }

  function normalizeInput(s) {
    if (s == null) return "";
    return s.trim();
  }

  function formatRawInput(s) {
    if (s === "") return '"" (empty)';
    if (s === " ") return '" " (space)';
    return `"${s}"`;
  }

  function compareStrings(s1, s2) {
    s1 = normalizeInput(s1);
    s2 = normalizeInput(s2);

    // Show raw inputs
    outStr1.textContent = formatRawInput(s1);
    outStr2.textContent = formatRawInput(s2);

    // Length comparison
    if (s1.length === s2.length) {
      outLength.textContent = `Both are equal length (${s1.length} characters).`;
    } else if (s1.length > s2.length) {
      outLength.textContent = `"${s1}" is longer than "${s2}" (${s1.length} vs ${s2.length}).`;
    } else {
      outLength.textContent = `"${s2}" is longer than "${s1}" (${s2.length} vs ${s1.length}).`;
    }

    // Loose equality (==)
    try {
      outLoose.textContent = String(s1 == s2);
    } catch (e) {
      outLoose.textContent = "Error evaluating ==.";
    }

    // Strict equality (===)
    try {
      outStrict.textContent = String(s1 === s2);
    } catch (e) {
      outStrict.textContent = "Error evaluating ===.";
    }

    // Case-insensitive equality
    try {
      const caseInsensitiveMatch = s1.toLowerCase() === s2.toLowerCase();
      if (caseInsensitiveMatch) {
        if (s1 !== s2) {
          outCase.textContent = `true (equal when case is ignored: "${s1.toLowerCase()}" === "${s2.toLowerCase()}")`;
        } else {
          outCase.textContent = `true (already identical)`;
        }
      } else {
        outCase.textContent = `false`;
      }
    } catch (e) {
      outCase.textContent = "Error evaluating case-insensitive comparison.";
    }

    // localeCompare
    try {
      const cmp = s1.localeCompare(s2);
      if (cmp === 0) {
        outLocale.textContent = `"${s1}" and "${s2}" are the same according to localeCompare (0).`;
      } else if (cmp < 0) {
        outLocale.textContent = `"${s1}" comes before "${s2}" alphabetically (localeCompare returned ${cmp}).`;
      } else {
        outLocale.textContent = `"${s1}" comes after "${s2}" alphabetically (localeCompare returned ${cmp}).`;
      }
    } catch (e) {
      outLocale.textContent = "Error evaluating localeCompare.";
    }

    showResults();
  }

  btnCompare.addEventListener("click", function () {
    hideWarning();
    const s1 = str1El.value;
    const s2 = str2El.value;

    if (!normalizeInput(s1) && !normalizeInput(s2)) {
      showWarning("Please enter at least one string to compare.");
      return;
    }

    compareStrings(s1, s2);
  });

  btnClear.addEventListener("click", function () {
    str1El.value = "";
    str2El.value = "";
    hideWarning();
    resultsEl.hidden = true;
  });

  // Enter key triggers compare
  [str1El, str2El].forEach(el =>
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter") btnCompare.click();
    })
  );

  console.log("String comparison script initialized");
})();
