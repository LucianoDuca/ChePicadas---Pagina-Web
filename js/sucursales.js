/* sucursales.js — específico de la página Sucursales.
   Muestra la sede activa primero. */

import { getSedeData } from './sede.js';

/* ---------- La sede activa se muestra primero ---------- */
function reorderSedes(activaId) {
  document.querySelectorAll('[data-sede-section]').forEach((sec) => {
    const isActive = sec.getAttribute('data-sede-section') === activaId;
    sec.style.order = isActive ? '-1' : '0';
    const strip = sec.nextElementSibling;
    if (strip && strip.classList.contains('banderines')) strip.style.order = isActive ? '-1' : '0';
  });
}
document.addEventListener('sede:applied', (e) => reorderSedes(e.detail.id));
reorderSedes(getSedeData().id);
