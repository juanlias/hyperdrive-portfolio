<template>
  <section ref="portfolioSection" data-anim="section" class="sw-panel portfolio-section">
    <h2 class="sw-heading portfolio-title">{{ t('projects.title') }}</h2>
    <div ref="projectsGrid" class="projects-grid">
      <button 
        v-for="(project, index) in projects" 
        :key="index"
        ref="projectCards"
        class="project-card"
        @click="handleOpenProject(project)"
      >
        <!-- Hover scan effect -->
        <div class="scan-effect"></div>
        
        <!-- Project content -->
        <div class="project-content">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-type">
            {{ project.type || 'PROJECT' }}
          </div>
        </div>
        
        <!-- Hologram grid overlay -->
        <div class="hologram-grid"></div>
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
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
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

// Store animation timelines for cleanup
const animationTimelines = ref([])
const eventListeners = ref([])

onMounted(() => {
  nextTick(() => {
    setupProjectCardEffects()
  })
})

onUnmounted(() => {
  // Clean up animations and event listeners
  animationTimelines.value.forEach(timeline => {
    if (timeline) timeline.kill()
  })
  
  eventListeners.value.forEach(({ element, event, handler }) => {
    element.removeEventListener(event, handler)
  })
  
  animationTimelines.value = []
  eventListeners.value = []
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
    
    // Initialize default states
    gsap.set([scanEffect, hologramGrid], { opacity: 0 })
    gsap.set(content, { y: 0, scale: 1 })
    gsap.set(card, { 
      boxShadow: `0 0 5px var(--panel-glow)`,
      borderColor: `var(--primary-darker)`
    })
    
    // Store timeline references to prevent overlap
    let hoverTimeline = null
    let leaveTimeline = null
    
    // Mouse enter handler
    const handleMouseEnter = () => {
      // Kill any existing animations
      if (leaveTimeline) {
        leaveTimeline.kill()
        leaveTimeline = null
      }
      if (hoverTimeline) {
        hoverTimeline.kill()
        hoverTimeline = null
      }
      
      hoverTimeline = gsap.timeline()
        .to(scanEffect, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(hologramGrid, {
          opacity: 0.1,
          duration: 0.25,
          ease: "power2.out"
        }, 0.05)
        .to(content, {
          y: -2,
          scale: 1.02,
          duration: 0.3,
          ease: "back.out(1.5)"
        }, 0)
        .to(card, {
          boxShadow: `0 0 25px var(--primary-glow), 0 0 50px rgba(var(--primary-color-rgb), 0.2)`,
          borderColor: `var(--primary-color)`,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
      
      // Store timeline for cleanup
      animationTimelines.value.push(hoverTimeline)
    }
    
    // Mouse leave handler
    const handleMouseLeave = () => {
      // Kill any existing animations
      if (hoverTimeline) {
        hoverTimeline.kill()
        hoverTimeline = null
      }
      if (leaveTimeline) {
        leaveTimeline.kill()
        leaveTimeline = null
      }
      
      leaveTimeline = gsap.timeline()
        .to([scanEffect, hologramGrid], {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out"
        })
        .to(content, {
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: "power2.out"
        }, 0)
        .to(card, {
          boxShadow: `0 0 5px var(--panel-glow)`,
          borderColor: `var(--primary-darker)`,
          duration: 0.25,
          ease: "power2.out"
        }, 0)
      
      // Store timeline for cleanup
      animationTimelines.value.push(leaveTimeline)
    }
    
    // Add event listeners
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)
    
    // Store event listeners for cleanup
    eventListeners.value.push(
      { element: card, event: 'mouseenter', handler: handleMouseEnter },
      { element: card, event: 'mouseleave', handler: handleMouseLeave }
    )
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
.portfolio-section {
  @apply p-6 rounded-lg space-y-4;
}

.portfolio-title {
  @apply text-xl;
}

.projects-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4;
}

.project-card {
  @apply block p-4 rounded transition-all duration-300 text-center relative overflow-hidden;
  background-color: rgba(var(--primary-color-rgb), 0.05);
  border: 1px solid var(--primary-darker);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  transform: translateZ(0); /* Force hardware acceleration */
  backface-visibility: hidden; /* Prevent flickering */
}

.project-card:hover {
  background-color: rgba(var(--primary-color-rgb), 0.12);
}

.project-content {
  @apply relative z-10;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
}

.project-title {
  @apply font-bold text-white mb-2;
  transition: color 0.3s ease;
}

.project-description {
  @apply text-sm mb-2;
  color: var(--primary-light);
  transition: color 0.3s ease;
}

.project-type {
  @apply text-xs font-semibold uppercase tracking-wider;
  text-shadow: 0 0 5px var(--primary-glow);
  transition: all 0.3s ease;
}

.scan-effect {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  background: linear-gradient(
    45deg,
    transparent 30%,
    var(--primary-glow) 50%,
    transparent 70%
  );
  transform: translateX(-100%) skewX(-15deg);
  pointer-events: none;
}

.project-card:hover .scan-effect {
  animation: scan-sweep 1.5s ease-out;
}

.hologram-grid {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  background-image: 
    linear-gradient(0deg, var(--primary-glow) 1px, transparent 1px),
    linear-gradient(90deg, var(--primary-glow) 1px, transparent 1px);
  background-size: 15px 15px;
  background-position: 0 0, 0 0;
  pointer-events: none;
  transform: translateZ(0);
}

.project-card:hover .hologram-grid {
  animation: grid-move 2s linear infinite;
}

.project-card:hover .project-title {
  color: var(--primary-color);
  text-shadow: 0 0 8px var(--primary-glow);
}

.project-card:hover .project-description {
  color: var(--primary-light);
}

.project-card:hover .project-type {
  color: var(--primary-color);
  text-shadow: 0 0 8px var(--primary-glow);
}

/* Animations */
@keyframes scan-sweep {
  0% { 
    transform: translateX(-100%) skewX(-15deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% { 
    transform: translateX(200%) skewX(-15deg);
    opacity: 0;
  }
}

@keyframes grid-move {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 15px 15px, 15px 15px; }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-content,
  .project-description,
  .project-type,
  .project-title {
    transition: none;
  }
  
  .scan-effect,
  .hologram-grid {
    animation: none;
  }
}
</style>
