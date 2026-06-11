# 🔍 Revisión Técnica Completa — macOS Portfolio

> Auditoría a fondo del proyecto: bugs, performance, accesibilidad, calidad de código,
> arquitectura y configuración. Cada hallazgo incluye **ubicación**, **por qué importa**
> (razón técnica) y **solución propuesta**.
>
> Fecha: 2026-06-11 · Alcance: `src/` completo + config · ~2080 LOC, 21 archivos.

---

## 📊 Resumen ejecutivo

El proyecto está **sano de base**: stack moderno (React 19, Vite 7, Tailwind 4, Zustand 5 + Immer),
estructura por dominios (`components`, `windows`, `store`, `hoc`, `constants`) y un `ARCHITECTURE.md`
serio. No hay deuda técnica grave ni dependencias obsoletas.

Pero hay **un anti-patrón de performance que atraviesa casi todo el código** (Zustand sin selectores),
**dos bugs reales** (sincronización de tema y guarda faltante en el store) y un conjunto de mejoras de
**accesibilidad** y **organización** que separan un proyecto "de tutorial" de uno "de portafolio profesional".

### Tabla de prioridades

| #  | Severidad | Categoría        | Hallazgo                                                      |
|----|-----------|------------------|--------------------------------------------------------------|
| 1  | 🔴 Alta   | Performance      | Zustand sin selectores → re-renders globales                 |
| 2  | 🔴 Alta   | Bug              | Tema del sistema no sincroniza el estado de React            |
| 3  | 🟠 Media  | Bug              | `focusWindow` sin guarda de key inválida                     |
| 4  | 🟠 Media  | Performance      | Todas las ventanas montadas siempre (incl. react-pdf)        |
| 5  | 🟠 Media  | Accesibilidad    | Elementos clickables sin semántica ni teclado               |
| 6  | 🟠 Media  | Arquitectura     | `react-pdf` worker cargado desde CDN externo (unpkg)        |
| 7  | 🟡 Baja   | Datos            | IDs duplicados en `WORK_LOCATION`                            |
| 8  | 🟡 Baja   | Organización     | `constants/index.js` (438 líneas) mezcla dominios           |
| 9  | 🟡 Baja   | Calidad          | `console.log`, código muerto, `key={index}`, PropTypes      |
| 10 | 🟡 Baja   | Arquitectura     | `WindowWrapper` gestiona `display` por dos vías              |
| 11 | 🟡 Baja   | Config/DX        | Mismatch alias vite/jsconfig, `node_modules` ausente        |

---

## 📐 Línea base — lint & build (post-migración a pnpm)

Gestor de paquetes migrado a **pnpm 11.5.0** (`pnpm-lock.yaml`, `packageManager` fijado,
`esbuild` aprobado en `pnpm-workspace.yaml`).

**`pnpm run build` → ✅ pasa** (2.02s, 1771 módulos). Pero:
- ⚠️ **Bundle de 822 kB (261 kB gzip) en un solo chunk** — supera el límite de 500 kB de Vite.
  Principales sospechosos: `react-pdf`/`pdfjs` y `gsap`. Refuerza el hallazgo **#4**: con
  `React.lazy` + `Suspense` para las ventanas pesadas (Resume, Gallery) el chunk inicial baja
  fuerte. **Esto es lo que ve el visitante: menos JS inicial = carga más rápida.**

**`pnpm run lint` → ❌ 2 errores** (línea base a resolver):
- `ThemeContext.jsx:68` → `react-refresh/only-export-components`: el archivo exporta el componente
  `ThemeProvider` **y** el hook `useTheme`. Fix: mover `useTheme` (y/o el contexto) a su propio archivo.
  Encaja con el refactor del hallazgo **#2**.
- `Image.jsx:15` → `react-hooks/set-state-in-effect`: `setState` síncrono dentro de un `useEffect`
  dispara renders en cascada. Fix: derivar el estado o resetear vía `key` en vez de efecto. **Nuevo
  sub-hallazgo de calidad** (no estaba en la lectura inicial; lo cazó el linter).

---

## 🔴 1. Performance — Zustand sin selectores (el problema principal)

**Ubicación:** transversal. Ejemplos:
- `src/hoc/WindowWrapper.jsx:9` → `const { focusWindow, windows } = useWindowStore();`
- `src/components/Dock.jsx:13` → `const { openWindow, closeWindow, windows } = useWindowStore();`
- `src/windows/Text.jsx:6`, `Image.jsx:7`, `Gallery.jsx:9`, `Finder.jsx:10`
- `src/components/WindowControls.jsx:5`, `NavBar.jsx:10`, `Home.jsx:15-16`

**Por qué importa (técnico):**
`useWindowStore()` sin argumento suscribe al componente al **objeto store completo**. Zustand notifica
a TODO suscriptor en cada `set()`. Resultado: abrir, cerrar o enfocar **una** ventana dispara un
re-render de **todas** las ventanas, el Dock, los controles y la NavBar — aunque su estado no haya cambiado.
En este proyecto el efecto se nota especialmente al arrastrar (drag) y enfocar ventanas.

**Solución propuesta:**
Suscribirse solo a la porción de estado que cada componente usa, con selectores:

```js
// ❌ Antes
const { focusWindow, windows } = useWindowStore();
const { isOpen, zIndex } = windows[windowKey];

// ✅ Después
const focusWindow = useWindowStore((s) => s.focusWindow);
const isOpen     = useWindowStore((s) => s.windows[windowKey].isOpen);
const zIndex     = useWindowStore((s) => s.windows[windowKey].zIndex);
```

Para seleccionar varios campos a la vez sin romper la igualdad referencial, usar `useShallow`:

```js
import { useShallow } from "zustand/react/shallow";
const { openWindow, closeWindow } = useWindowStore(
  useShallow((s) => ({ openWindow: s.openWindow, closeWindow: s.closeWindow }))
);
```

> **Concepto:** las acciones (`openWindow`, etc.) son estables — se pueden seleccionar una por una sin
> `useShallow`. `useShallow` es solo para cuando agrupás varios valores en un objeto nuevo.

---

## 🔴 2. Bug — el tema del sistema no sincroniza el estado de React

**Ubicación:** `src/context/ThemeContext.jsx:36-42`

**Por qué importa (técnico):**
Cuando el usuario está en modo `'system'` y el SO cambia de claro a oscuro, el handler `handleChange`
actualiza la **clase del DOM** a mano (`root.classList.add(...)`) pero **no toca el estado de React**.
Como `theme` sigue siendo `'system'`, el `useMemo` del contexto no se recalcula y los valores
`effectiveTheme`, `isDark`, `isLight` quedan **stale**. Cualquier componente que decida render según
`isDark` (en lugar de solo clases CSS) mostrará el valor viejo hasta el próximo render por otra causa.

**Solución propuesta:**
Modelar el tema efectivo como **estado derivado reactivo**, no manipular el DOM por fuera de React.
Guardar el `systemTheme` en estado y recalcular:

```js
const [systemTheme, setSystemTheme] = useState(() =>
  globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);

useEffect(() => {
  const mq = globalThis.matchMedia('(prefers-color-scheme: dark)');
  const onChange = (e) => setSystemTheme(e.matches ? 'dark' : 'light');
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}, []);

const effectiveTheme = theme === 'system' ? systemTheme : theme;
// Un único useEffect aplica la clase al DOM cuando effectiveTheme cambia.
```

Así el cambio de tema del sistema **sí** re-renderiza y mantiene `isDark` correcto.

---

## 🟠 3. Bug — `focusWindow` sin guarda de key inválida

**Ubicación:** `src/store/window.js:28-31`

**Por qué importa:** `openWindow` y `closeWindow` tienen `if (!win) return;`, pero `focusWindow` no.
Si se llama con una key inexistente, `win.zIndex = ...` lanza `TypeError`. Es una inconsistencia que rompe
la invariante del store.

**Solución propuesta:**
```js
focusWindow: (windowKey) => set((state) => {
  const win = state.windows[windowKey];
  if (!win) return;
  win.zIndex = state.nextZIndex++;
}),
```

---

## 🟠 4. Performance — todas las ventanas montadas permanentemente

**Ubicación:** `src/App.jsx:14-22` (12 componentes montados de entrada) + `src/windows/Resume.jsx:55`

**Por qué importa (técnico):**
`WindowWrapper` oculta las ventanas con `display: none`, pero **el componente sigue montado y ejecuta
sus efectos**. El caso más caro es `Resume`: monta `<Document file={fileUrl}>` de `react-pdf` aunque la
ventana esté cerrada, lo que **dispara la carga del PDF y del worker** al arrancar la app, no cuando el
usuario abre el CV. Multiplicado por todas las ventanas, hay trabajo y memoria que no se usan.

**Solución propuesta (incremental):**
- Mínimo: renderizar el contenido pesado solo cuando `isOpen` (montaje perezoso del `<Document>`).
- Ideal: que `WindowWrapper` no renderice el `<Component />` si nunca se abrió, o usar `React.lazy` +
  `Suspense` para las ventanas más pesadas (Resume con react-pdf, Gallery).

> No es urgente como el #1, pero es la diferencia entre "carga todo por las dudas" y "carga lo que el
> usuario pide".

---

## 🟠 5. Accesibilidad — clickables sin semántica ni teclado

**Ubicación:**
- `src/windows/Gallery.jsx:128` → `<div onClick=...>` para abrir imagen
- `src/windows/Finder.jsx:18-27, 61-70` → `<li onClick=...>`
- `src/components/Home.jsx:56-63` → `<li onClick=...>`
- `src/components/NavBar.jsx:37-44` → `<li onClick=...>` para abrir ventanas

**Por qué importa (técnico):**
`onClick` sobre `<div>`/`<li>` **no es accesible**: no recibe foco con `Tab`, no responde a `Enter`/`Space`,
y un lector de pantalla no lo anuncia como interactivo. El Dock ya lo hace bien (usa `<button>` con
`aria-label`/`aria-pressed`) — hay que llevar ese estándar al resto.

**Solución propuesta:**
- Para acciones (abrir ventana, seleccionar): usar `<button type="button">`.
- Para navegación externa (links de proyectos): usar `<a href>`.
- Donde el layout obligue a un contenedor no-botón, agregar `role="button"`, `tabIndex={0}` y handler
  de teclado — pero la opción correcta casi siempre es el elemento semántico real.

---

## 🟠 6. Arquitectura — worker de react-pdf desde CDN externo

**Ubicación:** `src/windows/Resume.jsx:9`

```js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
```

**Por qué importa:** El render del CV depende de una **request a unpkg en runtime**. Si unpkg está caído,
hay bloqueo de red/CSP, o el usuario está offline, el CV no renderiza. Además acopla la app a una versión
remota. La alternativa local ya está **comentada justo debajo** (líneas 10-13).

**Solución propuesta:** Usar el worker empaquetado por Vite (la versión comentada con `new URL(...)`),
así queda bajo tu control y versionado con el bundle.

---

## 🟡 7. Datos — IDs duplicados en `WORK_LOCATION`

**Ubicación:** `src/constants/index.js:267` (folder "Proyecto 1", `id: 5`) y `:304` ("Design.fig", `id: 5`).

**Por qué importa:** Ambos `id: 5` conviven en el árbol del filesystem simulado. Hoy no colisionan como
`key` de React porque están en niveles distintos del map, pero es frágil: cualquier refactor que los
aplane reventaría el reconciliador. Los IDs de un dataset deberían ser únicos por intención.

**Solución propuesta:** Reasignar IDs únicos (o usar un esquema `parent-child` estable). Revisar también
`navLinks` (`constants/index.js:1-17`), que salta de `id: 1` a `id: 3` sin `id: 2` — inofensivo, pero
delata edición manual sin criterio.

---

## 🟡 8. Organización — `constants/index.js` mezcla dominios (438 líneas)

**Ubicación:** `src/constants/index.js` completo.

**Por qué importa:** Un único archivo concentra: links de nav, iconos, apps del dock, showcase de Java,
stack técnico, redes, álbumes, galería, **el filesystem simulado completo** y la config de ventanas.
Encima exporta en **dos bloques separados** (`:246` y `:419/:439`). Es difícil de navegar y todo lo que
importe *una* constante arrastra el módulo entero.

**Solución propuesta:** Separar por dominio dentro de `src/constants/`:
```
constants/
  nav.js          → navLinks, navIcons
  dock.js         → dockApps
  filesystem.js   → locations (work/about/resume/trash)
  windows.js      → INITIAL_Z_INDEX, WINDOW_CONFIG
  showcase.js     → javaShowcase, techStack
  social.js       → socials, photosLinks, gallery
  index.js        → re-exporta todo (barrel)
```

---

## 🟡 9. Calidad de código — detalles que suman

| Sub | Ubicación | Problema | Fix |
|-----|-----------|----------|-----|
| 9a | `src/components/Dock.jsx:71` | `console.log` de debug en producción | Quitar |
| 9b | `src/components/Welcome.jsx:104-109`, `Resume.jsx:10-13` | Código comentado muerto | Borrar (está en git) |
| 9c | `src/windows/Terminal.jsx:35`, `Welcome.jsx:14` | `key={i}` con índice | Usar key estable (el valor) |
| 9d | `src/components/WindowControls.jsx` | Recibe `target` sin `propTypes` | Agregar `propTypes` (el proyecto ya los usa en `ThemeToggle`/`ThemeContext`) |
| 9e | Varios | Mezcla `const X = () =>` y `function X()` | Elegir un estilo y unificar |

**Por qué importa:** Ninguno rompe nada solo, pero juntos son la diferencia entre código "que funciona"
y código "que se mantiene". `key={index}` puede causar bugs sutiles de estado si la lista se reordena;
los PropTypes faltantes rompen la consistencia que vos mismo ya estableciste.

---

## 🟡 10. Arquitectura — `WindowWrapper` gestiona `display` por dos vías

**Ubicación:** `src/hoc/WindowWrapper.jsx:18` (dentro de `useGSAP`) y `:53-57` (`useLayoutEffect`).

**Por qué importa:** El `display` del elemento se setea tanto en la animación de entrada (`element.style.display = "block"`)
como en un `useLayoutEffect` aparte. Dos fuentes de verdad para la misma propiedad = propenso a
desincronizarse. Además el HOC mezcla 3 responsabilidades (animación, draggable, visibilidad).

**Solución propuesta:** Unificar el control de `display` en un solo lugar y considerar extraer la lógica a
hooks (`useWindowDrag`, `useWindowEntrance`) que el HOC componga. Mejora testeabilidad y lectura.

---

## 🟡 11. Config / DX

- **`node_modules` ausente:** ni lint ni build corren. Primer paso de cualquier trabajo: `npm install`.
- **Alias duplicados:** `vite.config.js` define `#components`, `#constants`, `#store`, `#hoc`, `#windows`
  uno por uno, mientras `jsconfig.json` usa el genérico `#*: src/*`. Funcionan, pero conviene una sola
  fuente: el patrón `#*` en vite también (menos mantenimiento al agregar carpetas).
- **ESLint:** `ecmaVersion: 2020` en `languageOptions` vs `latest` en `parserOptions` — alinear a `latest`.

---

## 🗺️ Plan de acción sugerido (orden recomendado)

1. **`npm install`** + verificar que `npm run lint` y `npm run build` pasan (línea base).
2. **#1 Selectores de Zustand** — mayor impacto/esfuerzo, toca varios archivos pero es mecánico.
3. **#2 y #3 Bugs** (tema del sistema + guarda de `focusWindow`) — correctitud.
4. **#5 Accesibilidad** — convertir clickables a `<button>`/`<a>`.
5. **#4 y #6 Performance/red** (montaje perezoso + worker local).
6. **#8 Reorganizar constants** + **#9 limpieza** (console.log, código muerto, propTypes).
7. **#10 Refactor de `WindowWrapper`** + **#11 config** — pulido final.

> Cada paso es un commit (o PR) independiente y verificable. Nada de un "big bang" que rompa todo junto.
