/* reservas.js — específico de la página Reservas.
   Arma un deep-link de WhatsApp prellenado al enviar. No hay backend propio:
   el único link con datos es el de WhatsApp que dispara la persona usuaria. */

import { getSedeData } from './sede.js';

const form = document.getElementById('reserva-form');
if (form) {
  const sedeSelect = form.querySelector('[name="sede"]');

  const syncSede = () => {
    const activa = getSedeData();
    if (activa && sedeSelect && !sedeSelect.dataset.touched) sedeSelect.value = activa.id;
  };
  document.addEventListener('sede:applied', syncSede);
  if (sedeSelect) sedeSelect.addEventListener('change', () => { sedeSelect.dataset.touched = '1'; });
  syncSede();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const sede = getSedeData(data.get('sede'));
    if (!sede) return;

    const msg =
      `¡Hola Che Picadas ${sede.nombreCorto}! Quiero reservar una mesa.\n\n` +
      `• Nombre: ${data.get('nombre')}\n` +
      `• Día: ${data.get('fecha')}\n` +
      `• Hora: ${data.get('hora')}\n` +
      `• Personas: ${data.get('personas')}\n` +
      `• Teléfono: ${data.get('telefono')}` +
      (data.get('notas') ? `\n• Notas: ${data.get('notas')}` : '');

    window.open(`https://wa.me/${sede.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');

    const ok = document.getElementById('reserva-ok');
    if (ok) { ok.hidden = false; ok.focus(); }
  });
}
