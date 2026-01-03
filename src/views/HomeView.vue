<template>
  <div class="home-view">
    <SpaceCanvas
      :isPortfolioVisible="isPortfolioVisible"
      :isWarping="isWarping"
      :isPointerDown="isPointerDown"
      :speed="speed"
      :warpColor="themes[currentTheme].warpColor"
      @should-instant-finish="handleShouldInstantFinish"
      @show-guide="handleShowGuide"
    />

    <!-- Warp Guide -->
    <transition name="fade">
      <div
        v-if="showGuide && isWarping && !isPortfolioVisible"
        class="warp-guide fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-40"
      >
        <div class="text-center mb-8">
          <h2 class="guide-text text-2xl md:text-3xl font-bold mb-2">
            {{ t("space.guideMove") }}
          </h2>
          <p class="guide-subtext text-lg md:text-xl opacity-80">
            {{ t("space.guideHyperspace") }}
          </p>
        </div>

        <!-- Animated Circle Guide -->
        <div class="relative w-24 h-24">
          <div
            class="guide-circle absolute inset-0 rounded-full border-2 border-current opacity-60"
          ></div>
          <div
            class="guide-circle-moving absolute inset-0 rounded-full border-2 border-current"
          ></div>
          <div
            class="guide-dot absolute top-1/2 left-1/2 w-2 h-2 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2"
          ></div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="!isPortfolioVisible && !isWarping"
        class="info-text-container fixed inset-0 flex items-center justify-center pointer-events-none"
      >
        <div class="text-center">
          <h1 class="info-text text-3xl md:text-5xl font-bold">
            {{ t("space.holdToJump") }}
          </h1>
        </div>
      </div>
    </transition>

    <GithubCorner v-if="isPortfolioVisible" />

    <Portfolio
      :isVisible="isPortfolioVisible"
      @return-to-space="returnToSpace"
      @modal-open="handleModalOpen"
      @modal-close="handleModalClose"
    />

    <!-- Command Panel -->
    <CommandPanel
      :isPortfolioVisible="isPortfolioVisible"
      :isModalOpen="isModalOpen"
      @return-to-space="returnToSpace"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import { useI18n } from "vue-i18n";
  import SpaceCanvas from "../components/SpaceCanvas.vue";
  import Portfolio from "../components/Portfolio.vue";
  import GithubCorner from "../components/GithubCorner.vue";
  import CommandPanel from "../components/CommandPanel.vue";
  import { useTheme } from "../composables/useTheme";
  import { useLightsaberEffects } from "../composables/useLightsaberEffects";

  const { t } = useI18n();
  const { currentTheme, themes } = useTheme();
  useLightsaberEffects();

  const isPortfolioVisible = ref(false);
  const isWarping = ref(false);
  const isPointerDown = ref(false);
  const speed = ref(2);
  const isModalOpen = ref(false);
  const shouldInstantFinish = ref(false);
  const showGuide = ref(false);

  const engageWarp = () => {
    if (!isPortfolioVisible.value) {
      isPointerDown.value = true;
      isWarping.value = true;
      speed.value = 30;
    }
  };

  const disengageWarp = () => {
    if (!isPortfolioVisible.value && isWarping.value) {
      isPointerDown.value = false;
      const delay = shouldInstantFinish.value ? 0 : 2000;
      setTimeout(() => {
        isPortfolioVisible.value = true;
        shouldInstantFinish.value = false; // Reset after use
      }, delay);
    }
  };

  const returnToSpace = () => {
    isPortfolioVisible.value = false;
    isWarping.value = false;
    isPointerDown.value = false;
    speed.value = 2;
    isModalOpen.value = false;
    shouldInstantFinish.value = false;
    showGuide.value = false;
  };

  const handleModalOpen = () => {
    isModalOpen.value = true;
  };

  const handleModalClose = () => {
    isModalOpen.value = false;
  };

  const handleShouldInstantFinish = (instant) => {
    shouldInstantFinish.value = instant;
  };

  const handleShowGuide = (show) => {
    showGuide.value = show;
  };

  onMounted(() => {
    document.body.addEventListener("mousedown", engageWarp);
    document.body.addEventListener("mouseup", disengageWarp);
    document.body.addEventListener("touchstart", engageWarp, { passive: true });
    document.body.addEventListener("touchend", disengageWarp);
  });

  onUnmounted(() => {
    document.body.removeEventListener("mousedown", engageWarp);
    document.body.removeEventListener("mouseup", disengageWarp);
    document.body.removeEventListener("touchstart", engageWarp);
    document.body.removeEventListener("touchend", disengageWarp);
  });
</script>

<style scoped>
  .info-text {
    color: var(--primary-light);
    text-shadow: 0 0 20px var(--primary-glow);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Warp Guide Styles */
  .warp-guide {
    color: var(--primary-light);
  }

  .guide-text {
    text-shadow: 0 0 20px var(--primary-glow);
    animation: guide-pulse 2s ease-in-out infinite;
  }

  .guide-subtext {
    text-shadow: 0 0 15px var(--primary-glow);
  }

  .guide-circle {
    border-color: var(--primary-color);
    animation: guide-circle-pulse 2s ease-in-out infinite;
  }

  .guide-circle-moving {
    border-color: var(--primary-light);
    animation: guide-circle-rotate 3s linear infinite;
    border-top-color: transparent;
    border-right-color: transparent;
  }

  .guide-dot {
    background-color: var(--primary-color);
    box-shadow: 0 0 10px var(--primary-glow);
    animation: guide-dot-pulse 1.5s ease-in-out infinite;
  }
  /* Animations from App.vue */
  @keyframes pulse-glow {
    0%,
    100% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
  }

  @keyframes guide-pulse {
    0%,
    100% {
      opacity: 0.9;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-2px);
    }
  }

  @keyframes guide-circle-pulse {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }

  @keyframes guide-circle-rotate {
    0% {
      transform: rotate(0deg);
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotate(360deg);
      opacity: 0.8;
    }
  }

  @keyframes guide-dot-pulse {
    0%,
    100% {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
</style>
