<script setup>
import { useI18n } from 'vue-i18n'
import obiJuanImage from '../../assets/images/obi-juan-kenobi-2.png'

const { t } = useI18n()
</script>

<template>
  <header data-anim="section" class="sw-panel rounded-lg w-full overflow-hidden pt-4 md:pt-0">
    <div class="flex flex-col md:flex-row items-center gap-8">
      <!-- Holographic Image Container -->
      <div class="hologram-container relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64">
        <!-- Base Image -->
        <img 
          :src="obiJuanImage" 
          alt="Obi-Juan Kenobi" 
          class="hologram-image w-full h-full object-cover rounded-lg"
        >
        <!-- Color Overlay with Multiply Blend Mode -->
        <div class="hologram-overlay absolute inset-0 rounded-lg"></div>
        <!-- Scanlines Effect -->
        <div class="scanlines absolute inset-0 rounded-lg pointer-events-none"></div>
        <!-- Glow Border -->
        <div class="hologram-glow absolute inset-0 rounded-lg pointer-events-none"></div>
        <!-- Online Status -->
        <span class="absolute bottom-2 right-2 flex items-center gap-2 bg-gray-900/80 px-3 py-1 rounded-full backdrop-blur-sm">
          <span class="block h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
          <span class="text-xs text-green-400 font-semibold">{{ t('header.status') }}</span>
        </span>
      </div>

      <!-- Hero Text -->
      <div class="flex-1 text-center md:text-left">
        <p class="text-sm text-gray-400 tracking-widest mb-2">{{ t('header.greeting') }}</p>
        <h1 class="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white font-orbitron mb-4">
          {{ t('header.name') }}
        </h1>
        <div class="text-lg md:text-xl lg:text-2xl text-gray-300 font-medium space-y-2 pb-4 md:pb-0">
          <p class="hero-subtitle">{{ t('header.role') }}</p>
          <p class="text-base text-gray-400">{{ t('header.subtitle') }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hologram-container {
  position: relative;
  filter: contrast(1.1) brightness(1.1);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease;
  cursor: pointer;
}

.hologram-container:hover {
  transform: scale(1.05) translateY(-5px);
  filter: contrast(1.3) brightness(1.3);
}

.hologram-image {
  filter: grayscale(100%);
  opacity: 0.9;
  transition: opacity 0.3s ease, filter 0.3s ease;
}

.hologram-container:hover .hologram-image {
  opacity: 1;
  filter: grayscale(80%);
}

/* Color Overlay with Multiply Blend Mode */
.hologram-overlay {
  background-color: var(--primary-color);
  mix-blend-mode: multiply;
  opacity: 0.6;
  transition: background-color 0.5s ease, opacity 0.3s ease;
  animation: pulse-overlay 3s ease-in-out infinite;
}

.hologram-container:hover .hologram-overlay {
  opacity: 0.8;
}

/* Scanlines Effect */
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.1) 2px,
    rgba(0, 0, 0, 0.1) 4px
  );
  animation: scanline-move 8s linear infinite;
  transition: opacity 0.3s ease;
}

.hologram-container:hover .scanlines {
  animation: scanline-move-fast 2s linear infinite;
}

@keyframes scanline-move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}

@keyframes scanline-move-fast {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}

/* Glow Border Effect */
.hologram-glow {
  border: 2px solid var(--primary-light);
  box-shadow: 
    0 0 20px var(--primary-glow),
    inset 0 0 20px var(--primary-glow);
  animation: glow-pulse 2s ease-in-out infinite;
  transition: all 0.3s ease;
}

.hologram-container:hover .hologram-glow {
  border: 3px solid var(--primary-color);
  animation: glow-pulse-intense 1s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 
      0 0 20px var(--primary-glow),
      inset 0 0 20px var(--primary-glow);
  }
  50% {
    opacity: 1;
    box-shadow: 
      0 0 30px var(--primary-glow),
      inset 0 0 30px var(--primary-glow);
  }
}

@keyframes glow-pulse-intense {
  0%, 100% {
    opacity: 0.8;
    box-shadow: 
      0 0 40px var(--primary-glow),
      0 0 60px var(--primary-glow),
      inset 0 0 40px var(--primary-glow);
  }
  50% {
    opacity: 1;
    box-shadow: 
      0 0 60px var(--primary-glow),
      0 0 80px var(--primary-glow),
      inset 0 0 60px var(--primary-glow);
  }
}

@keyframes pulse-overlay {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.7;
  }
}

/* Hero Title with Glow */
.hero-title {
  text-shadow: 
    0 0 10px var(--primary-glow),
    0 0 20px var(--primary-glow),
    0 0 30px var(--primary-glow);
  animation: title-glow 3s ease-in-out infinite;
}

@keyframes title-glow {
  0%, 100% {
    text-shadow: 
      0 0 10px var(--primary-glow),
      0 0 20px var(--primary-glow),
      0 0 30px var(--primary-glow);
  }
  50% {
    text-shadow: 
      0 0 15px var(--primary-glow),
      0 0 30px var(--primary-glow),
      0 0 45px var(--primary-glow);
  }
}

.hero-subtitle {
  color: var(--primary-light);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hologram-container {
    width: 200px;
    height: 200px;
  }
}
</style>
