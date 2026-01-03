<script setup>
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  const triggerEasterEgg = () => {
    window.dispatchEvent(new CustomEvent("hyperdrive-easter-egg"));
  };
</script>

<template>
  <footer
    data-anim="section"
    class="text-center text-gray-500 text-sm pb-24 flex flex-col items-center gap-2"
  >
    <p>{{ t("footer.copyright", { year: currentYear }) }}</p>
    <p
      class="text-xs opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-cell select-none font-mono"
      @click="triggerEasterEgg"
      title="System Version"
    >
      v0.9.2-beta
    </p>
  </footer>
</template>
