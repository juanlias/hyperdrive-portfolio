<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer data-anim="section" class="text-center text-gray-500 text-sm pb-24">
    <p>{{ t('footer.copyright', { year: currentYear }) }}</p>
  </footer>
</template>
