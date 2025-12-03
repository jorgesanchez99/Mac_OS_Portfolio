# Sistema de Temas - Documentación

## Configuración completada ✅

El sistema de temas está completamente configurado y listo para usar. Soporta tres modos:
- **Light**: Tema claro
- **Dark**: Tema oscuro  
- **System** (por defecto): Sigue la preferencia del sistema operativo

## Cómo usar

### 1. Usar el hook useTheme en cualquier componente

```jsx
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { theme, setTheme, isDark, isLight, effectiveTheme } = useTheme();
  
  return (
    <div>
      <p>Tema actual: {theme}</p>
      <p>Tema efectivo: {effectiveTheme}</p>
      <p>¿Es oscuro?: {isDark ? 'Sí' : 'No'}</p>
      
      <button onClick={() => setTheme('light')}>Claro</button>
      <button onClick={() => setTheme('dark')}>Oscuro</button>
      <button onClick={() => setTheme('system')}>Sistema</button>
    </div>
  );
};
```

### 2. Usar clases dark: de Tailwind

Puedes usar el prefijo `dark:` en cualquier clase de Tailwind:

```jsx
// Ejemplo básico
<div className="bg-white dark:bg-gray-900">
  <p className="text-black dark:text-white">Texto adaptable</p>
</div>

// Ejemplo con hover y dark
<button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
  Botón
</button>

// Ejemplo con borders
<div className="border border-gray-200 dark:border-gray-700">
  Contenido
</div>

// Ejemplo con backdrop
<nav className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
  Navegación
</nav>
```

### 3. Variables CSS personalizadas

En `src/index.css` hay variables definidas que puedes usar:

```css
/* Disponibles en light y dark mode */
--color-bg-primary
--color-bg-secondary
--color-text-primary
--color-text-secondary
--color-border
```

Usar en componentes:

```jsx
<div className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
  Contenido
</div>
```

### 4. Componente ThemeToggle

Ya está integrado en el NavBar (visible solo en desktop lg+). También puedes usarlo en otros lugares:

```jsx
import { ThemeToggle } from '#components';

const Settings = () => {
  return (
    <div>
      <h2>Configuración</h2>
      <ThemeToggle />
    </div>
  );
};
```

## Ejemplos de componentes adaptables

### Ventana Modal
```jsx
const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="text-gray-900 dark:text-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};
```

### Card
```jsx
const Card = ({ title, content }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="p-4 text-gray-600 dark:text-gray-300">
        {content}
      </div>
    </div>
  );
};
```

### Input
```jsx
const Input = (props) => {
  return (
    <input
      {...props}
      className="
        w-full px-4 py-2 rounded-lg
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-white
        border border-gray-300 dark:border-gray-600
        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        placeholder-gray-400 dark:placeholder-gray-500
      "
    />
  );
};
```

## Persistencia

El tema seleccionado se guarda automáticamente en `localStorage` y se restaura al recargar la página.

## Detección del tema del sistema

Cuando está en modo "system", el tema cambia automáticamente si el usuario cambia la preferencia de su sistema operativo (sin necesidad de recargar la página).

## Transiciones suaves

Las transiciones entre temas están configuradas con:
```css
transition: background-color 0.3s ease;
```

Puedes agregar más propiedades animadas según necesites.

## Tips

1. **Usa siempre pares**: Si defines `bg-white`, define también `dark:bg-gray-900`
2. **Prueba con ambos temas**: Siempre verifica que tu UI se vea bien en ambos modos
3. **Contraste**: Asegúrate de que el texto tenga buen contraste en ambos temas
4. **Imágenes**: Considera usar `filter` o diferentes imágenes para dark mode
5. **Opacidad**: Los valores con opacidad (`/50`, `/70`) funcionan bien en ambos temas

## Personalización adicional

Para agregar más variables de tema, edita `src/index.css`:

```css
@theme {
  --color-custom: #your-light-color;
}

@theme dark {
  --color-custom: #your-dark-color;
}
```

Luego úsalas con `bg-[var(--color-custom)]`.

