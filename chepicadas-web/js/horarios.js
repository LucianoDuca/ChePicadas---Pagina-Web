/* horarios.js — utilidad COMPARTIDA. Calcula Abierto/Cerrado en TZ
   America/Argentina/Buenos_Aires, contemplando cierres pasada la medianoche. */

const TZ = 'America/Argentina/Buenos_Aires';

function nowInArg() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const map = {};
  for (const p of parts) map[p.type] = p.value;
  const dowIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let hour = parseInt(map.hour, 10);
  if (hour === 24) hour = 0;
  return { dow: dowIndex[map.weekday], minutes: hour * 60 + parseInt(map.minute, 10) };
}

const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

export function estaAbierto(horariosSemana) {
  if (!horariosSemana) return null;
  const { dow, minutes } = nowInArg();

  const hoy = horariosSemana[dow];
  if (hoy) {
    const abre = toMin(hoy.abre);
    let cierra = toMin(hoy.cierra);
    if (cierra <= abre) cierra += 1440;
    if (minutes >= abre && minutes < cierra) return { abierto: true, cierra: hoy.cierra };
  }

  const ayerDow = (dow + 6) % 7;
  const ayer = horariosSemana[ayerDow];
  if (ayer) {
    const abre = toMin(ayer.abre);
    let cierra = toMin(ayer.cierra);
    if (cierra <= abre) { cierra += 1440; if (minutes + 1440 < cierra) return { abierto: true, cierra: ayer.cierra }; }
  }
  return { abierto: false };
}

export function renderEstado(el, horariosSemana) {
  const r = estaAbierto(horariosSemana);
  if (!r) return;
  el.setAttribute('data-abierto', String(r.abierto));
  const label = el.querySelector('[data-estado-label]') || el;
  label.textContent = r.abierto ? `Abierto ahora · cierra ${r.cierra}` : 'Cerrado ahora';
}
