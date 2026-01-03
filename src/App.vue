<template>
  <div class="relative w-full min-h-screen">
    <!-- Router View for Page Content -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
  import { useTheme } from "./composables/useTheme";
  import { useSmoothScroll } from "./composables/useSmoothScroll";

  // Initialize theme globally
  useTheme();
  // Initialize smooth scroll
  useSmoothScroll();
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
