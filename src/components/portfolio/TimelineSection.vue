<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const timelineItems = computed(() => tm('timeline.items'))
</script>

<template>
  <section data-anim="section" class="sw-panel p-6 rounded-lg space-y-4">
    <h2 class="sw-heading text-xl">{{ t('timeline.title') }}</h2>
    <div class="space-y-6 border-l-2 ml-3 pl-8 pt-2 timeline-border">
      <div 
        v-for="(item, index) in timelineItems" 
        :key="index" 
        class="relative timeline-item"
      >
        <h3 class="font-bold text-white">{{ item.period }} / {{ item.position }}</h3>
        <p class="text-sm text-gray-400">{{ item.company }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-border {
  border-color: var(--primary-darker);
}
</style>
