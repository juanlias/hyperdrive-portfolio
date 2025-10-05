<template>
  <section ref="portfolioSection" data-anim="section" class="sw-panel p-6 rounded-lg space-y-4">
    <h2 class="sw-heading text-xl">{{ t('projects.title') }}</h2>
    <div ref="projectsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <button 
        v-for="(project, index) in projects" 
        :key="index"
        ref="projectCards"
        class="project-card block p-4 rounded transition-all duration-300 text-center relative overflow-hidden"
        @click="handleOpenProject(project)"
      >
        <!-- Hover scan effect -->
        <div class="scan-effect absolute inset-0 opacity-0 transition-opacity duration-300"></div>
        
        <!-- Project content -->
        <div class="project-content relative z-10">
          <h3 class="font-bold text-white mb-2">{{ project.title }}</h3>
          <p class="project-description text-sm mb-2">{{ project.description }}</p>
          <div class="project-type text-xs text-cyan-400 font-semibold uppercase tracking-wider">
            {{ project.type || 'PROJECT' }}
          </div>
        </div>
        
        <!-- Hologram grid overlay -->
        <div class="hologram-grid absolute inset-0 opacity-0 transition-opacity duration-300"></div>
      </button>
    </div>
    
    <!-- Project Modal -->
    <ProjectModal 
      :is-open="isModalOpen" 
      :project="selectedProject"
      @close="handleCloseModal" 
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import ProjectModal from './ProjectDetailsModal.vue'
import { useProjectModal, useHologramEffects } from '../../composables/useProjectModal.js'

const emit = defineEmits(['modal-open', 'modal-close'])

const { t, tm } = useI18n()
const { isModalOpen, selectedProject, openProject, closeModal } = useProjectModal()
const { createGlowPulse } = useHologramEffects()

// Reactive data
const projects = computed(() => tm('projects.items'))

// Template refs
const portfolioSection = ref(null)
const projectsGrid = ref(null)
const projectCards = ref([])

onMounted(() => {
  nextTick(() => {
    setupProjectCardEffects()
  })
})

const setupProjectCardEffects = () => {
  if (!projectCards.value?.length) return
  
  projectCards.value.forEach((card, index) => {
    // Set up hover animations
    const scanEffect = card.querySelector('.scan-effect')
    const hologramGrid = card.querySelector('.hologram-grid')
    const content = card.querySelector('.project-content')
    
    // Add subtle glow effect
    createGlowPulse(card, 'rgba(var(--primary-color-rgb), 0.1)')
    
    // Mouse enter effect
    card.addEventListener('mouseenter', () => {
      gsap.timeline()
        .to(scanEffect, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"

        })
        .to(hologramGrid, {
          opacity: 0.4,
          duration: 0.15,
          ease: "power2.out"
        }, 0)
        .to(content, {
          y: -3,
          scale: 1.03,
          duration: 0.2,
          ease: "back.out(2)"
        }, 0)
        .to(card, {
          boxShadow: `0 0 30px var(--primary-glow)`,
          borderColor: `var(--primary-color)`,
          duration: 0.2,
          ease: "power2.out"
        }, 0)
    })
    
    // Mouse leave effect
    card.addEventListener('mouseleave', () => {
      gsap.timeline()
        .to([scanEffect, hologramGrid], {
          opacity: 0,
          duration: 0.15,
          ease: "power2.out"
        })
        .to(content, {
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        }, 0)
        .to(card, {
          boxShadow: `0 0 10px var(--panel-glow)`,
          borderColor: `var(--primary-darker)`,
          duration: 0.2,
          ease: "power2.out"
        }, 0)
    })
  })
}

const handleOpenProject = (project) => {
  // Open modal directly without portfolio animation
  openProject(project)
  emit('modal-open')
}

const handleCloseModal = () => {
  // Close modal directly
  closeModal()
  emit('modal-close')
}
</script>

<style scoped>
.project-card {
  background-color: rgba(var(--primary-color-rgb), 0.05);
  border: 1px solid var(--primary-darker);
}

.project-card:hover {
  background-color: rgba(var(--primary-color-rgb), 0.1);
  border-color: var(--primary-color);
  box-shadow: 0 0 20px var(--panel-glow);
}

.project-description {
  color: var(--primary-light);
}

.project-type {
  color: var(--primary-light);
  text-shadow: 0 0 5px var(--primary-glow);
}

.scan-effect {
  background: linear-gradient(
    45deg,
    transparent 30%,
    var(--primary-glow) 50%,
    transparent 70%
  );
  animation: scan-sweep 2s infinite;
}

.hologram-grid {
  background-image: 
    linear-gradient(0deg, var(--primary-glow) 1px, transparent 1px),
    linear-gradient(90deg, var(--primary-glow) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 0 0;
  animation: grid-move 3s linear infinite;
}

.project-content {
  transition: all 0.3s ease;
}

/* Animations */
@keyframes scan-sweep {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(200%) skewX(-15deg); }
}

@keyframes grid-move {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 20px 20px, 20px 20px; }
}
</style>
