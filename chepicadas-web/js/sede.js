/* sede.js — utilidad COMPARTIDA por todas las páginas.
   Selector de sede persistente en localStorage. Lee los datos de las sedes
   desde el data island inline <script type="application/json" id="sedes-data">
   que cada HTML lleva adentro (páginas autónomas, sin servidor de plantillas).
   Emite `sede:change` / `sede:applied` y refleja la sede en <html data-sede>. */

const KEY = 'chepicadas:sede';
const dataEl = document.getElementById('sedes-data');
const parsed = dataEl ? JSON.parse(dataEl.textContent) : { sedes: {}, default: null };
const SEDES = parsed.sedes || {};
const DEFAULT = parsed.default || Object.keys(SEDES)[0];

export function getSede() {
  const saved = localStorage.getItem(KEY);
  return saved && SEDES[saved] ? saved : DEFAULT;
}

export function getSedeData(id = getSede()) {
  return SEDES[id];
}

export function fmtWspLink(sede, text) {
  const base = `https://wa.me/${sede.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function setSede(id, { silent = false } = {}) {
  if (!SEDES[id]) return;
  localStorage.setItem(KEY, id);
  applySede(id);
  if (!silent) document.dispatchEvent(new CustomEvent('sede:change', { detail: { id, data: SEDES[id] } }));
}

function applySede(id) {
  const sede = SEDES[id];
  if (!sede) return;
  document.documentElement.setAttribute('data-sede', id);

  // Bloques condicionados por sede
  document.querySelectorAll('[data-when-sede]').forEach((el) => {
    el.hidden = el.getAttribute('data-when-sede') !== id;
  });

  // Botones del selector
  document.querySelectorAll('[data-sede-btn]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.getAttribute('data-sede-btn') === id));
  });

  // Texto simple (data-bind="clave.anidada")
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const val = resolve(sede, el.getAttribute('data-bind'));
    if (val != null) el.textContent = val;
  });

  // Teléfono clickeable
  document.querySelectorAll('[data-bind-tel]').forEach((el) => {
    el.setAttribute('href', `tel:${sede.telefono.replace(/[^\d+]/g, '')}`);
    if (el.hasAttribute('data-bind-tel-text')) el.textContent = sede.telefonoDisplay;
  });

  // WhatsApp
  document.querySelectorAll('[data-bind-wsp]').forEach((el) => {
    el.setAttribute('href', fmtWspLink(sede, el.getAttribute('data-wsp-text') || ''));
  });

  // Cómo llegar (Google Maps)
  document.querySelectorAll('[data-bind-maps]').forEach((el) => {
    el.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${sede.geo.lat},${sede.geo.lng}&query_place_id=${sede.placeId}`);
  });

  document.dispatchEvent(new CustomEvent('sede:applied', { detail: { id, data: sede } }));
}

function resolve(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

// Init: listeners de los botones + aplicar sede guardada
document.querySelectorAll('[data-sede-btn]').forEach((btn) => {
  btn.addEventListener('click', () => setSede(btn.getAttribute('data-sede-btn')));
});
applySede(getSede());
document.dispatchEvent(new CustomEvent('sede:change', { detail: { id: getSede(), data: getSedeData() } }));
