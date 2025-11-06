document.addEventListener('DOMContentLoaded', () => {
  // DOM refs
  const sizeInput = document.getElementById('sizeInput');
  const setSizeBtn = document.getElementById('setSizeBtn');
  const displaySizeBtn = document.getElementById('displaySizeBtn');
  const sizeMsg = document.getElementById('sizeMsg');
  const addInput = document.getElementById('addInput');
  const addBtn = document.getElementById('addBtn');
  const addMsg = document.getElementById('addMsg');
  const checkInput = document.getElementById('checkInput');
  const checkBtn = document.getElementById('checkBtn');
  const checkMsg = document.getElementById('checkMsg');
  const removeInput = document.getElementById('removeInput');
  const removeBtn = document.getElementById('removeBtn');
  const emptyBtn = document.getElementById('emptyBtn');
  const removeMsg = document.getElementById('removeMsg');
  const arrayDisplay = document.getElementById('arrayDisplay');

  // Internal state
  let capacity = 0;
  let arr = [];
  let length = 0;

  // Utility: render array
  function renderArray() {
    if (capacity === 0) {
      arrayDisplay.textContent = '[] (capacity not set)';
      return;
    }
    const used = arr.slice(0, length).map(v => JSON.stringify(v));
    const emptySlots = Array.from({ length: capacity - length }, () => '_');
    arrayDisplay.textContent = `[ ${used.concat(emptySlots).join(' , ')} ] (len=${length} / cap=${capacity})`;
  }

  // Utility: show messages
  function show(el, text, ok = true) {
    el.textContent = text;
    el.style.color = ok ? 'var(--muted)' : 'var(--danger)';
  }

  // Helper: parse input
  function parseValue(input) {
    if (input === null || input === undefined) return '';
    const trimmed = input.trim();
    if (trimmed === '') return '';
    const num = Number(trimmed);
    return (!Number.isNaN(num) && String(num) === trimmed) ? num : trimmed;
  }

  // Set size
  setSizeBtn.addEventListener('click', () => {
    const raw = sizeInput.value.trim();
    const n = Number(raw);
    if (!raw || !Number.isInteger(n) || n <= 0) {
      show(sizeMsg, 'Please enter a valid positive integer capacity.', false);
      return;
    }
    capacity = n;
    arr = new Array(capacity).fill(null);
    length = 0;
    show(sizeMsg, `Capacity set to ${capacity}. Array cleared.`);
    document.getElementById('arraySection').style.display = 'block';
    show(addMsg, '');
    show(checkMsg, '');
    show(removeMsg, '');
    renderArray();
  });

  // Display size
  displaySizeBtn.addEventListener('click', () => {
    if (capacity === 0) {
      show(sizeMsg, 'Capacity not set yet. Use Set button.', false);
      return;
    }
    show(sizeMsg, `Capacity = ${capacity} ; Current length = ${length}`);
  });

  // Add element
  addBtn.addEventListener('click', () => {
    addMsg.textContent = '';
    if (capacity === 0) {
      show(addMsg, 'Set the array capacity first.', false);
      return;
    }
    if (length >= capacity) {
      show(addMsg, 'Array size overflow', false);
      renderArray();
      return;
    }
    const value = parseValue(addInput.value);
    if (value === '') {
      show(addMsg, 'Please enter an element to add.', false);
      return;
    }
    arr[length] = value;
    const idx = length;
    length += 1;
    show(addMsg, `Added ${JSON.stringify(value)} at index ${idx}`);
    renderArray();
    addInput.value = '';
  });

  // Check element
  checkBtn.addEventListener('click', () => {
    checkMsg.textContent = '';
    if (capacity === 0) {
      show(checkMsg, 'Set the array capacity first.', false);
      return;
    }
    const value = parseValue(checkInput.value);
    if (value === '') {
      show(checkMsg, 'Please enter value to check.', false);
      return;
    }
    const idx = arr.findIndex((v, i) => i < length && v === value);
    if (idx === -1) {
      show(checkMsg, `${JSON.stringify(value)} not found`, false);
    } else {
      show(checkMsg, `${JSON.stringify(value)} is present at index ${idx}`);
    }
  });

  // Remove element
  removeBtn.addEventListener('click', () => {
    removeMsg.textContent = '';
    if (capacity === 0) {
      show(removeMsg, 'Set the array capacity first.', false);
      return;
    }
    const value = parseValue(removeInput.value);
    if (value === '') {
      show(removeMsg, 'Please enter value to remove.', false);
      return;
    }
    const idx = arr.findIndex((v, i) => i < length && v === value);
    if (idx === -1) {
      show(removeMsg, `${JSON.stringify(value)} is not present in array`, false);
      return;
    }
    for (let i = idx; i < length - 1; i++) arr[i] = arr[i + 1];
    arr[length - 1] = null;
    length -= 1;
    show(removeMsg, `${JSON.stringify(value)} removed from index ${idx}`);
    renderArray();
    removeInput.value = '';
  });

  // Empty array
  emptyBtn.addEventListener('click', () => {
    if (capacity === 0) {
      show(removeMsg, 'Set the array capacity first.', false);
      return;
    }
    arr = new Array(capacity).fill(null);
    length = 0;
    show(removeMsg, 'Array emptied');
    renderArray();
  });

  // Initial render
  renderArray();
});
