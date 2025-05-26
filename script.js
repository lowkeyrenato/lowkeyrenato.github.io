const btn = document.getElementById('toggleThemeBtn');
const body = document.body;
const animatedTitle = document.querySelector('h1');

const originalText = "lowkeyrenato";
const typingSpeed = 150;         // Gépelési sebesség (ms karakterenként)
const deletingSpeed = 70;          // Törlési sebesség (ms karakterenként)
const pauseAfterTyping = 2500;     // Várakozás a teljes kiírás után, mielőtt töröl (ms)
const pauseAfterDeleting = 500;    // Várakozás a teljes törlés után, mielőtt újraír (ms)
const initialDelay = 500;          // Kezdeti késleltetés az oldal betöltődése után (ms)

let charIndex = 0;
let isDeleting = false;

// Téma váltó gomb eseménykezelője
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

function animateTextLoop() {
  const currentFullText = originalText; // Jelenleg csak egy szöveg van, de később lehetne tömb is

  if (isDeleting) {
    // Törlési fázis
    animatedTitle.textContent = currentFullText.substring(0, animatedTitle.textContent.length - 1);
    if (animatedTitle.textContent.length === 0) {
      isDeleting = false;
      charIndex = 0; // Reset index az újraíráshoz
      // Várakozás a törlés után, majd újraírás
      setTimeout(animateTextLoop, pauseAfterDeleting);
    } else {
      // Következő karakter törlése
      setTimeout(animateTextLoop, deletingSpeed);
    }
  } else {
    // Gépelési fázis
    if (charIndex < currentFullText.length) {
      animatedTitle.textContent += currentFullText.charAt(charIndex);
      charIndex++;
      // Következő karakter gépelése
      setTimeout(animateTextLoop, typingSpeed);
    } else {
      // Gépelés befejeződött, várakozás, majd törlés indítása
      isDeleting = true;
      setTimeout(animateTextLoop, pauseAfterTyping);
    }
  }
}

// DOM betöltődése után indítjuk az animációt
document.addEventListener('DOMContentLoaded', () => {
  animatedTitle.textContent = ''; // Kezdetben üres a cím
  updateThemeButtonText();        // Gomb szövegének frissítése

  // Indítjuk a ciklust a kezdeti késleltetéssel
  setTimeout(animateTextLoop, initialDelay);
});
