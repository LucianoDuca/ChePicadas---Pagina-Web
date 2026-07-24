/* sucursales.js — específico de la página Sucursales.
   Muestra la sede activa primero y carga el mapa de Google recién al click (lazy). */

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

/* ---------- Mapa lazy: la fachada carga el iframe al click ---------- */
document.querySelectorAll('.map-load').forEach((btn) => {
  btn.addEventListener('click', () => {
    const facade = btn.closest('.map-facade');
    const src = facade.getAttribute('data-map-src');
    if (!src) return;
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.title = facade.getAttribute('data-map-title') || 'Mapa';
    iframe.setAttribute('allowfullscreen', '');
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    facade.replaceChildren(iframe);
  });
});
