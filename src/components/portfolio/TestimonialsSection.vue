<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const testimonials = computed(() => tm('testimonials.items'))
</script>

<template>
  <section data-anim="section" class="sw-panel p-6 rounded-lg space-y-4">
    <h2 class="sw-heading text-xl">{{ t('testimonials.title') }}</h2>
    <div class="space-y-4">
      <blockquote 
        v-for="(testimonial, index) in testimonials" 
        :key="index"
        class="testimonial-quote p-4 bg-gray-800/50 border-l-4 rounded-r-lg"
      >
        <p class="text-gray-300">"{{ testimonial.quote }}"</p>
        <cite class="block text-right not-italic mt-2 text-sm font-semibold text-white">
          - {{ testimonial.author }}, {{ testimonial.position }}
        </cite>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.testimonial-quote {
  border-left-color: var(--primary-color);
}
</style>
