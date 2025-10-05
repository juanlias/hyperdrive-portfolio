<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'

const props = defineProps({
  inline: {
    type: Boolean,
    default: false
  }
})

const { t } = useI18n()
const { currentTheme, themes, setTheme } = useTheme()
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const selectTheme = (themeId) => {
  setTheme(themeId)
  isOpen.value = false
}
</script>

<template>
  <div :class="inline ? 'relative' : 'fixed top-6 left-6 z-50'">
    <button 
      @click="toggleMenu"
      class="panel-selector-btn group"
      :class="{ 'active': isOpen }"
    >
      <div class="selector-icon-wrapper">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 transition-transform duration-300" 
          :class="{ 'rotate-180': isOpen }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" 
          />
        </svg>
      </div>
      <span class="selector-indicator" :style="{ backgroundColor: themes[currentTheme].color }"></span>
    </button>

    <transition name="slide-fade">
      <div 
        v-if="isOpen" 
        :class="[
          'theme-menu bg-gray-900/90 backdrop-blur-md rounded-lg p-4 border border-gray-700 shadow-2xl min-w-[280px]',
          inline ? 'mb-3 absolute bottom-full left-1/2 transform -translate-x-1/2 z-50' : 'mt-3'
        ]"
      >
        <h3 class="text-sm font-orbitron font-bold text-gray-300 mb-3 flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full" :style="{ backgroundColor: themes[currentTheme].color }"></span>
          {{ t('theme.title') }}
        </h3>
        
        <div class="space-y-2">
          <button
            v-for="theme in themes"
            :key="theme.id"
            @click="selectTheme(theme.id)"
            class="theme-option w-full text-left p-3 rounded-lg transition-all duration-200 group"
            :class="currentTheme === theme.id ? 'theme-active' : 'hover:bg-gray-800/50'"
          >
            <div class="flex items-center gap-3">
              <div 
                class="lightsaber-preview w-8 h-1 rounded-full transition-all duration-300"
                :style="{ 
                  backgroundColor: theme.color,
                  boxShadow: currentTheme === theme.id ? `0 0 10px ${theme.color}` : `0 0 5px ${theme.color}`
                }"
              ></div>
              <div class="flex-1">
                <div class="font-semibold text-sm" :style="{ color: theme.color }">
                  {{ t(`theme.themes.${theme.id}.name`) }}
                </div>
                <div class="text-xs text-gray-500">{{ t(`theme.themes.${theme.id}.description`) }}</div>
                <div class="text-xs font-mono" :style="{ color: theme.color, opacity: 0.8 }">
                  {{ t(`theme.themes.${theme.id}.crystal`) }}
                </div>
              </div>
              <svg 
                v-if="currentTheme === theme.id"
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 check-icon" 
                :style="{ color: theme.color }"
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fill-rule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clip-rule="evenodd" 
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.panel-selector-btn {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid var(--primary-darker);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.panel-selector-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  opacity: 0;
  transition: all 0.5s ease;
}

.panel-selector-btn:hover::before {
  left: 100%;
  opacity: 0.3;
}

.panel-selector-btn:hover {
  border-color: var(--primary-color);
  background: rgba(30, 30, 30, 0.9);
  box-shadow: 0 0 15px var(--panel-glow);
}

.panel-selector-btn.active {
  border-color: var(--primary-color);
  box-shadow: 0 0 20px var(--panel-glow), inset 0 0 10px var(--panel-glow);
}

.selector-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-light);
}

.selector-indicator {
  width: 24px;
  height: 2px;
  border-radius: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px currentColor;
}

.panel-selector-btn:hover .selector-indicator {
  width: 32px;
  height: 3px;
}

.theme-menu {
  animation: slideDown 0.3s ease-out;
}

.theme-option {
  border: 1px solid transparent;
}

.theme-option:hover {
  border-color: rgba(107, 114, 128, 0.3);
}

.theme-active {
  background-color: rgba(17, 24, 39, 0.7) !important;
  border: 1px solid var(--primary-darker) !important;
}

.lightsaber-preview {
  transition: all 0.3s ease;
}

.theme-option:hover .lightsaber-preview {
  transform: scaleX(1.2);
}

.check-icon {
  animation: checkPop 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes checkPop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
</style>
