import { onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  const animations = [];

  const initAnimations = () => {
    // Reveal sections with .gsap-fade-up class
    const sections = document.querySelectorAll(".gsap-fade-up");

    sections.forEach((section) => {
      // Skip if element is already in viewport (handled by entrance animation)
      if (ScrollTrigger.isInViewport(section)) {
        gsap.set(section, { opacity: 1, y: 0 });
        return;
      }

      // Set initial state
      gsap.set(section, {
        y: 50,
        opacity: 0,
      });

      // Create animation
      const anim = gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Trigger when top of element hits 85% of viewport
          end: "bottom 20%",
          toggleActions: "play none none reverse", // Play on enter, reverse on leave back up
          // markers: true // Uncomment for debugging
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      animations.push(anim);
    });
  };

  const cleanupAnimations = () => {
    animations.forEach((anim) => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    });
    // Kill all ScrollTriggers created by this component instance
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };

  // Refresh ScrollTrigger when content changes/resizes
  const refresh = () => {
    ScrollTrigger.refresh();
  };

  return {
    initAnimations,
    cleanupAnimations,
    refresh,
  };
}
