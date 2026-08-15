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

/* ---------- Altura real del header → --header-h ----------
   En mobile el header envuelve (logo + selector de sede) y su alto cambia según
   fuente/contenido. Medimos el alto real y lo publicamos en --header-h para que
   el menú desplegable y las sub-navegaciones sticky (carta) se alineen exacto. */
(function headerHeight() {
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('main-nav');
  if (!header) return;
  const measure = () => {
    // Se mide con el menú cerrado (en mobile el nav está fuera de flujo, no afecta).
    const h = Math.round(header.getBoundingClientRect().height);
    if (h) document.documentElement.style.setProperty('--header-h', h + 'px');
  };
  measure();
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('orientationchange', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
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

/* ---------- Imprimir / Guardar como PDF (carta) ---------- */
document.querySelectorAll('[data-print]').forEach((btn) => {
  btn.addEventListener('click', () => window.print());
});

/* ---------- Navbar inferior: marcar el ítem activo según la URL ----------
   Se compara contra a.pathname (ruta ya resuelta por el navegador) en vez
   del data-tab fijo: así funciona igual si el sitio vive en la raíz del
   dominio (Express) o bajo un subpath (ej. GitHub Pages). */
(function tabbarActive() {
  const normalize = (pathname) => {
    let p = pathname.replace(/index\.html$/, '').replace(/\.html$/, '');
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  };
  const path = normalize(location.pathname);
  document.querySelectorAll('.app-tabbar__item[data-tab]').forEach((a) => {
    if (normalize(a.pathname) === path) a.setAttribute('aria-current', 'page');
  });
})();

/* ---------- Scroll reveal (con red de seguridad: nada queda invisible) ---------- */
(function reveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  const sel = 'main .card, main .reina, main .sede-card, main .timeline li, main .gallery picture, main .promo-card, main .ig-grid, main section > h2';
  const vh = window.innerHeight || 800;
  const armed = [...document.querySelectorAll(sel)].filter((t) => t.getBoundingClientRect().top >= vh * 0.9);
  if (!armed.length) return;
  const show = (t) => { t.classList.remove('reveal-init'); t.classList.add('reveal-in'); };
  armed.forEach((t) => t.classList.add('reveal-init'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  armed.forEach((t) => io.observe(t));
  // Red de seguridad: si algo no se reveló (IO no disparó), mostrarlo igual.
  setTimeout(() => armed.forEach(show), 2500);
})();
