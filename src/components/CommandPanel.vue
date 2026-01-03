<template>
  <transition name="panel-slide" appear>
    <nav
      v-show="isPortfolioVisible && !props.isModalOpen"
      class="command-panel-wrapper fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div
        class="command-panel-container max-w-6xl mx-auto px-4 pointer-events-auto"
      >
        <!-- Command Panel -->
        <div
          class="command-panel backdrop-blur-md rounded-t-2xl overflow-hidden"
          :class="{
            booting: exposedIsBooting,
          }"
        >
          <!-- Top Border with Hex Pattern -->
          <div
            class="panel-top-border h-1 w-full"
            :class="{ translating: exposedIsTranslating }"
          ></div>

          <!-- Main Panel Content -->
          <div
            class="panel-content p-4 relative z-10"
            :class="{ 'content-expanded': exposedCurrentView !== VIEWS.MAIN }"
          >
            <!-- MAIN VIEW -->
            <transition name="view-fade" mode="out-in">
              <div
                v-if="exposedCurrentView === VIEWS.MAIN"
                key="main"
                class="flex items-center justify-between gap-4"
              >
                <!-- Left Section: Status Indicators -->
                <div class="flex items-center gap-3">
                  <!-- System Status -->
                  <div class="status-group hidden sm:flex">
                    <div class="status-lights">
                      <div
                        class="status-light active"
                        :style="{ backgroundColor: themes[currentTheme].color }"
                      ></div>
                      <div
                        class="status-light active"
                        :style="{ backgroundColor: themes[currentTheme].color }"
                      ></div>
                      <div class="status-light"></div>
                    </div>
                    <span class="status-label">SYS</span>
                  </div>

                  <!-- Connection Indicator -->
                  <div class="status-group hidden md:flex">
                    <div class="signal-bars">
                      <div
                        class="signal-bar active"
                        :style="{ backgroundColor: themes[currentTheme].color }"
                      ></div>
                      <div
                        class="signal-bar active"
                        :style="{ backgroundColor: themes[currentTheme].color }"
                      ></div>
                      <div
                        class="signal-bar active"
                        :style="{ backgroundColor: themes[currentTheme].color }"
                      ></div>
                      <div
                        class="signal-bar active"
                        :style="{ backgroundColor: themes[currentTheme].color }"
                      ></div>
                    </div>
                    <span class="status-label">CONN</span>
                  </div>
                </div>

                <!-- Center Section: Controls -->
                <div class="flex items-center gap-2 flex-1 justify-center">
                  <!-- Theme Selector Button -->
                  <button @click="showThemeSelector" class="panel-selector-btn">
                    <div class="selector-icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2l8 4.618v9.236l-8 4.618-8-4.618V6.618L12 2z"
                        />
                      </svg>
                    </div>
                    <span
                      class="text-xs font-bold tracking-wider font-orbitron"
                      style="color: var(--primary-light)"
                    >
                      Kyber
                    </span>
                    <span
                      class="selector-indicator"
                      :style="{ backgroundColor: themes[currentTheme].color }"
                    ></span>
                  </button>

                  <!-- Divider -->
                  <div class="panel-divider hidden sm:block"></div>

                  <!-- Language Selector Button -->
                  <button
                    @click="showLanguageSelector"
                    class="panel-selector-btn"
                  >
                    <div class="selector-icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                    </div>
                    <div class="selector-label">
                      <span
                        class="text-xs font-bold tracking-wider font-orbitron"
                        style="color: var(--primary-light)"
                      >
                        {{ locale.toUpperCase() }}
                      </span>
                    </div>
                  </button>
                </div>

                <!-- Right Section: Return to Space Button -->
                <div class="flex items-center gap-2">
                  <button
                    @click="handleReturnToSpace"
                    class="return-to-space-btn"
                    :title="t('buttons.returnToSpace')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </transition>

            <!-- THEME SELECTOR VIEW -->
            <transition name="view-fade">
              <div
                v-if="exposedCurrentView === VIEWS.THEMES"
                class="view-container"
              >
                <div class="view-header">
                  <button
                    @click="returnToMain"
                    class="back-btn"
                    :disabled="exposedIsThemeChanging"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <h3 class="view-title">
                    {{
                      exposedIsThemeChanging
                        ? t("theme.changing")
                        : t("theme.title")
                    }}
                    <span
                      v-if="exposedIsThemeChanging"
                      class="changing-indicator"
                    >
                      <svg
                        class="animate-spin h-4 w-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                  </h3>
                </div>

                <div class="options-grid">
                  <button
                    v-for="theme in themes"
                    :key="theme.id"
                    @click="selectTheme(theme.id)"
                    @mouseenter="handleThemeHover(theme.id, true)"
                    @mouseleave="handleThemeHover(theme.id, false)"
                    class="option-card"
                    :class="{
                      active: currentTheme === theme.id,
                      disabled:
                        exposedIsThemeChanging && currentTheme !== theme.id,
                    }"
                    :disabled="
                      exposedIsThemeChanging && currentTheme !== theme.id
                    "
                  >
                    <div
                      class="lightsaber-preview"
                      :style="{
                        backgroundColor: theme.color,
                        boxShadow: `0 0 15px ${theme.color}`,
                      }"
                    ></div>
                    <div class="option-info">
                      <div class="option-name" :style="{ color: theme.color }">
                        {{ t(`theme.themes.${theme.id}.name`) }}
                      </div>
                      <div
                        class="option-crystal"
                        :style="{ color: theme.color, opacity: 0.8 }"
                      >
                        {{ t(`theme.themes.${theme.id}.crystal`) }}
                      </div>
                    </div>
                    <svg
                      v-if="currentTheme === theme.id"
                      xmlns="http://www.w3.org/2000/svg"
                      class="check-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      :style="{ color: theme.color }"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </transition>

            <!-- LANGUAGE SELECTOR VIEW -->
            <transition name="view-fade">
              <div
                v-if="exposedCurrentView === VIEWS.LANGUAGES"
                class="view-container"
              >
                <div class="view-header">
                  <button @click="returnToMain" class="back-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <h3 class="view-title">{{ t("nav.selectLanguage") }}</h3>
                </div>

                <div class="options-grid">
                  <button
                    v-for="lang in LANGUAGES"
                    :key="lang.code"
                    @click="selectLanguage(lang)"
                    class="option-card"
                    :class="{ active: locale === lang.code }"
                  >
                    <div class="option-info flex-1">
                      <div
                        class="option-name"
                        style="color: var(--primary-color)"
                      >
                        {{ t(`languages.${lang.code}`) }}
                      </div>
                    </div>
                    <svg
                      v-if="locale === lang.code"
                      xmlns="http://www.w3.org/2000/svg"
                      class="check-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      style="color: var(--primary-color)"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- Bottom Border with Grid Pattern -->
          <div class="panel-bottom-border h-1 w-full"></div>
        </div>
      </div>
    </nav>
  </transition>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { useTheme } from "../composables/useTheme";
  import { useThemeEffects } from "../composables/useThemeEffects";

  // Component props and emits
  const props = defineProps({
    isPortfolioVisible: {
      type: Boolean,
      default: false,
    },
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["return-to-space"]);

  // Composables
  const { t, locale } = useI18n();
  const { currentTheme, themes, setTheme } = useTheme();
  const { hyperDimensionalTransition, createStarBurst } = useThemeEffects();

  // Reactive state
  const state = ref({
    isBooting: true,
    currentView: "main", // 'main' | 'themes' | 'languages'
    isTranslating: false,
  });

  // Constants
  const VIEWS = {
    MAIN: "main",
    THEMES: "themes",
    LANGUAGES: "languages",
  };

  const LANGUAGES = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "pt", name: "Português" },
    { code: "shavian", name: "Shavian" },
  ];

  const BOOT_DELAY = 1200;
  const LANGUAGE_TRANSITION_DELAY = 100;

  // Computed properties
  const isBooting = computed(() => state.value.isBooting);
  const currentView = computed(() => state.value.currentView);
  const isTranslating = computed(() => state.value.isTranslating);

  // Navigation methods
  const showThemeSelector = () => {
    state.value.currentView = VIEWS.THEMES;
  };

  const showLanguageSelector = () => {
    state.value.currentView = VIEWS.LANGUAGES;
  };

  const returnToMain = () => {
    state.value.currentView = VIEWS.MAIN;
  };

  const handleReturnToSpace = () => {
    emit("return-to-space");
  };

  // Theme selection state
  const isThemeChanging = ref(false);

  // Epic hyperdimensional theme selection - With proper UI control
  const selectTheme = (themeId) => {
    // Early exit if same theme or already changing
    if (currentTheme.value === themeId || isThemeChanging.value) return;

    try {
      // Block other theme selections
      isThemeChanging.value = true;

      // Find the theme button element for origin point
      const themeButtons = document.querySelectorAll(".option-card");
      let originElement = null;

      themeButtons.forEach((button, index) => {
        const themeIds = Object.keys(themes);
        if (themeIds[index] === themeId) {
          originElement = button;
        }
      });

      // Get the new theme color
      const newTheme = themes[themeId];
      const newThemeColor = newTheme.color;

      // Start animations immediately
      if (typeof createStarBurst === "function") {
        try {
          createStarBurst(originElement, newThemeColor);
        } catch (e) {
          /* Silent fail */
        }
      }

      // Apply theme change after a short delay for dramatic effect
      setTimeout(() => {
        setTheme(themeId);
      }, 1000); // Half of animation duration (2000ms / 2)

      // Start the main hyperdimensional transition
      if (typeof hyperDimensionalTransition === "function") {
        try {
          hyperDimensionalTransition(newThemeColor, originElement, 2000); // Reduced from 3500ms to 2000ms
        } catch (e) {
          /* Silent fail */
        }
      }

      // Return to main view and unblock after animation completes
      setTimeout(() => {
        state.value.currentView = VIEWS.MAIN;
        isThemeChanging.value = false;
      }, 2500); // After animation duration + buffer
    } catch (error) {
      console.error("Error selecting theme:", error);
      // Immediate fallback
      setTheme(themeId);
      state.value.currentView = VIEWS.MAIN;
      isThemeChanging.value = false;
    }
  };

  // Language selection with animation
  const selectLanguage = async (lang) => {
    try {
      state.value.isTranslating = true;
      locale.value = lang.code;
      localStorage.setItem("hyperdrive-locale", lang.code);

      // Smooth transition back to main view
      setTimeout(() => {
        state.value.currentView = VIEWS.MAIN;
      }, LANGUAGE_TRANSITION_DELAY);

      setTimeout(() => {
        state.value.isTranslating = false;
      }, LANGUAGE_TRANSITION_DELAY + 200);
    } catch (error) {
      console.error("Error selecting language:", error);
      state.value.isTranslating = false;
    }
  };

  // Add hover effect for theme preview
  const handleThemeHover = (themeId, isHovering) => {
    const root = document.documentElement;
    if (isHovering) {
      root.style.setProperty("--hover-preview-color", themes[themeId].color);
      root.classList.add("theme-preview-active");
    } else {
      root.classList.remove("theme-preview-active");
    }
  };

  // Lifecycle
  onMounted(() => {
    // Simulate realistic boot sequence
    setTimeout(() => {
      state.value.isBooting = false;
    }, BOOT_DELAY);
  });

  // Expose reactive properties for template
  const {
    isBooting: exposedIsBooting,
    currentView: exposedCurrentView,
    isTranslating: exposedIsTranslating,
  } = {
    isBooting,
    currentView,
    isTranslating,
  };

  const exposedIsThemeChanging = isThemeChanging;
</script>

<style scoped>
  /* Command Panel Base Styles */
  .command-panel {
    @apply relative backdrop-blur-sm border border-opacity-50 rounded-t-2xl;
    background: linear-gradient(
      180deg,
      rgba(10, 15, 20, 0.95) 0%,
      rgba(15, 20, 25, 0.98) 100%
    );
    border: 1px solid var(--primary-darker);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5), 0 -1px 3px var(--panel-glow),
      inset 0 1px 1px rgba(255, 255, 255, 0.05);
    animation: panelSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Holographic Background Effects */
  .command-panel::before {
    @apply absolute inset-0 pointer-events-none rounded-t-2xl;
    content: "";
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(var(--primary-color-rgb, 6, 182, 212), 0.03) 2px,
      rgba(var(--primary-color-rgb, 6, 182, 212), 0.03) 4px
    );
    animation: enhancedHologramScan 12s linear infinite;
  }

  .command-panel::after {
    @apply absolute inset-0 pointer-events-none rounded-t-2xl;
    content: "";
    opacity: 0.6;
    background: radial-gradient(
        ellipse at center,
        transparent 0%,
        rgba(var(--primary-color-rgb, 6, 182, 212), 0.05) 100%
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 100px,
        rgba(var(--primary-color-rgb, 6, 182, 212), 0.02) 100px,
        rgba(var(--primary-color-rgb, 6, 182, 212), 0.02) 200px
      );
  }

  /* Boot Animation */
  .command-panel.booting {
    animation: enhancedPanelBoot 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Panel Borders */
  .panel-top-border {
    @apply relative overflow-hidden;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--primary-darker) 20%,
      var(--primary-color) 50%,
      var(--primary-darker) 80%,
      transparent 100%
    );
    animation: borderScan 3s ease-in-out infinite;
  }

  .panel-top-border.translating::after {
    @apply absolute top-0 w-full h-full;
    content: "";
    left: -100%;
    background: linear-gradient(
      90deg,
      transparent,
      var(--primary-color),
      transparent
    );
    animation: translatingBeam 0.8s ease-in-out infinite;
  }

  .panel-bottom-border {
    background: repeating-linear-gradient(
      90deg,
      var(--primary-darker) 0px,
      var(--primary-darker) 2px,
      transparent 2px,
      transparent 10px
    );
  }

  /* Status Components */
  .status-group {
    @apply flex flex-col items-center gap-1;
    animation: statusFadeIn 0.8s ease-out backwards;
  }

  .status-group:nth-child(1) {
    animation-delay: 0.5s;
  }
  .status-group:nth-child(2) {
    animation-delay: 0.6s;
  }
  .status-group:nth-child(3) {
    animation-delay: 0.7s;
  }

  .status-label {
    @apply text-xs font-bold font-orbitron tracking-wider;
    font-size: 0.625rem;
    letter-spacing: 0.8px;
    color: var(--primary-light);
  }

  /* Status Lights */
  .status-lights {
    @apply flex gap-1;
  }

  .status-light {
    @apply w-2 h-2 rounded-full border border-gray-600 transition-all duration-300;
    background: #2a2a2a;
  }

  .status-light.active {
    box-shadow: 0 0 8px currentColor;
    animation: blink 2s ease-in-out infinite;
  }

  /* Signal Bars */
  .signal-bars {
    @apply flex items-end gap-0.5 h-5;
  }

  .signal-bar {
    @apply w-1 border border-gray-600 transition-all duration-300;
    background: #2a2a2a;
  }

  .signal-bar:nth-child(1) {
    @apply h-1.5;
  }
  .signal-bar:nth-child(2) {
    @apply h-2.5;
  }
  .signal-bar:nth-child(3) {
    @apply h-3.5;
  }
  .signal-bar:nth-child(4) {
    @apply h-5;
  }

  .signal-bar.active {
    box-shadow: 0 0 6px currentColor;
  }

  /* Panel Divider */
  .panel-divider {
    @apply w-px h-8;
    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--primary-darker) 20%,
      var(--primary-darker) 80%,
      transparent 100%
    );
  }

  /* Buttons */
  .panel-selector-btn {
    @apply relative flex flex-col items-center justify-center gap-1 border rounded-lg cursor-pointer overflow-hidden px-2 transition-all duration-300;
    min-width: 60px;
    height: 48px;
    background: rgba(20, 20, 20, 0.8);
    border-color: var(--primary-darker);
  }

  .panel-selector-btn::before {
    @apply absolute top-0 w-full h-full opacity-0 transition-all duration-500;
    content: "";
    left: -100%;
    background: linear-gradient(
      90deg,
      transparent,
      var(--primary-color),
      transparent
    );
  }

  .panel-selector-btn:hover::before {
    @apply opacity-30;
    left: 100%;
  }

  .panel-selector-btn:hover {
    background: rgba(30, 30, 30, 0.9);
    border-color: var(--primary-color);
    box-shadow: 0 0 15px var(--panel-glow);
  }

  .selector-icon-wrapper {
    @apply flex items-center justify-center;
    color: var(--primary-light);
  }

  .selector-indicator {
    @apply w-6 h-0.5 rounded-sm transition-all duration-300;
    box-shadow: 0 0 8px currentColor;
  }

  .panel-selector-btn:hover .selector-indicator {
    @apply w-8 h-0.5;
  }

  .selector-label {
    @apply flex items-center justify-center leading-none;
  }

  /* Return to Space Button */
  .return-to-space-btn {
    @apply w-12 h-12 flex items-center justify-center border rounded-lg cursor-pointer transition-all duration-300;
    background: rgba(var(--primary-color-rgb), 0.1);
    border-color: var(--primary-darker);
    color: var(--primary-light);
    animation: returnPulse 2s ease-in-out infinite;
  }

  .return-to-space-btn:hover {
    @apply transform scale-110;
    background: rgba(var(--primary-color-rgb), 0.3);
    border-color: var(--primary-color);
    box-shadow: 0 0 20px var(--primary-glow);
  }

  /* View Container */
  .view-container {
    @apply w-full;
  }

  .view-header {
    @apply flex items-center gap-3 mb-4;
  }

  .back-btn {
    @apply w-9 h-9 flex items-center justify-center border rounded-md cursor-pointer transition-all duration-200;
    background: rgba(var(--primary-color-rgb), 0.1);
    border-color: var(--primary-darker);
    color: var(--primary-light);
  }

  .back-btn:hover {
    background: rgba(var(--primary-color-rgb), 0.2);
    border-color: var(--primary-color);
    box-shadow: 0 0 10px var(--panel-glow);
  }

  .back-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .view-title {
    @apply text-sm font-bold font-orbitron tracking-wider uppercase flex items-center;
    color: var(--primary-light);
  }

  .changing-indicator {
    @apply flex items-center;
    color: var(--primary-color);
  }

  /* Options Grid */
  .options-grid {
    @apply grid gap-3 max-h-48 overflow-y-auto pr-2;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .options-grid::-webkit-scrollbar {
    @apply w-1.5;
  }

  .options-grid::-webkit-scrollbar-track {
    @apply rounded-sm;
    background: rgba(0, 0, 0, 0.3);
  }

  .options-grid::-webkit-scrollbar-thumb {
    @apply rounded-sm;
    background: var(--primary-darker);
  }

  .options-grid::-webkit-scrollbar-thumb:hover {
    background: var(--primary-dark);
  }

  /* Option Card - Enhanced with hover effects */
  .option-card {
    @apply flex items-center gap-2 px-2 py-1 border rounded-lg cursor-pointer transition-all duration-300;
    background: rgba(20, 20, 20, 0.8);
    border-color: var(--primary-darker);
    position: relative;
    overflow: hidden;
  }

  .option-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      var(--primary-color),
      transparent
    );
    opacity: 0;
    transition: all 0.6s ease;
  }

  .option-card:hover::before {
    left: 100%;
    opacity: 0.1;
  }

  .option-card:hover {
    background: rgba(30, 30, 30, 0.9);
    border-color: var(--primary-color);
    box-shadow: 0 0 15px var(--panel-glow);
  }

  .option-card.active {
    background: rgba(var(--primary-color-rgb), 0.15);
    border-color: var(--primary-color);
    box-shadow: 0 0 20px var(--panel-glow), inset 0 0 10px var(--panel-glow);
    transform: scale(1.02);
  }

  .option-card.active::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      transparent 60%,
      var(--primary-color) 10 100%
    );
    pointer-events: none;
  }

  /* Disabled state for theme buttons */
  .option-card.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  .option-card.disabled:hover {
    transform: none;
    border-color: var(--primary-darker);
    box-shadow: none;
  }

  .option-card.disabled .lightsaber-preview {
    filter: grayscale(1);
    opacity: 0.5;
  }

  /* Enhanced lightsaber preview with pulsing effect */
  .lightsaber-preview {
    @apply w-7 h-1 rounded-sm flex-shrink-0;
    position: relative;
    transition: all 0.3s ease;
  }

  .option-card:hover .lightsaber-preview {
    transform: scaleX(1.2);
    filter: brightness(1.3);
  }

  .option-card.active .lightsaber-preview {
    animation: lightsaberPulse 2s ease-in-out infinite;
  }

  .option-info {
    @apply flex-1 min-w-0;
  }

  .option-name {
    @apply font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis;
  }

  .option-crystal {
    @apply text-xs font-orbitron font-medium whitespace-nowrap overflow-hidden text-ellipsis mt-0.5;
  }

  .check-icon {
    @apply w-6 h-6 flex-shrink-0;
    animation: checkPop 0.3s ease-out;
  }

  /* Responsive Styles */
  @media (max-width: 640px) {
    .panel-content {
      @apply p-3;
    }

    .status-group {
      @apply gap-0.5;
    }

    .status-label {
      @apply text-xs;
      font-size: 0.5rem;
    }

    .options-grid {
      @apply grid-cols-1 max-h-44;
    }

    .option-card {
      @apply p-2.5;
    }

    .option-name {
      @apply text-sm;
      font-size: 0.8rem;
    }

    .option-crystal {
      font-size: 0.65rem;
    }

    .lightsaber-preview {
      @apply w-8;
    }

    .view-title {
      @apply text-xs;
    }
  }

  /* Panel Transition Animations */
  .panel-slide-enter-active {
    @apply transition-all duration-700;
    transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .panel-slide-leave-active {
    @apply transition-all duration-500;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .panel-slide-enter-from {
    @apply transform translate-y-full opacity-0;
  }

  .panel-slide-leave-to {
    @apply transform translate-y-full opacity-0;
  }

  /* Enhanced Boot Animation */
  .command-panel.booting {
    animation: enhancedPanelBoot 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes enhancedPanelBoot {
    0% {
      transform: translateY(150%) scale(0.9);
      opacity: 0;
    }
    30% {
      transform: translateY(150%) scale(0.9);
      opacity: 0;
    }
    60% {
      transform: translateY(-8px) scale(1.02);
      opacity: 0.8;
    }
    80% {
      transform: translateY(4px) scale(0.98);
      opacity: 0.9;
    }
    90% {
      transform: translateY(-2px) scale(1.01);
      opacity: 0.95;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  /* Enhanced Holographic Effects */
  .command-panel::before {
    animation: enhancedHologramScan 12s linear infinite;
  }

  @keyframes enhancedHologramScan {
    0% {
      transform: translateY(0) scaleY(1);
      opacity: 0.8;
    }
    25% {
      transform: translateY(10px) scaleY(1.1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(20px) scaleY(1);
      opacity: 0.9;
    }
    75% {
      transform: translateY(30px) scaleY(0.9);
      opacity: 0.7;
    }
    100% {
      transform: translateY(40px) scaleY(1);
      opacity: 0.8;
    }
  }

  /* New lightsaber pulse animation */
  @keyframes lightsaberPulse {
    0%,
    100% {
      box-shadow: 0 0 8px currentColor;
      transform: scaleX(1);
    }
    50% {
      box-shadow: 0 0 16px currentColor, 0 0 24px currentColor;
      transform: scaleX(1.1);
    }
  }

  /* Enhanced check icon animation */
  @keyframes checkPop {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.3) rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: scale(1) rotate(360deg);
      opacity: 1;
    }
  }

  /* Theme selection glow effect */
  @keyframes themeSelectionGlow {
    0% {
      box-shadow: 0 0 10px var(--primary-color);
    }
    50% {
      box-shadow: 0 0 30px var(--primary-color), 0 0 50px var(--primary-color);
    }
    100% {
      box-shadow: 0 0 10px var(--primary-color);
    }
  }

  .option-card.selecting {
    animation: themeSelectionGlow 0.8s ease-in-out;
  }

  /* Theme preview hover effects */
  :root.theme-preview-active {
    --preview-glow: var(--hover-preview-color);
  }

  :root.theme-preview-active .command-panel {
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5), 0 -1px 3px var(--preview-glow),
      inset 0 1px 1px rgba(255, 255, 255, 0.05);
  }

  :root.theme-preview-active .panel-top-border {
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--primary-darker) 15%,
      var(--hover-preview-color) 50%,
      var(--primary-darker) 85%,
      transparent 100%
    );
  }

  /* Hover Enhancement for Better UX */
  .command-panel:hover {
    animation-play-state: paused;
  }

  .command-panel:hover::before {
    animation-play-state: paused;
    opacity: 1;
  }
</style>
