document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('target');
  const submitBtn = document.getElementById('submitBtn');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const messageEl = document.getElementById('message');
  const countdownText = document.getElementById('countdownText');

  if (!input || !submitBtn || !startBtn || !resetBtn || !messageEl || !countdownText) {
    console.error('One or more DOM elements are missing. Check IDs in HTML.');
    return;
  }

  let targetDate = null;
  let timerId = null;

  // Utility: show messages with style
  function setMessage(txt, isError = true) {
    messageEl.textContent = txt || '';
    messageEl.style.color = isError ? '#c00' : '#0a6';
    messageEl.style.fontWeight = '500';
  }

  // Parse datetime-local safely
  function parseDatetimeLocal(value) {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed) return null;

    const needsSeconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmed);
    const v = needsSeconds ? trimmed + ':00' : trimmed;
    let d = new Date(v);
    if (Number.isNaN(d.getTime())) {
      d = new Date(v.replace('T', ' '));
      if (Number.isNaN(d.getTime())) return null;
    }
    return d;
  }

  // Compute remaining time components
  function computeDateDiffComponents(now, future) {
    if (!future || future <= now) return null;

    let years = future.getFullYear() - now.getFullYear();
    let months = future.getMonth() - now.getMonth();
    let days = future.getDate() - now.getDate();
    let hours = future.getHours() - now.getHours();
    let minutes = future.getMinutes() - now.getMinutes();
    let seconds = future.getSeconds() - now.getSeconds();

    if (seconds < 0) { seconds += 60; minutes -= 1; }
    if (minutes < 0) { minutes += 60; hours -= 1; }
    if (hours < 0) { hours += 24; days -= 1; }
    if (days < 0) {
      const prevMonth = new Date(future.getFullYear(), future.getMonth(), 0);
      days += prevMonth.getDate();
      months -= 1;
    }
    if (months < 0) { months += 12; years -= 1; }

    return {
      years: Math.max(years, 0),
      months: Math.max(months, 0),
      days: Math.max(days, 0),
      hours: Math.max(hours, 0),
      minutes: Math.max(minutes, 0),
      seconds: Math.max(seconds, 0)
    };
  }

  // Format time for display
  function formatComponents(c) {
    if (!c) return '';
    const pad = (n) => String(n).padStart(2, '0');
    const parts = [];
    if (c.years) parts.push(`${c.years}y`);
    if (c.months) parts.push(`${c.months}m`);
    if (c.days) parts.push(`${c.days}d`);
    if (!c.years && !c.months && !c.days && c.hours === 0) {
      parts.push(`${pad(c.minutes)}:${pad(c.seconds)}`);
    } else {
      parts.push(`${pad(c.hours)}:${pad(c.minutes)}:${pad(c.seconds)}`);
    }
    return parts.join(' ');
  }

  // Tick function (runs every second)
  function tick() {
    try {
      if (!targetDate) return;
      const now = new Date();

      if (targetDate <= now) {
        if (timerId) { clearInterval(timerId); timerId = null; }

        // BIG "TIMER ENDED" message
        countdownText.textContent = '⏰ TIMER ENDED!';
        countdownText.style.fontSize = '2rem';
        countdownText.style.color = '#c00';
        countdownText.style.fontWeight = 'bold';
        setMessage('Countdown completed successfully!', false);
        startBtn.disabled = true;
        resetBtn.disabled = false;
        return;
      }

      const comp = computeDateDiffComponents(now, targetDate);
      countdownText.style.fontSize = '1.5rem';
      countdownText.style.color = '#000';
      countdownText.textContent = formatComponents(comp);
      setMessage('', false);
    } catch (err) {
      console.error('Error in tick():', err);
      setMessage('Unexpected error. See console.');
    }
  }

  // Initialize buttons
  startBtn.disabled = true;
  resetBtn.disabled = true;

  // Submit button
  submitBtn.addEventListener('click', () => {
    setMessage('');
    const val = input.value;
    if (!val || !val.trim()) {
      setMessage('⚠️ Please pick a date and time.');
      return;
    }

    const chosen = parseDatetimeLocal(val);
    if (!chosen) {
      setMessage('⚠️ Invalid date/time format.');
      console.error('parseDatetimeLocal failed for value:', val);
      return;
    }

    const now = new Date();
    if (chosen <= now) {
      targetDate = null;
      countdownText.textContent = '--:--:--';
      setMessage('⛔ Past time not allowed! Please select a future date.', true);
      startBtn.disabled = true;
      resetBtn.disabled = false;
      return;
    }

    targetDate = chosen;
    setMessage('✅ Target accepted. Click Start to begin.', false);
    startBtn.disabled = false;
    resetBtn.disabled = false;
    tick();
  });

  // Start button
  startBtn.addEventListener('click', () => {
    if (!targetDate) {
      setMessage('⚠️ No valid future date selected.');
      return;
    }
    if (timerId) clearInterval(timerId);
    tick();
    timerId = setInterval(tick, 1000);
    setMessage('⏳ Timer running...', false);
    startBtn.disabled = true;
  });

  // Reset button
  resetBtn.addEventListener('click', () => {
    if (timerId) { clearInterval(timerId); timerId = null; }
    targetDate = null;
    input.value = '';
    countdownText.textContent = '--:--:--';
    countdownText.style.color = '#000';
    setMessage('🔄 Timer reset.', false);
    startBtn.disabled = true;
    resetBtn.disabled = true;
  });

  // Allow Enter key for submission
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') submitBtn.click();
  });

  console.log('Countdown script initialized');
});
