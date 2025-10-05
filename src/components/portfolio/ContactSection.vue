<script setup>
import { useI18n } from 'vue-i18n'
import HyperdriveButton from '../ui/HyperdriveButton.vue'

const { t } = useI18n()

const handleContactClick = () => {
  // Aquí puedes agregar lógica adicional si es necesario
  console.log('Contact button clicked!')
}
</script>

<template>
  <section data-anim="section" class="sw-panel p-6 rounded-lg text-center space-y-6">
    <div class="space-y-4">
      <h2 class="sw-heading text-2xl">{{ t('contact.title') }}</h2>
      <p class="text-gray-300 text-lg max-w-2xl mx-auto">
        {{ t('contact.description') }}
      </p>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <HyperdriveButton
        :href="'mailto:contact@juanlias.com'"
        class="action-btn"
        @click="handleContactClick"
      >
        <template #icon-left>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </template>
        {{ t('contact.button') }}
        <template #icon-right>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </template>
      </HyperdriveButton>
      
      <!-- Botón secundario de ejemplo -->
      <HyperdriveButton
        class="action-btn"
        @click="() => console.log('Secondary action')"
      >
        <template #icon-left>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </template>
        {{ t('contact.chat', 'Chat') }}
      </HyperdriveButton>
    </div>
  </section>
</template>

<style scoped>
/* Return pulse animation from CommandPanel */
@keyframes returnPulse {
  0%, 100% {
    box-shadow: 0 0 10px rgba(var(--primary-color-rgb), 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(var(--primary-color-rgb), 0.5), 0 0 30px rgba(var(--primary-color-rgb), 0.3);
  }
}

/* Return pulse animation from CommandPanel */
@keyframes returnPulse {
  0%, 100% {
    box-shadow: 0 0 10px rgba(var(--primary-color-rgb), 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(var(--primary-color-rgb), 0.5), 0 0 30px rgba(var(--primary-color-rgb), 0.3);
  }
}
</style>
