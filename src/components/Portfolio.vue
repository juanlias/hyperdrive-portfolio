<template>
  <transition 
    @before-enter="onBeforeEnter" 
    @enter="onEnter" 
    @leave="onLeave" 
    :css="false"
  >
    <div 
      v-if="isVisible" 
      class="portfolio-container fixed inset-0 p-4 md:p-8 pb-24 md:pb-28 items-center justify-center overflow-y-auto"
    >
      <div class="w-full max-w-5xl mx-auto space-y-12">
        <PortfolioHeader />
        <AboutSection />
        <TimelineSection />
        <ProjectsSection @modal-open="$emit('modal-open')" @modal-close="$emit('modal-close')" />
        <TestimonialsSection />
        <ContactSection />
        <PortfolioFooter />
      </div>
    </div>
  </transition>
</template>
<script setup>
import { gsap } from 'gsap'
import GithubCorner from './GithubCorner.vue'
import PortfolioHeader from './portfolio/PortfolioHeader.vue'
import AboutSection from './portfolio/AboutSection.vue'
import TimelineSection from './portfolio/TimelineSection.vue'
import ProjectsSection from './portfolio/ProjectsSection.vue'
import TestimonialsSection from './portfolio/TestimonialsSection.vue'
import ContactSection from './portfolio/ContactSection.vue'
import PortfolioFooter from './portfolio/PortfolioFooter.vue'

const props = defineProps({
  isVisible: Boolean
})

const emit = defineEmits(['returnToSpace', 'modal-open', 'modal-close'])

const onBeforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'scale(0.5)'
  gsap.set(el.querySelectorAll('[data-anim="section"]'), { opacity: 0, y: 30 })
}

const onEnter = (el, done) => {
  const tl = gsap.timeline({ onComplete: done })
  tl.to(el, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' })
    .to(el.querySelectorAll('[data-anim="section"]'), { 
      opacity: 1, 
      y: 0, 
      stagger: 0.1, 
      duration: 0.6, 
      ease: 'power3.out' 
    }, "-=0.7")
}

const onLeave = (el, done) => {
  const tl = gsap.timeline({ onComplete: done })
  tl.to(el.querySelectorAll('[data-anim="section"]'), { 
      opacity: 0, 
      y: 20, 
      stagger: 0.05, 
      duration: 0.3, 
      ease: 'power3.in' 
    })
    .to(el, { 
      opacity: 0, 
      scale: 0.5, 
      duration: 0.8, 
      ease: 'power3.in' 
    }, "-=0.2")
}
</script>

<style scoped>
.portfolio-container {
  /* Use theme variables */
  background-image: 
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: 2rem 2rem;
}
</style>
