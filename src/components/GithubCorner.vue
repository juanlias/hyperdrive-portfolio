<template>
  <div class="github-corner-container">
    <!-- GitHub Corner Icon -->
    <div 
      @click="togglePanel"
      class="github-corner cursor-pointer" 
      :class="{ 'expanded': isExpanded }"
      :aria-label="t('github.ariaLabel')"
    >
      <svg 
        width="80" 
        height="80" 
        viewBox="0 0 250 250" 
        style="position: fixed; top: 0; border: 0; right: 0; z-index: 1000;" 
        aria-hidden="true"
        class="github-corner-svg"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" class="corner-bg"></path>
        <path 
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" 
          fill="currentColor" 
          style="transform-origin: 130px 106px;" 
          class="octo-arm"
        ></path>
        <path 
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" 
          fill="currentColor" 
          class="octo-body"
        ></path>
      </svg>
    </div>

    <!-- Expanded Info Panel -->
    <div 
        v-if="isExpanded" 
        ref="panelElement"
        class="github-info-panel"
        @click.stop
      >
        <!-- Panel Header -->
        <div ref="panelHeader" class="panel-header">
          <h3 class="panel-title">
            <span class="title-glow flex"> <img src="/hyperdrive-logo.png" :alt="t('github.title')" class="w-8 mr-1" /> {{ t('github.title') }}</span>
          </h3>
          <button 
            @click="closePanel" 
            class="close-btn"
            :aria-label="t('github.closeLabel')"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
            </svg>
          </button>
        </div>

        <!-- GitHub Stats -->
        <div ref="statsSection" class="stats-section">
          <div class="stat-item">
            <span class="stat-value">{{ githubStats.stars }}</span>
            <span class="stat-label">{{ t('github.stats.stars') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ githubStats.forks }}</span>
            <span class="stat-label">{{ t('github.stats.forks') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ githubStats.watchers }}</span>
            <span class="stat-label">{{ t('github.stats.watchers') }}</span>
          </div>
        </div>

        <!-- Portfolio Info -->
        <div ref="infoSection" class="info-section">
          <h4 class="section-title">{{ t('github.about.title') }}</h4>
          <p class="project-description">
            {{ t('github.about.description') }}
          </p>
        </div>

        <!-- Action Links -->
        <div ref="linksSection" class="links-section">
          <HyperdriveButton
            href="https://github.com/juanlias/hyperdrive-portfolio"
            target="_blank"
            variant="primary"
            size="md"
          >
            <template #icon-left>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </template>
            {{ t('github.actions.viewCode') }}
          </HyperdriveButton>
        </div>

        <!-- Hologram glow effect -->
        <div class="panel-glow"></div>
      </div>

      <!-- Backdrop -->
      <div 
        v-if="isExpanded" 
        class="panel-backdrop"
        @click="closePanel"
      ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
import HyperdriveButton from './ui/HyperdriveButton.vue'

const { t } = useI18n()

// GitHub Corner Component with interactive panel
const isExpanded = ref(false)
const githubStats = ref({
  stars: 0,
  forks: 0,
  watchers: 0
})

// Template refs for animations
const panelElement = ref(null)
const panelHeader = ref(null)
const statsSection = ref(null)
const infoSection = ref(null)
const linksSection = ref(null)

// Animation timeline
let tl = null

const togglePanel = () => {
  isExpanded.value = !isExpanded.value
}

const closePanel = () => {
  if (isExpanded.value) {
    animateOut()
  }
}

// Watch for panel open/close
watch(() => isExpanded.value, (newValue) => {
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
  
  // Set initial states
  gsap.set(panelElement.value, { 
    scaleX: 0.1,
    scaleY: 1,
    opacity: 0,
    transformOrigin: "right center"
  })
  gsap.set([panelHeader.value, statsSection.value, infoSection.value, linksSection.value], {
    opacity: 0,
    y: 20
  })
  
  // Animate panel expansion
  tl.to(panelElement.value, {
    scaleX: 1,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out"
  })
  
  // Animate content sequentially
  tl.to(panelHeader.value, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out"
  }, 0.3)
  
  tl.to(statsSection.value, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out"
  }, 0.5)
  
  tl.to(infoSection.value, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out"
  }, 0.7)
  
  tl.to(linksSection.value, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out"
  }, 0.9)
  
  // Add hologram effects
  tl.call(() => {
    startHologramEffects()
  }, null, 1.2)
}

const animateOut = () => {
  if (tl) tl.kill()
  
  tl = gsap.timeline({
    onComplete: () => {
      isExpanded.value = false
    }
  })
  
  // Animate content out
  tl.to([panelHeader.value, statsSection.value, infoSection.value, linksSection.value], {
    opacity: 0,
    y: 15,
    duration: 0.2,
    ease: "power2.in"
  })
  
  // Compress panel
  tl.to(panelElement.value, {
    scaleX: 0.1,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in"
  }, 0.1)
}

const startHologramEffects = () => {
  // Subtle glow animation
  gsap.to('.panel-glow', {
    opacity: 0.15,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  })
}

// Fetch GitHub repository stats
const fetchGitHubStats = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/juanlias/hyperdrive-portfolio')
    const data = await response.json()
    githubStats.value = {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      watchers: data.watchers_count || 0
    }
  } catch (error) {
    console.log('Error fetching GitHub stats:', error)
  }
}

onMounted(() => {
  fetchGitHubStats()
})
</script>


<style scoped>
.github-corner-container {
  @apply fixed top-0 right-0 z-[2000];
}

/* GitHub Corner Icon */
.github-corner {
  @apply transition-all duration-300;
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

.github-corner:hover {
  @apply scale-110;
}

.github-corner.expanded {
  @apply opacity-90;
}

.github-corner-svg {
  filter: drop-shadow(0 0 10px rgba(var(--primary-color), 0.5));
  @apply transition-all duration-300;
}

.corner-bg {
  fill: var(--primary-color);
  color: #0a0a0a;
}

.octo-arm,
.octo-body {
  color: #0a0a0a;
}

@keyframes octocat-wave {
  0%, 100% { transform: rotate(0) }
  20%, 60% { transform: rotate(-25deg) }
  40%, 80% { transform: rotate(10deg) }
}

/* Info Panel */
.github-info-panel {
  @apply fixed top-5 right-5 w-96 max-h-[90vh] overflow-y-auto rounded-xl p-6 z-[999];
  perspective: 1500px;
  transform-style: preserve-3d;
  background: linear-gradient(135deg, 
    rgba(10, 10, 10, 0.95) 0%, 
    rgba(20, 20, 30, 0.95) 50%, 
    rgba(10, 10, 10, 0.95) 100%);
  border: 2px solid var(--primary-color);
  box-shadow: 
    0 0 30px rgba(var(--primary-color-rgb), 0.3),
    inset 0 0 30px rgba(var(--primary-color-rgb), 0.1);
  backdrop-filter: blur(10px);
}

.panel-backdrop {
  @apply fixed inset-0 w-screen h-screen z-[998];
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

/* Panel Header */
.panel-header {
  @apply flex justify-between items-center mb-5 pb-4;
  border-bottom: 1px solid rgba(var(--primary-color-rgb), 0.3);
}

.panel-title {
  @apply m-0 text-2xl font-bold;
  color: var(--primary-color);
}

.title-glow {
  text-shadow: 0 0 20px rgba(var(--primary-color-rgb), 0.8);
  animation: glow-pulse 2s ease-in-out infinite alternate;
}

@keyframes glow-pulse {
  from { text-shadow: 0 0 20px rgba(var(--primary-color-rgb), 0.8); }
  to { text-shadow: 0 0 30px rgba(var(--primary-color-rgb), 1), 0 0 40px rgba(var(--primary-color-rgb), 0.5); }
}

.close-btn {
  @apply bg-transparent border-none cursor-pointer p-2 rounded-md transition-all duration-300;
  color: var(--primary-color);
}

.close-btn:hover {
  @apply scale-110;
  background: rgba(var(--primary-color-rgb), 0.1);
  text-shadow: 0 0 10px currentColor;
  filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5));
}

/* Stats Section */
.stats-section {
  @apply flex gap-4 mb-6;
}

.stat-item {
  @apply flex-1 text-center p-3 rounded-lg border transition-all duration-300;
  background: rgba(var(--primary-color-rgb), 0.1);
  border-color: rgba(var(--primary-color-rgb), 0.3);
}

.stat-item:hover {
  @apply -translate-y-1;
  background: rgba(var(--primary-color-rgb), 0.2);
}

.stat-value {
  @apply block text-xl font-bold mb-1;
  color: var(--primary-color);
}

.stat-label {
  @apply block text-sm text-zinc-400;
}

/* Sections */
.info-section,
.links-section {
  @apply mb-5;
}

.section-title {
  @apply text-lg font-semibold mb-3;
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(var(--primary-color-rgb), 0.5);
}

.project-description {
  @apply text-gray-300 leading-relaxed text-sm;
}

/* Action Links */
.links-section {
  @apply flex gap-3;
}

/* Hologram Effects */
.panel-glow {
  @apply absolute inset-0 rounded-lg pointer-events-none -z-10;
  background: linear-gradient(
    to top,
    rgba(var(--primary-color-rgb), 0.1) 0%,
    rgba(var(--primary-color-rgb), 0.05) 50%,
    transparent 100%
  );
}

/* Responsive */
@media (max-width: 768px) {
  .github-info-panel {
    @apply w-[90vw] right-[5vw] left-[5vw] p-5;
  }
  
  .stats-section {
    @apply flex-col gap-2;
  }
  
  .links-section {
    @apply flex-col;
  }
}

/* Scrollbar styling */
.github-info-panel::-webkit-scrollbar {
  @apply w-2;
}

.github-info-panel::-webkit-scrollbar-track {
  @apply rounded;
  background: rgba(var(--primary-color-rgb), 0.1);
}

.github-info-panel::-webkit-scrollbar-thumb {
  @apply rounded;
  background: rgba(var(--primary-color-rgb), 0.5);
}

.github-info-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--primary-color-rgb), 0.7);
}
</style>
