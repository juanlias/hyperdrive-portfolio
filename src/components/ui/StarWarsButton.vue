<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    default: null
  },
  target: {
    type: String,
    default: '_self'
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const baseClasses = [
    'sw-button',
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'text-sm',
    'uppercase',
    'tracking-wide',
    'border',
    'rounded-md',
    'transition-all',
    'duration-300',
    'ease-out',
    'overflow-hidden',
    'group',
    'cursor-pointer',
    'font-orbitron'
  ]

  // Size classes - más delgados
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base', 
    xl: 'px-6 py-3 text-lg'
  }

  // Clean variant classes
  const variantClasses = {
    primary: [
      'bg-transparent',
      'border-cyan-400/50',
      'text-cyan-300',
      'hover:border-cyan-400',
      'hover:text-cyan-100',
      'hover:shadow-cyan-400/50',
      'focus:outline-none',
      'focus:border-cyan-400',
      'focus:ring-2',
      'focus:ring-cyan-400/25'
    ],
    secondary: [
      'bg-transparent',
      'border-gray-500/50',
      'text-gray-300',
      'hover:border-gray-400',
      'hover:text-gray-100',
      'hover:shadow-gray-400/30'
    ],
    outline: [
      'bg-transparent',
      'border-current',
      'text-cyan-400',
      'hover:bg-cyan-400/10',
      'hover:shadow-cyan-400/40'
    ],
    ghost: [
      'bg-transparent',
      'border-transparent',
      'text-cyan-300',
      'hover:bg-cyan-400/10',
      'hover:border-cyan-400/30'
    ]
  }

  // Disabled classes
  const disabledClasses = props.disabled ? [
    'opacity-50',
    'cursor-not-allowed',
    'pointer-events-none'
  ] : []

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...disabledClasses
  ].join(' ')
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <!-- Use anchor tag for links, button for everything else -->
  <a
    v-if="href"
    :href="href"
    :target="target"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Content -->
    <span class="relative z-10 flex items-center gap-2" :class="{ 'opacity-0': loading }">
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </span>

    <!-- Loading spinner -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-20">
      <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Hologram effect on hover -->
    <div class="hologram-overlay"></div>
  </a>

  <!-- Button for everything else -->
  <button
    v-else
    type="button"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Content -->
    <span class="relative z-10 flex items-center gap-2" :class="{ 'opacity-0': loading }">
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </span>

    <!-- Loading spinner -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-20">
      <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Hologram effect on hover -->
    <div class="hologram-overlay"></div>
  </button>
</template>

<style scoped>
/* Base button styles */
.sw-button {
  @apply p-2;
  position: relative;
  backdrop-filter: blur(5px);
  font-family: 'Orbitron', monospace;
  letter-spacing: 0.05em;
}

/* Hologram overlay effect */
.hologram-overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  border-radius: inherit;
  z-index: 1;
}

/* Hologram effect on hover */
.sw-button:hover .hologram-overlay {
  opacity: 1;
  background: 
    linear-gradient(
      135deg,
      rgba(0, 255, 255, 0.1) 0%,
      rgba(0, 200, 255, 0.05) 25%,
      transparent 50%,
      rgba(0, 200, 255, 0.05) 75%,
      rgba(0, 255, 255, 0.1) 100%
    );
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
}

/* Scan lines effect */
.hologram-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.1) 2px,
    rgba(0, 255, 255, 0.1) 4px
  );
  animation: scanlines 2s linear infinite;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.sw-button:hover .hologram-overlay::before {
  opacity: 1;
}

/* Glitch effect */
.hologram-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 255, 255, 0.2) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.sw-button:hover .hologram-overlay::after {
  transform: translateX(100%);
}

/* Text effects on hover */
.sw-button:hover {
  text-shadow: 
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 15px currentColor;
}

/* Focus state */
.sw-button:focus-visible {
  outline: 2px solid rgba(0, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Active state */
.sw-button:active {
  transform: scale(0.98);
}

/* Disabled state */
.sw-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.sw-button:disabled:hover .hologram-overlay {
  opacity: 0;
}

/* Animations */
@keyframes scanlines {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

/* Loading spinner */
.sw-button .animate-spin {
  border-color: currentColor;
  border-top-color: transparent;
}
</style>
