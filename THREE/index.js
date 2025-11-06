(function () {
// ---------- reverse ----------
const reverseInput = document.getElementById("reverse-input");
const btnReverse = document.getElementById("btn-reverse");
const reverseOutput = document.getElementById("reverse-output");
const clearReverse = document.getElementById("clear-reverse");
// ---------- palindrome ----------
const palindromeInput = document.getElementById("palindrome-input");
const btnPalindrome = document.getElementById("btn-palindrome");
const palindromeOutput = document.getElementById("palindrome-output");
const clearPalindrome = document.getElementById("clear-palindrome");
// ---------- replace first ----------
const replaceFirstString = document.getElementById("replace-first-string");
const replaceFirstOld = document.getElementById("replace-first-old");
const replaceFirstNew = document.getElementById("replace-first-new");
const btnReplaceFirst = document.getElementById("btn-replace-first");
const replaceFirstOutput = document.getElementById("replace-first-output");
const clearReplaceFirst = document.getElementById("clear-replace-first");
// ---------- replace all ----------
const replaceAllString = document.getElementById("replace-all-string");
const replaceAllOld = document.getElementById("replace-all-old");
const replaceAllNew = document.getElementById("replace-all-new");
const btnReplaceAll = document.getElementById("btn-replace-all");
const replaceAllOutput = document.getElementById("replace-all-output");
const clearReplaceAll = document.getElementById("clear-replace-all");
// Helper: show message in an output element (with simple styling)
function showOutput(el, msg, isError) {
// prefer CSS variable, fallback if not available
if (isError) {
el.style.color = getComputedStyle(document.documentElement).getPropertyValue("--danger") || "#b83232";
} else {
el.style.color = "#111";
}
el.textContent = msg;
}
// Helper: reverse string without using built-in reverse
function reverseString(str) {
let out = "";
for (let i = str.length - 1; i >= 0; i--) {
out += str[i];
}
return out;
}
// ---------- Reverse button ----------
btnReverse.addEventListener("click", function () {
const s = reverseInput.value;
if (s === "") {
showOutput(reverseOutput, "Please enter a string to reverse.", true);
return;
}
const rev = reverseString(s);
showOutput(reverseOutput, rev, false);
});
clearReverse.addEventListener("click", function () {
reverseInput.value = "";
showOutput(reverseOutput, "");
});
// ---------- Palindrome ----------
// Normalize: remove spaces and lowercase
function normalizeForPalindrome(s) {
let out = "";
for (let i = 0; i < s.length; i++) {
const ch = s[i];
if (ch !== " ") {
out += ch.toLowerCase();
}
}
return out;
}
btnPalindrome.addEventListener("click", function () {
const s = palindromeInput.value;
if (s === "") {
showOutput(palindromeOutput, "Please enter a string to check.", true);
return;
}
const norm = normalizeForPalindrome(s);
const rev = reverseString(norm);
if (norm === rev) {
showOutput(palindromeOutput, "It is a palindrome.", false);
} else {
showOutput(palindromeOutput, "It is not a palindrome.", false);
}
});
clearPalindrome.addEventListener("click", function () {
palindromeInput.value = "";
showOutput(palindromeOutput, "");
});
// ---------- Replace first occurrence of old substring with new ----------
function replaceFirst(original, oldSub, newSub) {
if (oldSub.length === 0) {
return { error: "Old substring must not be empty." };
}
const idx = original.indexOf(oldSub);
if (idx === -1) {
return { result: original, info: "No occurrence found; original string unchanged." };
}
const before = original.substring(0, idx);
const after = original.substring(idx + oldSub.length);
return { result: before + newSub + after };
}
btnReplaceFirst.addEventListener("click", function () {
const orig = replaceFirstString.value;
const oldSub = replaceFirstOld.value;
const newSub = replaceFirstNew.value;
if (orig === "") {
showOutput(replaceFirstOutput, "Please enter the original string.", true);
return;
}
if (oldSub === "") {
showOutput(replaceFirstOutput, "Please enter the old substring to replace (cannot be empty).", true);
return;
}
const res = replaceFirst(orig, oldSub, newSub);
if (res.error) {
showOutput(replaceFirstOutput, res.error, true);
} else if (res.info) {
showOutput(replaceFirstOutput, res.info + "\n\nResult:\n" + res.result, false);
} else {
showOutput(replaceFirstOutput, res.result, false);
}
});
clearReplaceFirst.addEventListener("click", function () {
replaceFirstString.value = "";
replaceFirstOld.value = "";
replaceFirstNew.value = "";
showOutput(replaceFirstOutput, "");
});
// ---------- Replace all occurrences (non-overlapping) ----------
// This function finds occurrences using indexOf and skips the matched substring length
// so replacements are non-overlapping (same as native replaceAll behavior).
function replaceAll(original, oldSub, newSub) {
if (oldSub.length === 0) {
return { error: "Old substring must not be empty." };
}
let result = "";
let pos = 0;
let found = false;
let idx = original.indexOf(oldSub, pos);
while (idx !== -1) {
found = true;
// append part before match and then the replacement
result += original.slice(pos, idx) + newSub;
// advance position by full oldSub length to avoid overlaps
pos = idx + oldSub.length;
idx = original.indexOf(oldSub, pos);
}
// append remainder
result += original.slice(pos);
if (!found) {
return { result: original, info: "No occurrence found; original string unchanged." };
}
return { result: result };
}
btnReplaceAll.addEventListener("click", function () {
const orig = replaceAllString.value;
const oldSub = replaceAllOld.value;
const newSub = replaceAllNew.value;
if (orig === "") {
showOutput(replaceAllOutput, "Please enter the original string.", true);
return;
}
if (oldSub === "") {
showOutput(replaceAllOutput, "Please enter the old substring to replace (cannot be empty).", true);
return;
}
const res = replaceAll(orig, oldSub, newSub);
if (res.error) {
showOutput(replaceAllOutput, res.error, true);
} else if (res.info) {
showOutput(replaceAllOutput, res.info + "\n\nResult:\n" + res.result, false);
} else {
showOutput(replaceAllOutput, res.result, false);
}
});
clearReplaceAll.addEventListener("click", function () {
replaceAllString.value = "";
replaceAllOld.value = "";
replaceAllNew.value = "";
showOutput(replaceAllOutput, "");
});
// Optional: Pressing Enter triggers primary action for that block
reverseInput.addEventListener("keydown", function (e) { if (e.key === "Enter") btnReverse.click(); });
palindromeInput.addEventListener("keydown", function (e) { if (e.key === "Enter") btnPalindrome.click(); });
replaceFirstNew.addEventListener("keydown", function (e) { if (e.key === "Enter") btnReplaceFirst.click(); });
replaceAllNew.addEventListener("keydown", function (e) { if (e.key === "Enter") btnReplaceAll.click(); });
})();
Index