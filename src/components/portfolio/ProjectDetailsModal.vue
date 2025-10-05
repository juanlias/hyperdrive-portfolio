<template>
  <HologramModal
    :is-open="isOpen"
    :title="project?.title || 'Proyecto'"
    :classification="project?.type || 'PROTOTYPE'"
    @close="emit('close')"
  >
    <template #content>
      <!-- Project Image/Preview -->
      <div ref="imageContainer" class="image-container mb-6 relative overflow-hidden rounded">
        <div class="hologram-image-placeholder bg-gradient-to-r from-cyan-900/30 to-blue-900/30 h-48 flex items-center justify-center border border-cyan-400/30">
          <div class="text-center">
            <!-- <div class="text-6xl mb-2">🚀</div> -->
            <div class="text-cyan-400">{{ project?.title }}</div>
          </div>
        </div>
        <!-- Scan lines over image -->
        <div class="scan-lines absolute inset-0"></div>
      </div>
      
      <!-- Project Details Grid -->
      <div class="details-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Description -->
        <div class="detail-section">
          <h3 class="section-title text-cyan-300 font-semibold mb-2 text-lg">DESCRIPCIÓN</h3>
          <p class="hologram-text text-cyan-100/80 leading-relaxed">
            {{ project?.description }}
          </p>
          <p v-if="project?.longDescription" class="hologram-text text-cyan-100/70 mt-2 leading-relaxed">
            {{ project?.longDescription }}
          </p>
        </div>
        
        <!-- Tech Stack -->
        <div class="detail-section">
          <h3 class="section-title text-cyan-300 font-semibold mb-2 text-lg">TECNOLOGÍAS</h3>
          <div class="tech-tags flex flex-wrap gap-2">
            <span 
              v-for="tech in project?.technologies || ['Vue.js', 'Node.js', 'MongoDB']" 
              :key="tech"
              class="tech-tag px-3 py-1 text-xs border border-cyan-400/50 rounded text-cyan-300 bg-cyan-400/10"
            >
              {{ tech }}
            </span>
          </div>
        </div>
        
        <!-- Project Stats -->
        <div class="detail-section">
          <h3 class="section-title text-cyan-300 font-semibold mb-2 text-lg">ESTADÍSTICAS</h3>
          <div class="stats-grid space-y-2">
            <div class="stat-item flex justify-between">
              <span class="text-cyan-100/70">Duración:</span>
              <span class="text-cyan-300">{{ project?.duration || '3 meses' }}</span>
            </div>
            <div class="stat-item flex justify-between">
              <span class="text-cyan-100/70">Estado:</span>
              <span class="text-green-400">{{ project?.status || 'Completado' }}</span>
            </div>
            <div class="stat-item flex justify-between">
              <span class="text-cyan-100/70">Año:</span>
              <span class="text-cyan-300">{{ project?.year || '2024' }}</span>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="detail-section action-section">
          <h3 class="section-title text-cyan-300 font-semibold mb-2 text-lg">ACCIONES</h3>
          <div class="action-buttons flex gap-x-2">
            <StarWarsButton 
              v-if="project?.liveUrl"
              @click="openLink(project.liveUrl)"
            >
              VER PROYECTO
            </StarWarsButton>
            
            <StarWarsButton 
              v-if="project?.githubUrl"
              @click="openLink(project.githubUrl)"
            >
              VER CÓDIGO
            </StarWarsButton>
          </div>
        </div>
      </div>
    </template>
  </HologramModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import HologramModal from '../ui/HologramModal.vue'
import StarWarsButton from '../ui/StarWarsButton.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const openLink = (url) => {
  console.log('Opening URL:', url)
  window.open(url, '_blank')
}

// Debug: Watch project changes
watch(() => props.project, (newProject) => {
  if (newProject) {
    console.log('Project data:', newProject)
    console.log('Has liveUrl:', !!newProject.liveUrl)
    console.log('Has githubUrl:', !!newProject.githubUrl)
  }
}, { immediate: true })
</script>

<style scoped>
.section-title {
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--primary-light);
  text-shadow: 0 0 10px var(--primary-glow);
}

.tech-tag {
  backdrop-filter: blur(5px);
  color: var(--primary-light);
  border-color: var(--primary-darker);
  background: rgba(var(--primary-color-rgb), 0.1);
  text-shadow: 0 0 5px var(--primary-glow);
  position: relative;
  overflow: hidden;
}

.tech-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(var(--primary-color-rgb), 0.2), transparent);
  transition: left 0.5s ease;
}

.tech-tag:hover::before {
  left: 100%;
}

.action-section {
  z-index: 20;
  position: relative;
}

.action-buttons {
  z-index: 25;
  position: relative;
}

.hologram-text {
  color: var(--primary-light);
  text-shadow: 0 0 10px var(--primary-glow);
  animation: text-flicker 3s infinite;
  position: relative;
}

.hologram-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 49%, rgba(var(--primary-color-rgb), 0.03) 50%, transparent 51%);
  animation: data-stream 3s infinite linear;
  pointer-events: none;
}

.scan-lines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(var(--primary-color-rgb), 0.1) 2px,
    rgba(var(--primary-color-rgb), 0.1) 4px
  );
  animation: scan-lines-move 2s linear infinite;
}

@keyframes scan-lines-move {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes text-flicker {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0.8; }
  97% { opacity: 0.9; }
  99% { opacity: 0.85; }
}

@keyframes data-stream {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}
</style>
