const body = document.body;
const hoverBtn = document.getElementById("hoverBtn");
const focusInput = document.getElementById("focusInput");

// State variables
let isFocused = false;
let isHovering = false;

// Default background
const defaultBg = "#f4f4f9";
const hoverBg = "linear-gradient(135deg, #48cae4, #00b4d8)";
const focusBg = "linear-gradient(135deg, #ffb6b9, #fae3d9)";

// Apply default background
body.style.background = defaultBg;

// Hover events
hoverBtn.addEventListener("mouseover", () => {
  isHovering = true;
  if (!isFocused) body.style.background = hoverBg;
});

hoverBtn.addEventListener("mouseout", () => {
  isHovering = false;
  if (!isFocused) body.style.background = defaultBg;
});

// Focus events
focusInput.addEventListener("focus", () => {
  isFocused = true;
  body.style.background = focusBg;
});

focusInput.addEventListener("blur", () => {
  isFocused = false;
  // If hover is active, keep hover bg, else default
  body.style.background = isHovering ? hoverBg : defaultBg;
});
