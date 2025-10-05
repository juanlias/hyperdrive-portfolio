<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      ref="modalOverlay"
      class="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      @click="closeModal"
      >
      <!-- Backdrop glitch effect -->
      <div class="backdrop-glitch absolute inset-0"></div>

      <!-- Hologram Container -->
      <div 
        ref="hologramContainer"
        class="hologram-container relative max-w-4xl w-full mx-4"
        @click.stop
      >
        
        <!-- Main content -->
        <div ref="contentPanel" class="content-panel relative bg-transparent border rounded-lg p-8">
          <!-- Header -->
          <div class="flex justify-between items-start mb-6">
            <div class="flex-1">
              <!-- Custom header slot or default header -->
              <slot name="header">
                <h2 ref="titleElement" class="hologram-text text-3xl font-bold mb-2 text-cyan-300">
                  {{ title }}
                </h2>
                <div ref="statusBar" class="status-bar flex items-center space-x-4 text-sm" v-if="showStatus">
                  <span class="status-indicator"></span>
                  <span class="text-cyan-400">STATUS: ONLINE</span>
                  <span class="text-cyan-400">CLASSIFICATION: {{ classification }}</span>
                </div>
              </slot>
            </div>
            <button 
              @click="closeModal"
              class="close-btn text-cyan-400 hover:text-red-400 transition-colors text-2xl flex-shrink-0 ml-4"
            >
              ✕
            </button>
          </div>
          
          <!-- Main content slot -->
          <div ref="mainContent" class="main-content">
            <slot name="content">
              <div class="hologram-text text-cyan-100/80">
                {{ content }}
              </div>
            </slot>
          </div>
          
          <!-- Footer slot -->
          <div ref="footer" class="transmission-footer mt-8 pt-4 border-t border-cyan-400/30 text-center">
            <slot name="footer">
              <div class="text-cyan-400/60 text-sm">
                {{ footerText }}
              </div>
            </slot>
          </div>
        </div>
        
        <!-- Hologram glow effect -->
        <div class="hologram-glow absolute inset-0 rounded-lg"></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Modal Title'
  },
  content: {
    type: String,
    default: ''
  },
  classification: {
    type: String,
    default: 'SYSTEM'
  },
  showStatus: {
    type: Boolean,
    default: true
  },
  footerText: {
    type: String,
    default: 'TRANSMISIÓN HOLOGRÁFICA - ENCRIPTADA POR LA ALIANZA REBELDE'
  },
  enableTextScramble: {
    type: Boolean,
    default: false  // Deshabilitado por defecto para evitar parpadeo
  }
})

const emit = defineEmits(['close'])

// Template refs
const modalOverlay = ref(null)
const hologramContainer = ref(null)
const contentPanel = ref(null)
const titleElement = ref(null)
const statusBar = ref(null)
const mainContent = ref(null)
const footer = ref(null)

// Animation timeline
let tl = null

// Watch for modal open/close
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      animateIn()
    })
  }
})

const animateIn = () => {
  // Kill previous animation
  if (tl) tl.kill()
  
  // Create new timeline
  tl = gsap.timeline()
  
  // Set initial states - solo el contenedor estrecho
  gsap.set(modalOverlay.value, { opacity: 0 })
  gsap.set(hologramContainer.value, { 
    scaleX: 0.1,  // Muy estrecho horizontalmente
    scaleY: 1,    // Altura normal
    opacity: 0,
    rotationY: 0 // Sin rotación para efecto más limpio
  })
  gsap.set(contentPanel.value, { 
    opacity: 0
    // Sin transformaciones de escala para el contenido
  })
  gsap.set([titleElement.value, statusBar.value, mainContent.value, footer.value], {
    opacity: 0,
    y: 20  // Volvemos al movimiento vertical normal
    // Sin scaleX para los elementos internos
  })
  
  // Smooth backdrop fade in sin efectos
  tl.to(modalOverlay.value, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out"
  })
  
  // Expansión horizontal del contenedor - de estrecho a normal
  tl.to(hologramContainer.value, {
    scaleX: 1,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out"
  }, 0.1)
  
  // Aparición normal del panel de contenido
  tl.to(contentPanel.value, {
    opacity: 1,
    duration: 0.5,
    ease: "power3.out"
  }, 0.2)
  
  // Aparición secuencial del contenido - movimiento normal desde abajo
  tl.to(titleElement.value, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out"
  }, 0.4)
  
  // Status bar suave
  if (props.showStatus && statusBar.value) {
    tl.to(statusBar.value, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    }, 0.6)
  }
  
  // Main content
  tl.to(mainContent.value, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out"
  }, 0.7)
  
  // Footer
  tl.to(footer.value, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out"
  }, 0.9)
  
  // Add continuous hologram effects después de que termine la animación
  tl.call(() => {
    startHologramEffects()
  }, null, 1.2)
}

const animateOut = () => {
  if (tl) tl.kill()
  
  tl = gsap.timeline({
    onComplete: () => emit('close')
  })
  
  // Los elementos internos se desvanecen normalmente hacia abajo
  tl.to([titleElement.value, statusBar.value, mainContent.value, footer.value], {
    opacity: 0,
    y: 15,
    duration: 0.2,
    ease: "power2.in"
  })
  
  // El panel de contenido se desvanece
  tl.to(contentPanel.value, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.in"
  }, 0.1)
  
  // Solo el contenedor se comprime horizontalmente
  tl.to(hologramContainer.value, {
    scaleX: 0.1,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in"
  }, 0.2)
  
  // Fade out del backdrop
  tl.to(modalOverlay.value, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.in"
  }, 0.4)
}

const startHologramEffects = () => {
  // Solo un brillo muy sutil y lento
  gsap.to('.hologram-glow', {
    opacity: 0.15,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  })
  
  // Eliminamos el flicker completamente para evitar parpadeo
  
  // Status indicator muy sutil
  gsap.to('.status-indicator', {
    opacity: 0.7,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  })
}

const startTextScramble = (element, finalText, duration = 1) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const originalText = finalText
  let iteration = 0
  
  const interval = setInterval(() => {
    if (!element) {
      clearInterval(interval)
      return
    }
    
    element.textContent = originalText
      .split('')
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index]
        }
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')
    
    if (iteration >= originalText.length) {
      clearInterval(interval)
    }
    
    iteration += 0.3 // Slower progression
  }, 50) // Longer interval between changes
  
  setTimeout(() => {
    clearInterval(interval)
    if (element) {
      element.textContent = originalText
    }
  }, duration * 1000)
}

const closeModal = () => {
  animateOut()
}

// Expose methods for external use
defineExpose({
  closeModal,
  animateIn,
  animateOut
})
</script>

<style scoped>
.modal-overlay {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.85);
}

.backdrop-glitch {
  background: linear-gradient(45deg, transparent 33%, rgba(0, 255, 255, 0.005) 34%, rgba(0, 255, 255, 0.005) 36%, transparent 37%);
  /* Eliminamos la animación de glitch del backdrop */
}

.hologram-container {
  perspective: 1500px;
  transform-style: preserve-3d;
  z-index: 10;
  position: relative;
}

.content-panel {
  overflow-y: auto;
  max-height: 90dvh;
  background: linear-gradient(
    135deg,
    rgba(var(--primary-color-rgb), 0.08) 0%,
    rgba(var(--primary-color-rgb), 0.12) 50%,
    rgba(var(--primary-color-rgb), 0.08) 100%
  );
  box-shadow: 
    0 0 30px var(--primary-glow),
    inset 0 0 30px rgba(var(--primary-color-rgb), 0.1);
  border-color: var(--primary-color);
  /* Eliminamos la animación de interferencia que causa parpadeo */
}

.hologram-text {
  color: var(--primary-light);
  text-shadow: 0 0 10px var(--primary-glow);
  /* Eliminamos animaciones de parpadeo del texto */
  position: relative;
}

.hologram-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 49%, rgba(var(--primary-color-rgb), 0.01) 50%, transparent 51%);
  /* Eliminamos la animación data-stream para evitar parpadeo */
  pointer-events: none;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary-glow);
}

.hologram-glow {
  background: linear-gradient(
    to top,
    var(--primary-glow) 0%,
    rgba(var(--primary-color-rgb), 0.3) 20%,
    rgba(var(--primary-color-rgb), 0.1) 50%,
    rgba(var(--primary-color-rgb), 0.05) 80%,
    transparent 100%
  );
  pointer-events: none;
  z-index: -1;
}

.close-btn:hover {
  transform: scale(1.1);
  text-shadow: 0 0 10px currentColor;
  filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5));
}

.main-content {
  min-height: 200px;
}

/* Animations - Suavizadas */
@keyframes glitch-bg {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-1px); }
  40% { transform: translateX(1px); }
  60% { transform: translateX(-0.5px); }
  80% { transform: translateX(0.5px); }
}

@keyframes hologram-line-pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes text-flicker {
  0%, 94%, 100% { opacity: 1; }
  95% { opacity: 0.95; }
  97% { opacity: 0.98; }
  99% { opacity: 0.96; }
}

@keyframes hologram-interference {
  0%, 100% { filter: hue-rotate(0deg) contrast(1); }
  25% { filter: hue-rotate(2deg) contrast(1.02); }
  50% { filter: hue-rotate(-2deg) contrast(0.98); }
  75% { filter: hue-rotate(1deg) contrast(1.01); }
}

@keyframes data-stream {
  0% { transform: translateY(-100%); opacity: 0; }
  15% { opacity: 0.3; }
  85% { opacity: 0.3; }
  100% { transform: translateY(100%); opacity: 0; }
}
</style>
