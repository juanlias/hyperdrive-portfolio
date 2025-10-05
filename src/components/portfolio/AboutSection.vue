<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section data-anim="section" class="sw-panel p-6 rounded-lg space-y-4">
    <h2 class="sw-heading text-xl">{{ t('about.title') }}</h2>
    <p class="text-gray-300 leading-relaxed">
      {{ t('about.description') }}
    </p>
  </section>
</template>
