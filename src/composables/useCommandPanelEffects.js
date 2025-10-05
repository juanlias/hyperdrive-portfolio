import { ref } from 'vue'
import { gsap } from 'gsap'

export function useCommandPanelEffects() {
  const isAnimating = ref(false)

  /**
   * Epic theme transition with energy waves and particles using GSAP
   * @param {string} newThemeColor - The new theme color
   * @param {HTMLElement} originElement - The element to originate the effect from
   * @param {number} duration - Duration in milliseconds
   */
  const epicThemeTransition = async (newThemeColor, originElement, duration = 2000) => {
    if (isAnimating.value) return

    isAnimating.value = true
    
    return new Promise((resolve) => {
      // Get origin position
      const rect = originElement?.getBoundingClientRect() || { 
        left: window.innerWidth / 2, 
        top: window.innerHeight / 2 
      }
      const originX = rect.left + rect.width / 2
      const originY = rect.top + rect.height / 2

      // Create container for all effects
      const effectsContainer = document.createElement('div')
      effectsContainer.className = 'theme-transition-effects'
      effectsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
      `

      // Create GSAP timeline
      const tl = gsap.timeline({
        onComplete: () => {
          if (effectsContainer.parentNode) {
            document.body.removeChild(effectsContainer)
          }
          isAnimating.value = false
          resolve()
        }
      })

      // Create energy waves with GSAP
      for (let i = 0; i < 5; i++) {
        const wave = document.createElement('div')
        wave.className = 'energy-wave'
        wave.style.cssText = `
          position: absolute;
          left: ${originX}px;
          top: ${originY}px;
          width: 0;
          height: 0;
          border: 3px solid ${newThemeColor};
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 20px ${newThemeColor}, inset 0 0 20px ${newThemeColor};
          opacity: 1;
        `
        effectsContainer.appendChild(wave)

        tl.to(wave, {
          width: 800,
          height: 800,
          borderWidth: 1,
          opacity: 0,
          duration: (duration * 0.8) / 1000,
          ease: "power2.out",
          delay: i * 0.2
        }, 0)
      }

      // Create floating particles with GSAP
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div')
        particle.className = 'theme-particle'
        const angle = (Math.PI * 2 * i) / 30
        const distance = 100 + Math.random() * 200
        const endX = originX + Math.cos(angle) * distance
        const endY = originY + Math.sin(angle) * distance
        
        particle.style.cssText = `
          position: absolute;
          left: ${originX}px;
          top: ${originY}px;
          width: 4px;
          height: 4px;
          background: ${newThemeColor};
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          box-shadow: 0 0 10px ${newThemeColor};
          opacity: 1;
        `
        effectsContainer.appendChild(particle)

        tl.to(particle, {
          scale: 1.2,
          duration: 0.2,
          ease: "back.out(1.7)",
          delay: i * 0.05
        }, 0.3)
        .to(particle, {
          left: endX,
          top: endY,
          scale: 0,
          opacity: 0,
          duration: (duration * 0.9) / 1000,
          ease: "power2.out"
        }, 0.5 + i * 0.05)
      }

      // Create quantum distortion overlay with GSAP
      const distortion = document.createElement('div')
      distortion.className = 'quantum-distortion'
      distortion.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at ${originX}px ${originY}px, 
          transparent 0%, 
          ${newThemeColor}15 30%, 
          transparent 70%
        );
        mix-blend-mode: screen;
        opacity: 0;
        transform: scale(0.8);
      `
      effectsContainer.appendChild(distortion)

      tl.to(distortion, {
        opacity: 1,
        scale: 1.2,
        duration: duration / 2000,
        ease: "power2.inOut"
      }, 0)
      .to(distortion, {
        opacity: 0,
        scale: 0.8,
        duration: duration / 2000,
        ease: "power2.inOut"
      }, duration / 2000)

      document.body.appendChild(effectsContainer)
    })
  }

  /**
   * Enhanced holographic sweep effect with GSAP
   * @param {number} duration - Duration in milliseconds
   */
  const holographicSweep = async (duration = 1000) => {
    if (isAnimating.value) return

    isAnimating.value = true
    
    return new Promise((resolve) => {
      // Create multiple sweep layers for depth
      const sweepLayers = []
      
      for (let i = 0; i < 3; i++) {
        const sweepElement = document.createElement('div')
        sweepElement.className = `holographic-sweep-${i}`
        sweepElement.style.cssText = `
          position: fixed;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(var(--primary-color-rgb), ${0.2 - i * 0.05}), 
            transparent
          );
          z-index: ${9999 - i};
          pointer-events: none;
          filter: blur(${i * 2}px);
          transform: scaleY(0.8);
        `
        sweepLayers.push(sweepElement)
        document.body.appendChild(sweepElement)
      }

      // Create GSAP timeline for sweep
      const tl = gsap.timeline({
        onComplete: () => {
          sweepLayers.forEach(layer => {
            if (layer.parentNode) {
              document.body.removeChild(layer)
            }
          })
          isAnimating.value = false
          resolve()
        }
      })

      sweepLayers.forEach((layer, i) => {
        tl.to(layer, {
          left: "100%",
          scaleY: 1.2,
          duration: (duration + i * 200) / 1000,
          ease: "power2.out",
          delay: i * 0.1
        }, 0)
        .to(layer, {
          scaleY: 0.8,
          duration: 0.3,
          ease: "power2.in"
        }, (duration + i * 200) / 1000 - 0.3)
      })
    })
  }

  /**
   * Enhanced text flicker effect with GSAP - Quick 2 flickers
   * @param {number} duration - Duration in milliseconds
   */
  const textFlicker = async (duration = 300) => {
    if (isAnimating.value) return

    isAnimating.value = true

    return new Promise((resolve) => {
      // Add flicker to all text elements with stagger
      const textElements = document.querySelectorAll('.command-panel *, [class*="portfolio"]')
      
      if (textElements.length === 0) {
        isAnimating.value = false
        resolve()
        return
      }

      // Create timeline for quick text flicker - only 2 flickers
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.value = false
          resolve()
        }
      })

      // Quick double flicker effect
      tl.to(textElements, {
        opacity: 0.3,
        filter: "brightness(0.5)",
        duration: 0.08,
        stagger: 0.01,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 3 // 2 complete flickers (3 repeats = 4 total changes = 2 flickers)
      })
      .to(textElements, {
        opacity: 1,
        filter: "brightness(1)",
        duration: 0.05,
        ease: "power2.out"
      })
    })
  }

  return {
    isAnimating,
    epicThemeTransition,
    holographicSweep,
    textFlicker
  }
}
