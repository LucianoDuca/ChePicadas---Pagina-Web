/* lockscreen.js — splash "desbloqueo" del Home. Puramente estético: no guarda
   estado ni condiciona nada. La pantalla sigue el arrastre en tiempo real y,
   al soltar, completa el desbloqueo o vuelve a su lugar según el recorrido. */

(function () {
  const screen = document.getElementById('lockScreen');
  if (!screen) return;

  const dismissBtn = document.getElementById('lockScreenDismiss');
  const UNLOCK_RATIO = 0.28; // fracción del alto de pantalla para desbloquear

  let unlocked = false;
  let dragging = false;
  let startY = 0;
  let deltaY = 0;

  document.documentElement.classList.add('no-scroll');

  function applyTransform(y) {
    screen.style.transform = y ? `translateY(${y}px)` : '';
  }

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    dragging = false;
    document.documentElement.classList.remove('no-scroll');
    screen.style.transition = 'transform 0.45s var(--ease), opacity 0.35s ease 0.1s';
    screen.style.opacity = '0';
    applyTransform(-window.innerHeight);
    screen.addEventListener('transitionend', () => {
      screen.classList.add('is-hidden');
      screen.setAttribute('aria-hidden', 'true');
    }, { once: true });
  }

  function snapBack() {
    screen.style.transition = 'transform 0.35s var(--ease)';
    applyTransform(0);
    screen.addEventListener('transitionend', () => { screen.style.transition = ''; }, { once: true });
  }

  function dragStart(y) {
    if (unlocked) return;
    dragging = true;
    startY = y;
    deltaY = 0;
    screen.style.transition = 'none';
  }

  function dragMove(y) {
    if (!dragging) return;
    deltaY = Math.min(0, y - startY);
    applyTransform(deltaY);
  }

  function dragEnd() {
    if (!dragging) return;
    dragging = false;
    const threshold = window.innerHeight * UNLOCK_RATIO;
    if (-deltaY > threshold) unlock();
    else snapBack();
  }

  /* Táctil */
  screen.addEventListener('touchstart', (e) => dragStart(e.touches[0].clientY), { passive: true });
  screen.addEventListener('touchmove', (e) => dragMove(e.touches[0].clientY), { passive: true });
  screen.addEventListener('touchend', dragEnd);

  /* Mouse (desktop) */
  screen.addEventListener('mousedown', (e) => dragStart(e.clientY));
  window.addEventListener('mousemove', (e) => dragMove(e.clientY));
  window.addEventListener('mouseup', dragEnd);

  /* Rueda / trackpad hacia arriba */
  let wheelUp = 0;
  let wheelResetTimer = null;
  screen.addEventListener('wheel', (e) => {
    if (unlocked) return;
    if (e.deltaY >= 0) return;
    wheelUp += Math.abs(e.deltaY);
    screen.style.transition = 'none';
    applyTransform(-wheelUp);
    const threshold = window.innerHeight * UNLOCK_RATIO;
    if (wheelUp > threshold) { unlock(); return; }
    clearTimeout(wheelResetTimer);
    wheelResetTimer = setTimeout(() => { wheelUp = 0; snapBack(); }, 250);
  }, { passive: true });

  /* Accesibilidad: click, Enter/Espacio (nativos del <button>) y flecha arriba */
  dismissBtn?.addEventListener('click', unlock);
  dismissBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') unlock();
  });

  dismissBtn?.focus({ preventScroll: true });
})();
