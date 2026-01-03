<template>
  <!-- Fixed Background Layer -->
  <transition name="fade">
    <div
      v-if="isVisible"
      class="portfolio-grid-bg fixed inset-0 z-0 pointer-events-none"
    ></div>
  </transition>

  <!-- Scrollable Content Layer -->
  <transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
    :css="false"
  >
    <div
      v-if="isVisible"
      class="portfolio-content relative z-10 w-full min-h-screen p-4 md:p-8 pb-24 md:pb-28 flex flex-col items-center justify-center"
    >
      <div class="w-full max-w-5xl mx-auto space-y-12">
        <PortfolioHeader class="gsap-fade-up" />
        <AboutSection class="gsap-fade-up" />
        <TimelineSection class="gsap-fade-up" />
        <ProjectsSection
          class="gsap-fade-up"
          @modal-open="$emit('modal-open')"
          @modal-close="$emit('modal-close')"
        />
        <TestimonialsSection class="gsap-fade-up" />
        <ContactSection class="gsap-fade-up" />
        <PortfolioFooter class="gsap-fade-up" />
      </div>
    </div>
  </transition>
</template>
<script setup>
  import { gsap } from "gsap";
  import { onMounted, onUnmounted, nextTick } from "vue";
  import { useScrollAnimations } from "../composables/useScrollAnimations";
  import GithubCorner from "./GithubCorner.vue";
  import PortfolioHeader from "./portfolio/PortfolioHeader.vue";
  import AboutSection from "./portfolio/AboutSection.vue";
  import TimelineSection from "./portfolio/TimelineSection.vue";
  import ProjectsSection from "./portfolio/ProjectsSection.vue";
  import TestimonialsSection from "./portfolio/TestimonialsSection.vue";
  import ContactSection from "./portfolio/ContactSection.vue";
  import PortfolioFooter from "./portfolio/PortfolioFooter.vue";

  const props = defineProps({
    isVisible: Boolean,
  });

  const emit = defineEmits(["returnToSpace", "modal-open", "modal-close"]);
  const { initAnimations, cleanupAnimations } = useScrollAnimations();

  const onBeforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = "scale(0.5)";
    gsap.set(el.querySelectorAll('[data-anim="section"]'), {
      opacity: 0,
      y: 30,
    });
  };

  const onEnter = (el, done) => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline({
      onComplete: () => {
        done();
        // Initialize ScrollTrigger animations after entry animation completes
        nextTick(() => {
          initAnimations();
        });
      },
    });

    tl.to(el, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }).to(
      el.querySelectorAll('[data-anim="section"]'),
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.7"
    );
  };

  const onLeave = (el, done) => {
    // Kill scroll animations before leaving
    cleanupAnimations();

    const tl = gsap.timeline({ onComplete: done });
    tl.to(el.querySelectorAll('[data-anim="section"]'), {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.3,
      ease: "power3.in",
    }).to(
      el,
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: "power3.in",
      },
      "-=0.2"
    );
  };
</script>

<style scoped>
  .portfolio-grid-bg {
    background-color: #0a0a0a;
    background-image: linear-gradient(var(--grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
    background-size: 2rem 2rem;
  }
</style>
