# Che Picadas — Sitio web

Sitio multipágina de **Che Picadas** (almacén de picadas · Mar del Plata y Mendoza).
Arquitectura **estática**: una página HTML autónoma por sección + Express que sirve los archivos. Sin motor de plantillas, sin base de datos. HTML + CSS + JS vanilla (ES modules).

> **Por qué así:** cada página es un archivo completo e independiente — abrís `carta.html` y ahí está *todo* (estructura, contenido, precios). Fácil de leer, editar y mantener de a una página por vez.

---

## Cómo correr

Requiere **Node.js ≥ 20**.

```bash
npm install
npm start
```

Levanta en http://localhost:3000. Para desarrollo con recarga: `npm run dev`.

Rutas (URL limpia → archivo): `/` → `index.html` · `/carta` → `carta.html` · `/historia` · `/sucursales` · `/reservas`. Cualquier otra ruta cae en `404.html`.

> También podés abrir los `.html` directo con doble clic, pero el selector de sede y las URLs limpias funcionan mejor con `npm start`.

---

## Estructura

```
chepicadas-web/
├── index.html          ← Home (autónoma: header, contenido y footer adentro)
├── carta.html          ← La Carta (menú completo por sede)
├── historia.html       ← Nuestra Historia
├── sucursales.html     ← Las dos sedes
├── reservas.html       ← Reservas por WhatsApp
├── 404.html
├── css/
│   ├── primary.css     ← NÚCLEO compartido (colores, tipografía, header, footer, botones, cards…)
│   ├── index.css       ← estilos propios del Home
│   ├── carta.css       ├─ … un CSS por página para lo específico
│   ├── historia.css
│   ├── sucursales.css
│   └── reservas.css
├── js/
│   ├── sede.js         ← COMPARTIDO: selector de sede + localStorage
│   ├── horarios.js     ← COMPARTIDO: cálculo Abierto/Cerrado (TZ Argentina)
│   ├── main.js         ← COMPARTIDO: nav mobile + indicador de estado + año
│   ├── sucursales.js   ← solo Sucursales: mapa lazy + orden de sedes
│   └── reservas.js     ← solo Reservas: arma el WhatsApp
├── assets/             ← img / fonts / videos (cuando lleguen los reales)
├── favicon.svg, robots.txt, sitemap.xml
├── server.js           ← Express: sirve estáticos con seguridad y URLs limpias
└── package.json
```

**Regla de oro:** lo que se repite en todas las páginas (header, footer, botones, colores) va en `primary.css` y en los JS `js/*.js` compartidos. Lo propio de una página va en su `nombre.css` y, si hace falta, su `nombre.js`.

---

## Cómo editar el contenido

Como cada página es autónoma, **editás directamente el HTML de esa página**.

### Cambiar un precio
Abrí el `.html` de la página (ej. `carta.html`), buscá el plato y cambiá el número:

```html
<span class="dish__name">Picada Che</span><span class="dish__price">$35.000</span>
```

Los destacados del Home están en `index.html` (buscá `dish__price`). Guardás y recargás.

> ⚠️ Un mismo plato puede aparecer en `index.html` (destacados) y en `carta.html` (carta completa). Si cambia el precio, actualizá los dos lugares. *(Esto es el costo de tener todo inline; se puede reunificar en un solo JSON en la etapa de consolidación.)*

### Cambiar teléfonos, WhatsApp u horarios de una sede
Cada HTML lleva, dentro del `<head>`, un bloque con los datos de las dos sedes que alimenta el selector:

```html
<script type="application/json" id="sedes-data"> … </script>
```

Ahí están `telefono`, `telefonoDisplay`, `whatsapp` (formato internacional sin `+` ni espacios, ej. `5492236357854`), `geo`, `placeId` y `horariosSemana` (clave `0`=domingo … `6`=sábado, con `abre`/`cierra` en `"HH:MM"` 24 h; los cierres pasada la medianoche se calculan solos).

En `sucursales.html` los teléfonos/horarios también están escritos como texto visible → actualizá ahí también.

> Este bloque es idéntico en las 6 páginas. Si cambiás un dato de sede, cambialo en las 6 (o dejalo para la consolidación, donde se puede pasar a un único archivo compartido).

---

## Selector de sede
Toggle Mar del Plata / Mendoza en el header. Guarda la elección en `localStorage` y actualiza sin recargar: teléfono, WhatsApp, dirección, indicador Abierto/Cerrado, destacados del Home y "Cómo llegar". Lo maneja `js/sede.js` leyendo el bloque `#sedes-data` de la página.

## SEO
- `robots.txt` abierto + `sitemap.xml` con las 5 URLs.
- Cada página tiene su `title`/`description`/canonical/OG únicos y **JSON-LD `Restaurant`** por sede (con el rating real de Google) escritos en su `<head>`.
- Al publicar, reemplazá el dominio `https://chepicadas.com.ar` en los `.html`, `robots.txt` y `sitemap.xml`.

## Reservas
Sin backend: el formulario arma un **WhatsApp prellenado** al número de la sede elegida. No se guardan datos en el sitio ni viajan en URLs propias.

---

## ⏳ Placeholders pendientes (buscá `PENDIENTE` en el proyecto)
Logo SVG (header) · foto del interior (hero) · fotos de platos destacados (Home y Carta) · 6 fotos del almacén (Home) · foto histórica años 60/70 e interior de Güemes (Historia) · `carta.pdf` (Carta).

## 📋 Checklist de assets a pedir al cliente
Logo vectorial (SVG/AI) · colores de marca oficiales · fotos profesionales del interior de ambos locales · fotos honestas de platos · fotos históricas de la 21 platitos · carta oficial en texto editable + PDF.

## Deploy
Cualquier host con Node ≥ 20 (`npm install && npm start`, `PORT` opcional). Servir detrás de HTTPS (la CSP fuerza `upgrade-insecure-requests`). `server.js` solo expone `css/`, `js/`, `assets/` y los `.html` — nunca el código del servidor ni `node_modules`.

---

## Nota sobre la etapa de "consolidación"
Este desglose prioriza que cada página sea autónoma. Lo que quedó **duplicado a propósito** y conviene unificar al final:
1. **Header / footer / bloque `#sedes-data`** — idénticos en las 6 páginas. Se pueden centralizar (con includes, plantillas o Web Components) sin cambiar el look.
2. **Precios repetidos** entre `index.html` (destacados) y `carta.html`. Se pueden mover a un único `data/menu.json` leído por JS.
