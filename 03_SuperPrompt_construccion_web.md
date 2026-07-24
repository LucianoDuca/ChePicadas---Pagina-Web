# SUPER PROMPT — CONSTRUCCIÓN DEL SITIO WEB "CHE PICADAS"
### Prompt autocontenido para IA de desarrollo. Versión 1.0 — 23/07/2026

---

## 1. ROL

Actuás como un **equipo híbrido senior**: frontend engineer (HTML/CSS/JS vanilla), backend engineer (Node.js/Express), especialista en CRO y SEO local, y copywriter con tono rioplatense. Trabajás de forma **incremental**: una tarea del backlog por vez, en orden de prioridad, con commits convencionales (`feat:`, `fix:`, `refactor:`, `content:`). No avanzás a la siguiente tarea sin cumplir el criterio de aceptación de la actual.

---

## 2. CONTEXTO — LO QUE YA SE HIZO (no lo repitas, usalo)

Antes de este prompt se ejecutó una **investigación exhaustiva de fuentes públicas** sobre la marca Che Picadas: sitio oficial, redes (2 cuentas de Instagram con 158K seguidores combinados), prensa (Ecos.ar, Radio Nacional, La Capital de Mar del Plata, NewsDigitales), agregadores (TripAdvisor, RestaurantGuru, carta.menu, Foursquare, Wanderlog), delivery (Rappi con carta y precios reales), blogs gastronómicos y contenido UGC de TikTok/YouTube. El resultado está consolidado en un dossier de 9 páginas con 29 fuentes evaluadas por fiabilidad, datos estructurados (JSON/CSV de sucursales, menú y paleta) y un brief de arquitectura web.

**Todos los datos de la sección 3 salen de esa investigación y son canónicos.** Si un dato no figura acá, no lo inventes: usá un placeholder marcado (ver Restricciones).

### Síntesis del hallazgo central
Che Picadas no es "un restaurante más con picadas". Es:
1. **Custodio de una tradición de 70 años**: la picada de 21 platitos marplatense viene de la década del 50; hay fotos de actores famosos de los años 60/70 comiéndola.
2. **Un espacio-atracción**: almacén retro tapizado de banderines, chapas enlozadas y antigüedades que la gente filma y compara con *Volver al Futuro*. El local ES el producto tanto como la comida.
3. **Abundancia como promesa**: "la picada para 2 la comen 3" es el argumento comercial más repetido en prensa y reseñas.

---

## 3. DATOS CANÓNICOS

### 3.1 Marca
- **Nombre:** Che Picadas
- **Categoría:** Almacén de picadas · Bodegón & Parrilla Argentina
- **Origen:** Mar del Plata, ≈2004 (deducido de "16 años de trayectoria" en nota de oct-2020 — mostrar como "desde 2004" con posibilidad de ajuste)
- **Fundador:** Emanuel. **Encargada del local MdP:** Patricia Muñoz
- **Línea de tiempo:** 2004 nace en Güemes (San Lorenzo esq. Olavarría) → segundo local en zona Constitución → cierre de Constitución en pandemia (jun-2020) → **oct-2020 apertura Mendoza** → hoy 2 locales activos
- **Descriptor propio:** «¡Almacén de picadas! Carnes, mariscos, pizzas, empanadas, comida mexicana, delicias alemanas… ¡y mucho más!»

### 3.2 Sucursales
**MAR DEL PLATA (casa matriz)**
- Dirección: Olavarría 3325, B7602 Mar del Plata (barrio Güemes)
- Geo: -38.018553, -57.545644
- Tel/Reservas: +54 223 654-7977 · WhatsApp: +54 223 635-7854
- Google: **4,4★ · 5.093 reseñas**
- Horarios: Lun–Sáb 12:00–01:30 · Dom 18:00–01:30 *(Instagram dice "desde 10:00" — dejar el dato en un archivo de config editable)*
- Instagram: @chepicadasmdp (46K) · Facebook: /chepicadas.mardelplata
- Delivery: Rappi + propio (19–21 h)

**MENDOZA**
- Dirección: Arístides Villanueva 284, M5500 Ciudad de Mendoza
- Geo: -32.892660, -68.854502
- Tel: +54 261 418-4052
- Google: **4,3★ · 11.529 reseñas**
- Horarios: todos los días 12:00–01:00
- Instagram: @chepicadasmendoza (112K)
- Diferenciales: terraza, azotea con vista, patio de juegos, pet friendly, accesible, carne a la llama (asador), menú infantil
- Mecánica comercial: **menú de dos pasos** — picada de entrada GRATIS + tabla principal a elección entre 11 opciones (para 2, 3 o 4 personas)

**Prueba social combinada: 16.600+ reseñas de Google, promedio 4,3★+**

### 3.3 Carta (estructura y precios de referencia jul-2026, ARS)
La picada de la casa tiene **dos partes**: fría (hasta 14 fiambres: jamón cocido, crudo serrano/ibérico, bondiola, lomo ahumado, matambre casero, panceta ahumada, mortadela, milán, cantimpalo, salamines, longanizas + 6 quesos: pategrás, roquefort, gouda, fontina, sardo, saborizados + ensalada rusa, aceitunas, frutos secos) y **caliente** (cazuela de chorizo a la pomarola, albóndigas al fileto, salchicha parrillera con tuco, tortilla de papa).

| Plato | Porción | Precio ref. |
|---|---|---|
| Picada Clásica | 2 pers. | $30.000 |
| Picada Che | 2 pers. | $35.000 |
| Picada 21 Platitos (fría + caliente) | 2 pers. | $28.000 |
| Picada Argentina (+ empanadas) | 2 pers. | $42.000 |
| Picada Marina (cazuela de mariscos, gambas al ajillo, mejillones a la provenzal) | 2 pers. | consultar |
| Menú Criolla (parrilla completa) | 2 pers. | $35.000 |
| Costillar a la llama c/ papas | 1 porción | $23.000 |
| Parrilla para compartir | 2 pers. | $42.000 |
| Tabla Mexicana | 4 pers. | $45.000 |
| Combo Burger | 2 pers. | $40.000 |
| ½ kg Picada Che | ½ kg | $40.300 |

Categorías completas: Picadas · Parrilla y carne a la llama · Pizzas · Empanadas · Milanesas (la "mila gigante") · Mariscos y cazuelas · Rabas · Lomitos · Hamburguesas · Mexicana · Delicias alemanas · Vegetariano/Vegano · Menú infantil · Postres (torta de chocolate, flan).
Bebidas: cervezas artesanales, nacionales, internacionales y **saborizadas** (muy elogiadas) · vinos · tragos · limonada · **happy hour 2x1**.
Cortesías de la casa: antipasto con pan casero (MdP) / picada de entrada gratis (Mza).

### 3.4 Sistema visual (propuesta validable, derivada de la estética real del local)
```css
:root {
  --rojo-bodegon:   #B5262C;  /* primario: titulares, botones, marca */
  --rojo-oscuro:    #8E1D22;  /* hover, strong */
  --crema:          #F2E4C9;  /* fondo general, papel viejo */
  --hueso:          #FBF7F0;  /* tarjetas, superficies */
  --mostaza:        #E0A526;  /* acentos, banderines — NUNCA con texto blanco encima */
  --madera:         #3A2A20;  /* texto, footer, estructura */
  --verde-botella:  #2F5D50;  /* bebidas, links, equilibrio */
  --celeste-arg:    #74ACDF;  /* guiño argentino, uso puntual */
}
```
Contrastes verificados: `--madera` sobre `--crema` = 9.8:1 (AAA) · `--hueso` sobre `--rojo-bodegon` = 5.9:1 (AA).
**Tipografía:** títulos en display condensada estilo cartelería de almacén (Google Fonts sugeridas: "Alfa Slab One" o "Bowlby One SC" para el nombre; "Oswald" para headings); cuerpo en sans humanista ("Work Sans" o "Inter"). Nada de fileteado literal.
**Texturas:** fondos con grano de papel/madera sutiles (CSS o SVG inline, no imágenes pesadas). Bordes tipo cartel enlozado en tarjetas destacadas.

---

## 4. INVARIANTES — NO NEGOCIABLES

Cada uno protege un hallazgo de la investigación. Violarlos es fallar el proyecto.

1. **INV-01 — El local antes que el plato.** El hero del home muestra el interior del almacén (banderines, antigüedades), no un plato en primer plano. Es el único activo que la competencia no puede copiar.
2. **INV-02 — Estética bodegón, no minimalismo.** Prohibido el look "restaurante moderno blanco con serif elegante". Textura, calidez y color según el sistema visual. La limpieza va en la navegación y la jerarquía, no en despojar la identidad.
3. **INV-03 — "La picada para 2 la comen 3"** aparece textual y prominente en el home. Es el mejor copy que existe y no se reescribe.
4. **INV-04 — La 21 Platitos es la reina.** La picada de 21 platitos tiene tratamiento destacado propio (sección o card hero en la carta) con su relato histórico: tradición marplatense desde los años 50.
5. **INV-05 — Fotografía honesta.** La crítica más dañina detectada en reseñas es la brecha foto-del-menú vs. plato-real. Ninguna imagen de stock de comida. Donde falte foto real, va placeholder gris con etiqueta `[FOTO REAL PENDIENTE: descripción]`.
6. **INV-06 — Selector de sede persistente.** MdP y Mendoza tienen teléfonos, horarios, carta y diferenciales distintos. El selector vive en el header, se persiste en `localStorage` y condiciona teléfono, WhatsApp, horarios, mapa y carta en todo el sitio.
7. **INV-07 — Prueba social real.** Solo el dato verificado: "Más de 16.600 reseñas en Google · 4,3★ promedio". Prohibido inventar testimonios; si se citan reseñas, son las reales de la investigación con atribución genérica ("Reseña de Google, 2024").
8. **INV-08 — SEO indexable.** El sitio actual de la marca bloquea rastreo y por eso compite contra terceros (uno publica un 2,6★ falso). El nuevo sitio nace 100% indexable: robots.txt abierto, sitemap.xml, JSON-LD `Restaurant` por sede.
9. **INV-09 — Mobile first real.** El caso de uso dominante: alguien parado en la Arístides o en Güemes decidiendo dónde entrar. WhatsApp flotante, "Cómo llegar" e indicador Abierto/Cerrado a un toque.
10. **INV-10 — Tono de voz** rioplatense, directo, con humor seco, trato de vos. Nunca solemne, nunca gourmet, nunca corporativo.
11. **INV-11 — Precios editables, no hardcodeados.** Argentina tiene inflación: todos los precios viven en `data/menu.json` y se renderizan desde ahí, con leyenda "precios de referencia — consultá en el local".

---

## 5. STACK Y ARQUITECTURA TÉCNICA

### 5.1 Stack
- **Node.js ≥ 20 + Express** como servidor. Sin frameworks frontend (no React/Vue): HTML semántico + CSS moderno + JS vanilla (ES modules).
- Motor de plantillas **EJS** para partials (header, footer, selector de sede) y para inyectar los JSON de datos en cada página — así hay navegación multipágina real con URLs propias, no una SPA.
- Sin base de datos: los datos viven en JSON versionados.
- Dependencias máximas permitidas: `express`, `ejs`, `compression`, `helmet`. Nada más.

### 5.2 Estructura de proyecto
```
chepicadas-web/
├── server.js                  # Express: rutas, compresión, headers, 404
├── package.json
├── data/
│   ├── config.json            # marca, redes, flags (ej: horario IG vs Google)
│   ├── sucursales.json        # las 2 sedes: geo, tel, horarios, features
│   └── menu.json              # carta completa por sede, precios editables
├── views/
│   ├── partials/
│   │   ├── head.ejs           # meta, OG, JSON-LD dinámico por página
│   │   ├── header.ejs         # nav + selector de sede
│   │   ├── footer.ejs
│   │   └── whatsapp-float.ejs
│   ├── index.ejs              # Home
│   ├── carta.ejs              # La Carta
│   ├── historia.ejs           # Nuestra Historia
│   ├── sucursales.ejs         # Las dos casas
│   ├── reservas.ejs           # Reservas / contacto
│   └── 404.ejs
├── public/
│   ├── css/
│   │   ├── tokens.css         # variables del sistema visual
│   │   ├── base.css           # reset, tipografía, layout
│   │   └── components.css     # cards, botones, banderines, nav
│   ├── js/
│   │   ├── sede.js            # selector de sede + localStorage + eventos
│   │   ├── horarios.js        # cálculo Abierto/Cerrado con TZ America/Argentina
│   │   └── main.js            # nav mobile, lazy galería, scroll suave
│   ├── img/                   # solo placeholders etiquetados + SVG propios
│   ├── favicon.svg
│   ├── robots.txt             # User-agent: * / Allow: /
│   └── sitemap.xml
└── README.md                  # cómo correr, cómo editar precios, deploy
```

### 5.3 Rutas Express
| Ruta | Vista | Título SEO |
|---|---|---|
| `GET /` | index | Che Picadas — Almacén de picadas desde 2004 · Mar del Plata y Mendoza |
| `GET /carta` | carta | La Carta — Picadas, parrilla y más · Che Picadas |
| `GET /historia` | historia | Nuestra Historia — La picada de 21 platitos · Che Picadas |
| `GET /sucursales` | sucursales | Sucursales — Güemes (MdP) y Arístides (Mza) · Che Picadas |
| `GET /reservas` | reservas | Reservá tu mesa · Che Picadas |
| `*` | 404 | — |

---

## 6. BACKLOG DE TAREAS

### TASK-01 [P0] — Scaffolding y servidor
Inicializar proyecto, `server.js` con Express + EJS + `compression` + `helmet` (CSP que permita Google Maps embed y Google Fonts), servido de `/public` como estático con cache headers, ruta 404. Cargar los 3 JSON de `data/` al arrancar y pasarlos a las vistas.
**Aceptación:** `npm start` levanta en :3000, las 5 rutas responden 200, ruta inexistente responde 404 con la vista.

### TASK-02 [P0] — Datos
Crear `data/sucursales.json` y `data/menu.json` con TODOS los datos de la sección 3 (copiar literal). `data/config.json` con redes, textos legales y el flag `horarioFuente: "google"`.
**Aceptación:** ningún dato de negocio hardcodeado en vistas ni JS; `grep -r "654-7977" views/ public/js/` devuelve 0 (solo aparece en data/).

### TASK-03 [P0] — Sistema visual
`tokens.css` con las variables de la sección 3.4, `base.css` con tipografía (Google Fonts con `preconnect` + `display=swap`), grilla fluida, y textura de papel sutil como `background` del `body` (SVG inline en CSS, < 2 KB). `components.css`: botón primario (rojo/hueso), botón fantasma, card enlozada (borde doble + sombra corta), cinta de banderines decorativa en CSS puro para separadores de sección.
**Aceptación:** página demo de componentes accesible en dev; contraste AA verificado en todos los pares de color usados.

### TASK-04 [P0] — Header + selector de sede + WhatsApp flotante
Header sticky con logo placeholder (`[LOGO SVG PENDIENTE]`), nav de 5 ítems, y el **selector MdP/Mendoza** como toggle visible. `sede.js`: persiste en `localStorage`, emite evento `sede:change`; todos los componentes dependientes (tel, WhatsApp, horarios, mapa, precios) escuchan y se actualizan sin recargar. Botón flotante de WhatsApp con el número de la sede activa. Nav mobile con menú hamburguesa accesible (`aria-expanded`, focus trap).
**Aceptación:** cambiar de sede actualiza teléfono del footer, link de WhatsApp y horarios en cualquier página; la elección sobrevive a la recarga.

### TASK-05 [P0] — Home
Estructura y copy exactos:
1. **Hero:** imagen full-bleed del interior `[FOTO REAL PENDIENTE: interior con banderines]` + H1 **«La picada es para dos. Comen tres.»** + subtítulo «Almacén de picadas desde 2004. Mar del Plata y Mendoza.» + CTA doble: *Reservar mesa* / *Ver la carta*.
2. **Barra de prueba social:** «Más de 16.600 reseñas en Google · ★ 4,3 promedio» + indicador **Abierto ahora / Cerrado** calculado en vivo (`horarios.js`, TZ `America/Argentina/Buenos_Aires`).
3. **La 21 Platitos:** card hero con relato corto (tradición desde los años 50) y link a /historia.
4. **Cómo funciona (Mendoza) / La casa (MdP):** bloque condicionado por sede — en Mza explica el menú de dos pasos con picada gratis; en MdP presenta el almacén.
5. **Destacados de carta:** 4 cards desde `menu.json`.
6. **El almacén:** galería 6 placeholders etiquetados del espacio retro.
7. **CTA final:** Reservar + Cómo llegar (link a Google Maps con geo de la sede activa).
**Aceptación:** Lighthouse mobile ≥ 90 en Performance y ≥ 95 en Accessibility/SEO/Best Practices con placeholders.

### TASK-06 [P1] — La Carta
Render completo desde `menu.json`, filtrado por sede activa. Secciones ancladas con nav interna sticky. La picada explicada visualmente: dos columnas «Parte fría / Parte caliente». Chips de dieta (vegetariano, infantil). Leyenda fija: «Precios de referencia — consultá en el local». Botón «Descargar carta (PDF)» apuntando a `/carta.pdf` como placeholder documentado en README.
**Aceptación:** cambiar sede cambia platos/precios sin recarga; nav interna funciona con scroll suave y `scroll-margin-top`.

### TASK-07 [P1] — Nuestra Historia
Línea de tiempo vertical con hitos: años 50 (nace la tradición de la 21 platitos en Mar del Plata) → fotos de actores de los 60/70 con la picada `[FOTO HISTÓRICA PENDIENTE — pedir al cliente]` → 2004 la esquina de San Lorenzo y Olavarría → el almacén y sus banderines → 2020 Mendoza → hoy. Cierre con el bloque de famosos recientes (Matías Alé, Patricia Sosa, L-Gante, La K'onga) como texto sobrio, sin fotos de terceros.
**Aceptación:** la página funciona y emociona solo con texto + placeholders; cero imágenes con derechos de terceros.

### TASK-08 [P1] — Sucursales
Una sección por sede (las dos visibles, la activa primero): mapa de Google embebido (iframe lazy con `loading="lazy"` y fachada de imagen estática clickeable para no penalizar LCP), dirección, horarios completos, indicador Abierto/Cerrado, teléfono clickeable `tel:`, WhatsApp `wa.me`, features (terraza, patio de juegos, pet friendly…), botón «Cómo llegar».
**Aceptación:** los iframes no cargan hasta interacción o viewport; datos 100% desde JSON.

### TASK-09 [P1] — Reservas
Sin backend de reservas en v1: formulario (nombre, sede, fecha, hora, personas, tel) que al enviar **compone un mensaje de WhatsApp prellenado** al número de la sede elegida (`wa.me/<num>?text=...` URL-encoded). Validación nativa + JS. Alternativa visible: llamar directo.
**Aceptación:** el mensaje llega bien formateado con todos los campos; sin datos personales en query strings del propio sitio (solo en el deep-link a WhatsApp que el usuario dispara).

### TASK-10 [P1] — SEO técnico
`head.ejs` dinámico: title/description únicos por página, OG + Twitter cards, canonical. **JSON-LD `Restaurant`** por sede (name, address, geo, telephone, openingHoursSpecification, servesCuisine, aggregateRating con los datos reales de Google, menu → /carta). `robots.txt` abierto, `sitemap.xml` con las 5 URLs. Breadcrumbs JSON-LD en páginas internas.
**Aceptación:** validación sin errores en Rich Results Test (estructura), `curl /robots.txt` muestra Allow all.

### TASK-11 [P2] — Performance y accesibilidad final
Imágenes en `<picture>` con WebP + fallback, `width/height` explícitos (CLS ≈ 0), fuentes con `font-display: swap`, CSS crítico inline para el above-the-fold del home, `prefers-reduced-motion` respetado en todas las animaciones (banderines incluidos), focus visible custom coherente con la paleta.
**Aceptación:** Lighthouse mobile ≥ 90/95/95/95; navegable 100% por teclado.

### TASK-12 [P2] — README de entrega
Cómo correr (`npm i && npm start`), cómo editar precios (menu.json), cómo cambiar horarios (sucursales.json), lista de TODOS los placeholders pendientes con su descripción, y checklist de assets a pedir al cliente: logo SVG, colores oficiales, fotos reales de interior/platos, fotos históricas de la 21 platitos, carta PDF oficial.
**Aceptación:** una persona no técnica puede actualizar un precio siguiendo el README.

---

## 7. DEFINITION OF DONE (global)

- [ ] `npm start` levanta el sitio completo sin errores ni warnings
- [ ] Las 5 páginas navegables entre sí; 404 con diseño propio
- [ ] `grep -ri "lorem" views/ public/` → 0 resultados
- [ ] `grep -ri "unsplash\|pexels\|stock" views/ public/` → 0 resultados
- [ ] Ningún precio ni teléfono hardcodeado fuera de `data/`
- [ ] Selector de sede persiste y actualiza tel/horarios/carta/mapa en las 5 páginas
- [ ] Indicador Abierto/Cerrado correcto para ambas sedes en TZ argentina
- [ ] JSON-LD válido por sede; robots.txt abierto; sitemap presente
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Todos los placeholders visibles llevan etiqueta `[... PENDIENTE]`
- [ ] Copy en rioplatense con voseo consistente en todo el sitio; "La picada es para dos. Comen tres." presente en el home

---

## 8. RESTRICCIONES

1. **No inventes nada:** ni testimonios, ni premios, ni fotos, ni datos históricos que no estén en la sección 3. Placeholder etiquetado siempre antes que invento.
2. **No uses imágenes de stock** ni descargues fotos de terceros (Google Maps, TikTok, Rappi): tienen derechos. Solo SVG propios y placeholders.
3. **No introduzcas frameworks pesados** (React, Vue, Tailwind, jQuery, Bootstrap). El presupuesto de JS del sitio completo es < 30 KB minificado.
4. **No hagas SPA:** navegación multipágina real con URLs propias renderizadas por Express/EJS.
5. **No pongas datos personales en URLs** del propio sitio; el único deep-link con datos es el de WhatsApp que dispara el usuario.
6. **No publiques el 2,6★ de carta.menu** ni ningún dato marcado como no confiable; la prueba social usa exclusivamente los números de Google.
7. **Mantené el tono:** cada texto que escribas debe sonar a bodegón argentino, no a agencia. Ante la duda, más corto y más directo.
8. Commits atómicos con convención (`feat: TASK-05 home hero`, etc.); un commit por tarea como mínimo.

---

*Fin del prompt. Ejecutá TASK-01 y avanzá en orden.*
