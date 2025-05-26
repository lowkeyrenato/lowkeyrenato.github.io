const btn = document.getElementById('toggleThemeBtn');
const body = document.body;
const animatedTitle = document.querySelector('h1');
const hardReloadBtn = document.getElementById('hardReloadBtn'); // Új gomb referencia

const originalText = "lowkeyrenato";
const typingSpeed = 150;
const deletingSpeed = 70;
const pauseAfterTyping = 2500;
const pauseAfterDeleting = 500;
const initialDelay = 500;

let charIndex = 0;
let isDeleting = false;

// Téma váltó
btn.addEventListener('click', () => {
  body.classList.toggle('light');
  updateThemeButtonText();
});

function updateThemeButtonText() {
  if (body.classList.contains('light')) {
    btn.textContent = 'Sötét mód';
  } else {
    btn.textContent = 'Világos mód';
  }
}

// Cím animáció
function animateTextLoop() {
  const currentFullText = originalText;
  if (isDeleting) {
    animatedTitle.textContent = currentFullText.substring(0, animatedTitle.textContent.length - 1);
    if (animatedTitle.textContent.length === 0) {
      isDeleting = false;
      charIndex = 0;
      setTimeout(animateTextLoop, pauseAfterDeleting);
    } else {
      setTimeout(animateTextLoop, deletingSpeed);
    }
  } else {
    if (charIndex < currentFullText.length) {
      animatedTitle.textContent += currentFullText.charAt(charIndex);
      charIndex++;
      setTimeout(animateTextLoop, typingSpeed);
    } else {
      isDeleting = true;
      setTimeout(animateTextLoop, pauseAfterTyping);
    }
  }
}

// --- Hard Reload Gomb Logika ---
let clickCount = 0;
let lastClickTimestamp = 0;
const CLICK_EVENT_AREA = document.documentElement; // Egész dokumentumon figyelünk
const CLICK_THRESHOLD_MS = 1000; // 5 kattintásnak 1 másodpercen belül kell történnie
const REQUIRED_CLICKS = 5;
let reloadButtonVisibilityTimeoutId = null;
const RELOAD_BUTTON_VISIBLE_DURATION_MS = 30000; // 30 másodperc

function showReloadButton() {
  hardReloadBtn.classList.add('visible');
  clearTimeout(reloadButtonVisibilityTimeoutId); // Korábbi időzítő törlése
  reloadButtonVisibilityTimeoutId = setTimeout(hideReloadButton, RELOAD_BUTTON_VISIBLE_DURATION_MS);
}

function hideReloadButton() {
  hardReloadBtn.classList.remove('visible');
  clearTimeout(reloadButtonVisibilityTimeoutId); // Biztonság kedvéért
}

function toggleReloadButtonVisibility() {
  if (hardReloadBtn.classList.contains('visible')) {
    hideReloadButton(); // Ha látható és újra 5 klikk, azonnal elrejtjük
  } else {
    showReloadButton(); // Ha rejtett és 5 klikk, megjelenítjük
  }
}

function handleGlobalClick(event) {
  const now = Date.now();

  // Reseteljük a számlálót, ha túl sok idő telt el az utolsó kattintás óta
  if (now - lastClickTimestamp > CLICK_THRESHOLD_MS) {
    clickCount = 0;
  }

  clickCount++;
  lastClickTimestamp = now;

  if (clickCount >= REQUIRED_CLICKS) {
    clickCount = 0; // Reseteljük a számlálót a sikeres aktiválás/deaktiválás után
    toggleReloadButtonVisibility();
  }
}

// --- DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
  animatedTitle.textContent = ''; // Kezdetben üres a cím
  updateThemeButtonText();        // Gomb szövegének frissítése
  setTimeout(animateTextLoop, initialDelay); // Cím animáció indítása

  // Hard reload gomb alap funkcionalitása (cache nélküli frissítés)
  hardReloadBtn.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('cache_bust', Date.now());
    window.location.href = url.toString();
  });

  // Globális kattintásfigyelő a hard reload gomb megjelenítéséhez/elrejtéséhez
  CLICK_EVENT_AREA.addEventListener('click', handleGlobalClick);

  // Biztosítjuk, hogy a gomb kezdetben rejtett legyen a CSS alapján,
  // de ha a JS később futna, mint a CSS apply, a classList.remove is jó lenne.
  // hardReloadBtn.classList.remove('visible'); // Alapból a CSS kezeli
});
