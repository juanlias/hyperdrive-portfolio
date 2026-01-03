import Lenis from "lenis";
import { onMounted, onUnmounted } from "vue";

export function useSmoothScroll() {
  let lenis = null;

  onMounted(() => {
    // Initialize Lenis
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  onUnmounted(() => {
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  });

  return {
    lenis,
  };
}
