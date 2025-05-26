const btn = document.getElementById('toggleThemeBtn');
const body = document.body;

// Alapból dark mode van, így gomb szöveg legyen "Világos mód"
// Ezt már a HTML-ben beállítottuk, de a JS-ben is lehetne, ha ott nem lenne:
// btn.textContent = 'Világos mód'; 
// Mivel a HTML-ben már 'Világos mód' a gomb szövege, és az alap téma a sötét,
// ez a sor itt felesleges, ha a HTML-ben már expliciten be van állítva.
// Ha a HTML-ben más lenne a gomb szövege, akkor itt lenne értelme.

btn.addEventListener('click', () => {
  body.classList.toggle('light');
  if (body.classList.contains('light')) {
    btn.textContent = 'Sötét mód';
  } else {
    btn.textContent = 'Világos mód';
  }
});
