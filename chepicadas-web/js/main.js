/* main.js — comportamiento común de UI en TODAS las páginas
   (nav mobile accesible + indicador Abierto/Cerrado). Como tu script.js. */

import { getSedeData } from './sede.js';
import { renderEstado } from './horarios.js';

/* ---------- Nav mobile accesible ---------- */
(function nav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.setAttribute('data-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
    if (open) { const first = nav.querySelector('a'); if (first) first.focus(); }
  };

  toggle.addEventListener('click', () => setOpen(nav.getAttribute('data-open') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') { setOpen(false); toggle.focus(); }
  });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', (e) => {
    if (nav.getAttribute('data-open') === 'true' && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
})();

/* ---------- Estado Abierto/Cerrado (recalcula al cambiar de sede) ---------- */
function refreshEstados() {
  document.querySelectorAll('[data-estado]').forEach((el) => {
    const sedeId = el.getAttribute('data-estado');
    const sede = sedeId === 'activa' ? getSedeData() : getSedeData(sedeId);
    if (sede) renderEstado(el, sede.horariosSemana);
  });
}
document.addEventListener('sede:applied', refreshEstados);
refreshEstados();
setInterval(refreshEstados, 60000);

/* ---------- Año del footer ---------- */
document.querySelectorAll('#year, [data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
