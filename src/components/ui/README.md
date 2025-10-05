# UI Components

Esta carpeta contiene componentes UI reutilizables para el portfolio.

## HologramModal

Un componente modal genérico con efectos holográficos de Star Wars. Completamente reutilizable mediante slots y props.

### Características

- 🎬 **Animaciones avanzadas**: Entrada/salida con efectos de holograma, glitch y materialización
- 🎨 **Slots flexibles**: Header, content y footer personalizables
- ⚙️ **Props configurables**: Título, clasificación, estado, texto del footer
- 🔧 **Efectos opcionales**: Text scramble, indicador de estado, etc.
- 🎯 **Reutilizable**: Puede usarse para cualquier tipo de contenido modal

### Uso Básico

```vue
<template>
  <HologramModal
    :is-open="showModal"
    title="Mi Modal"
    classification="CONFIDENCIAL"
    @close="showModal = false"
  >
    <template #content>
      <p>Contenido personalizado del modal</p>
    </template>
  </HologramModal>
</template>
```

### Props

- `isOpen` (Boolean): Controla la visibilidad del modal
- `title` (String): Título del modal (default: 'Modal Title')
- `content` (String): Contenido de texto simple (opcional)
- `classification` (String): Clasificación mostrada en el header (default: 'SYSTEM')
- `showStatus` (Boolean): Muestra/oculta la barra de estado (default: true)
- `footerText` (String): Texto del footer (default: mensaje de transmisión)
- `enableTextScramble` (Boolean): Habilita el efecto scramble en el título (default: true)

### Slots

- `header`: Header personalizado completo
- `content`: Contenido principal del modal
- `footer`: Footer personalizado

### Eventos

- `close`: Se emite cuando el modal debe cerrarse

## StarWarsButton Component

Un componente de botón reutilizable con estilo de Star Wars que se adapta dinámicamente al tema seleccionado.

## Características

- 🎨 **4 variantes**: `primary`, `secondary`, `outline`, `ghost`
- 📏 **4 tamaños**: `sm`, `md`, `lg`, `xl`
- ⚡ **Efectos visuales**: Hover, focus, active con animaciones suaves
- 🌈 **Tema dinámico**: Se adapta automáticamente al color del sable de luz seleccionado
- 🔗 **Soporte para enlaces**: Puede funcionar como `<a>` o `<button>`
- 🎯 **Slots flexibles**: Iconos izquierda/derecha y contenido personalizable
- ♿ **Accesibilidad**: Estados de focus y disabled bien definidos
- ⏳ **Estado de carga**: Spinner animado cuando está cargando

## Uso Básico

```vue
<template>
  <!-- Botón primario -->
  <StarWarsButton @click="handleClick">
    Hacer clic
  </StarWarsButton>

  <!-- Botón como enlace -->
  <StarWarsButton href="https://example.com" target="_blank">
    Visitar sitio
  </StarWarsButton>

  <!-- Con iconos -->
  <StarWarsButton variant="outline" size="lg">
    <template #icon-left>
      <svg>...</svg>
    </template>
    Enviar mensaje
    <template #icon-right>
      <svg>...</svg>
    </template>
  </StarWarsButton>
</template>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `String` | `'primary'` | Estilo del botón: `primary`, `secondary`, `outline`, `ghost` |
| `size` | `String` | `'md'` | Tamaño: `sm`, `md`, `lg`, `xl` |
| `disabled` | `Boolean` | `false` | Deshabilita el botón |
| `loading` | `Boolean` | `false` | Muestra spinner de carga |
| `href` | `String` | `null` | Convierte el botón en enlace |
| `target` | `String` | `'_self'` | Target del enlace |

## Slots

| Slot | Descripción |
|------|-------------|
| `default` | Contenido principal del botón |
| `icon-left` | Icono a la izquierda del texto |
| `icon-right` | Icono a la derecha del texto |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `click` | Emitido cuando se hace clic en el botón |

## Variantes

### Primary
Botón principal con gradiente y efectos de glow. Ideal para acciones principales.

### Secondary
Botón secundario con fondo gris y borde. Perfecto para acciones secundarias.

### Outline
Botón con solo borde, sin fondo. Se llena al hacer hover.

### Ghost
Botón transparente que se ilumina al hacer hover.

## Tamaños

- **sm**: `px-4 py-2 text-sm` - Pequeño
- **md**: `px-6 py-3 text-base` - Mediano (default)
- **lg**: `px-8 py-4 text-lg` - Grande
- **xl**: `px-10 py-5 text-xl` - Extra grande

## Efectos Visuales

- **Hover**: Escala 1.05x, sombra con glow del tema
- **Active**: Escala 1.02x para feedback táctil
- **Focus**: Outline con glow para accesibilidad
- **Disabled**: Opacidad reducida, sin efectos

## Integración con Temas

El componente utiliza las variables CSS del tema activo:
- `--primary-color`: Color principal
- `--primary-light`: Color claro
- `--primary-glow`: Color del resplandor

## Ejemplos de Uso

```vue
<template>
  <!-- Botón de contacto -->
  <StarWarsButton
    href="mailto:contact@example.com"
    variant="primary"
    size="lg"
  >
    <template #icon-left>
      <MailIcon />
    </template>
    Enviar Email
  </StarWarsButton>

  <!-- Botón de descarga -->
  <StarWarsButton
    variant="outline"
    size="md"
    :loading="isDownloading"
    @click="downloadFile"
  >
    <template #icon-right>
      <DownloadIcon />
    </template>
    {{ isDownloading ? 'Descargando...' : 'Descargar' }}
  </StarWarsButton>

  <!-- Botón de acción secundaria -->
  <StarWarsButton
    variant="ghost"
    size="sm"
    @click="showMoreInfo"
  >
    Más información
  </StarWarsButton>
</template>
```
