import { ref, nextTick } from 'vue'
import { gsap } from 'gsap'

/**
 * Advanced theme transition effects that synchronize with SpaceCanvas using GSAP
 */
export function useThemeEffects() {
  const isTransitioning = ref(false)

  /**
   * Create a hyper-dimensional theme transition with GSAP - Non-blocking version
   * @param {string} newThemeColor - The color of the new theme
   * @param {HTMLElement} originElement - Element to start the effect from
   * @param {number} duration - Duration in milliseconds
   */
  const hyperDimensionalTransition = (newThemeColor, originElement, duration = 3500) => {
    // Don't block if already transitioning
    if (isTransitioning.value) {
      return
    }

    isTransitioning.value = true

    try {
      // Get origin coordinates safely
      const rect = originElement?.getBoundingClientRect() || { 
        left: window.innerWidth / 2, 
        top: window.innerHeight / 2 
      }
      const originX = rect.left + rect.width / 2
      const originY = rect.top + rect.height / 2

      // Create the main effects container
      const effectsContainer = document.createElement('div')
      effectsContainer.className = 'hyper-dimensional-transition'
      effectsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9997;
        overflow: hidden;
      `

      // Cleanup function
      const cleanup = () => {
        if (effectsContainer.parentNode) {
          try {
            document.body.removeChild(effectsContainer)
          } catch (e) {
            console.warn('Effect container already removed')
          }
        }
        isTransitioning.value = false
      }

      // Auto cleanup after duration
      setTimeout(cleanup, duration + 500)

      // Create GSAP timeline for perfect synchronization
      const tl = gsap.timeline({
        onComplete: cleanup,
        onError: cleanup
      })

      // Phase 1: Reality tear effect with GSAP
      createRealityTearGSAP(effectsContainer, originX, originY, newThemeColor, tl, duration)
      
      // Phase 2: Energy cascade with GSAP
      createEnergyCascadeGSAP(effectsContainer, originX, originY, newThemeColor, tl, duration)
      
      // Phase 3: Dimensional portal with GSAP
      createDimensionalPortalGSAP(effectsContainer, originX, originY, newThemeColor, tl, duration)
      
      // Phase 4: Quantum particles with GSAP
      createQuantumParticlesGSAP(effectsContainer, originX, originY, newThemeColor, tl, duration)
      
      // Phase 5: Reality reconstruction with GSAP
      createRealityReconstructionGSAP(effectsContainer, newThemeColor, tl, duration)

      document.body.appendChild(effectsContainer)

      // Start the timeline (non-blocking)
      tl.play()

    } catch (error) {
      console.error('Error creating animation:', error)
      isTransitioning.value = false
    }
  }

  /**
   * Creates a reality tear effect with GSAP
   */
  const createRealityTearGSAP = (container, x, y, color, timeline, duration) => {
    const tear = document.createElement('div')
    tear.className = 'reality-tear'
    tear.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 2px;
      height: 0;
      background: linear-gradient(0deg, transparent, ${color}, transparent);
      transform: translate(-50%, -50%);
      box-shadow: 0 0 20px ${color}, 0 0 40px ${color};
    `
    container.appendChild(tear)

    // Animate with GSAP - Faster timings for 2s total duration
    timeline.to(tear, {
      height: 400,
      duration: 0.7, // Reduced from 1.2s
      ease: "power2.out"
    }, 0)
    .to(tear, {
      opacity: 0,
      duration: 0.3, // Reduced from 0.5s
      ease: "power2.in"
    }, 0.4) // Earlier start timing

    // Add cracks emanating from the tear
    for (let i = 0; i < 8; i++) {
      const crack = document.createElement('div')
      crack.className = 'reality-crack'
      const angle = (Math.PI * 2 * i) / 8
      crack.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 1px;
        height: 0;
        background: ${color};
        transform: translate(-50%, -50%) rotate(${angle}rad);
        box-shadow: 0 0 10px ${color};
      `
      container.appendChild(crack)

      timeline.to(crack, {
        height: 150,
        duration: 1.6,
        ease: "power3.out",
        delay: i * 0.05
      }, 0.1)
      .to(crack, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      }, 1.2)
    }
  }

  /**
   * Creates energy cascade effect with GSAP
   */
  const createEnergyCascadeGSAP = (container, x, y, color, timeline, duration) => {
    for (let wave = 0; wave < 6; wave++) {
      const cascade = document.createElement('div')
      cascade.className = 'energy-cascade'
      cascade.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border: 3px solid ${color};
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 30px ${color}, inset 0 0 30px ${color};
        opacity: 1;
      `
      container.appendChild(cascade)

      timeline.to(cascade, {
        width: 1000,
        height: 1000,
        borderWidth: 1,
        opacity: 0,
        duration: 1.4, // Reduced from 2.4s
        ease: "power2.out",
        delay: wave * 0.05 // Reduced delay between waves
      }, 0.1) // Earlier start
    }
  }

  /**
   * Creates dimensional portal effect with GSAP - optimized for mid-animation climax
   */
  const createDimensionalPortalGSAP = (container, x, y, color, timeline, duration) => {
    const portal = document.createElement('div')
    portal.className = 'dimensional-portal'
    portal.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, 
        transparent 20%, 
        ${color}60 35%, 
        ${color}40 45%, 
        ${color}20 55%, 
        transparent 80%
      );
      transform: translate(-50%, -50%);
      filter: blur(1px);
      opacity: 0;
    `
    container.appendChild(portal)

    // Portal animation optimized for 2s total - climax at 1s mark
    timeline.to(portal, {
      width: 300,
      height: 300,
      opacity: 1,
      rotation: 720,
      duration: 1.8, // Reduced from 3.2s
      ease: "power2.inOut"
    }, 0.2) // Earlier start
    .to(portal, {
      opacity: 0,
      duration: 0.2, // Reduced from 0.4s
      ease: "power2.in"
    }, 1.6) // Earlier fade

    // Add rotating energy rings that peak at mid-animation
    for (let ring = 0; ring < 4; ring++) {
      const energyRing = document.createElement('div')
      energyRing.className = 'energy-ring'
      energyRing.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${80 + ring * 40}px;
        height: ${80 + ring * 40}px;
        border: ${3 - ring * 0.5}px solid ${color};
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        border-style: dashed;
        box-shadow: 0 0 20px ${color}, inset 0 0 20px ${color};
      `
      container.appendChild(energyRing)

      timeline.to(energyRing, {
        rotation: 360,
        opacity: 1,
        duration: 1.5 + ring * 0.3,
        ease: "none",
        repeat: -1,
        delay: ring * 0.1
      }, 0.7)
      .to(energyRing, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, 2.8)
    }

    // Add climax flash exactly at mid-animation (1.75s)
    timeline.add(() => {
      const climaxFlash = document.createElement('div')
      climaxFlash.className = 'climax-flash'
      climaxFlash.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, ${color}80 0%, transparent 70%);
        transform: translate(-50%, -50%);
        border-radius: 50%;
        mix-blend-mode: screen;
        opacity: 0;
      `
      container.appendChild(climaxFlash)

      gsap.to(climaxFlash, {
        width: 500,
        height: 500,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(climaxFlash, {
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: "power2.in"
          })
        }
      })
    }, 1.75) // Exactly at mid-animation
  }

  /**
   * Creates quantum particles with GSAP
   */
  const createQuantumParticlesGSAP = (container, x, y, color, timeline, duration) => {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'quantum-particle'
      const angle = Math.random() * Math.PI * 2
      const distance = 50 + Math.random() * 400
      const size = 2 + Math.random() * 4
      const endX = x + Math.cos(angle) * distance
      const endY = y + Math.sin(angle) * distance
      
      particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        box-shadow: 0 0 10px ${color};
        opacity: 1;
      `
      container.appendChild(particle)

      // Create faster staggered particle animation
      timeline.to(particle, {
        scale: 1.2,
        duration: 0.2, // Reduced from 0.3s
        ease: "back.out(1.7)",
        delay: i * 0.02 // Reduced delay
      }, 0.3) // Earlier start
      .to(particle, {
        left: endX,
        top: endY,
        scale: 0,
        opacity: 0,
        duration: 1.2, // Reduced from 2.2s
        ease: "power2.out"
      }, 0.4 + i * 0.02) // Earlier and faster
    }
  }

  /**
   * Creates reality reconstruction effect with GSAP
   */
  const createRealityReconstructionGSAP = (container, color, timeline, duration) => {
    const reconstruction = document.createElement('div')
    reconstruction.className = 'reality-reconstruction'
    reconstruction.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg,
        transparent 0%,
        ${color}05 25%,
        ${color}10 50%,
        ${color}05 75%,
        transparent 100%
      );
      opacity: 0;
      mix-blend-mode: screen;
      transform: scale(0.8);
    `
    container.appendChild(reconstruction)

    timeline.to(reconstruction, {
      opacity: 1,
      scale: 1.1,
      duration: 0.8, // Reduced from 1.5s
      ease: "power2.inOut"
    }, 1.0) // Start at mid-animation (1s mark)
    .to(reconstruction, {
      opacity: 0,
      scale: 1,
      duration: 0.4, // Reduced from 0.75s
      ease: "power2.in"
    }, 1.6) // Earlier fade
  }

  /**
   * Adds all necessary CSS animations
   */
  const addHyperDimensionalStyles = (color) => {
    if (document.querySelector('#hyper-dimensional-styles')) return

    const style = document.createElement('style')
    style.id = 'hyper-dimensional-styles'
    style.textContent = `
      @keyframes realityTear {
        0% { height: 0; opacity: 1; }
        50% { height: 200px; opacity: 1; }
        100% { height: 400px; opacity: 0; }
      }
      
      @keyframes realityCrack {
        0% { height: 0; opacity: 1; }
        100% { height: 150px; opacity: 0; }
      }
      
      @keyframes energyCascade {
        0% {
          width: 0;
          height: 0;
          opacity: 1;
          border-width: 3px;
        }
        70% {
          opacity: 0.8;
          border-width: 2px;
        }
        100% {
          width: 1000px;
          height: 1000px;
          opacity: 0;
          border-width: 1px;
        }
      }
      
      @keyframes dimensionalPortal {
        0% {
          width: 0;
          height: 0;
          opacity: 0;
          transform: translate(-50%, -50%) rotate(0deg);
        }
        30% {
          opacity: 1;
          transform: translate(-50%, -50%) rotate(180deg);
        }
        100% {
          width: 300px;
          height: 300px;
          opacity: 0;
          transform: translate(-50%, -50%) rotate(720deg);
        }
      }
      
      @keyframes energyRingRotate {
        0% { 
          transform: translate(-50%, -50%) rotate(0deg); 
          opacity: 0; 
        }
        20% { opacity: 0.6; }
        50% { opacity: 1; } /* Peak intensity at mid-animation */
        80% { opacity: 0.6; }
        100% { 
          transform: translate(-50%, -50%) rotate(360deg); 
          opacity: 0; 
        }
      }
      
      @keyframes climaxFlash {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.5);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
      }
      
      @keyframes quantumFloat {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        20% {
          transform: translate(-50%, -50%) scale(1.5);
          opacity: 1;
        }
        100% {
          left: var(--end-x);
          top: var(--end-y);
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
      }
      
      @keyframes realityReconstruct {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        50% {
          opacity: 1;
          transform: scale(1.1);
        }
        100% {
          opacity: 0;
          transform: scale(1);
        }
      }
    `
    document.head.appendChild(style)
  }

  /**
   * Creates a star burst effect for theme selector button with GSAP - Robust version
   */
  const createStarBurst = (element, color) => {
    try {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const stars = []

      for (let i = 0; i < 12; i++) {
        const star = document.createElement('div')
        const angle = (Math.PI * 2 * i) / 12
        const endX = centerX + Math.cos(angle) * 100
        const endY = centerY + Math.sin(angle) * 100
        
        star.style.cssText = `
          position: fixed;
          left: ${centerX}px;
          top: ${centerY}px;
          width: 2px;
          height: 2px;
          background: ${color};
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          box-shadow: 0 0 10px ${color};
          z-index: 9999;
        `
        
        document.body.appendChild(star)
        stars.push({ element: star, endX, endY })
      }

      // Create GSAP timeline for star burst with safety cleanup
      const starTl = gsap.timeline({
        onComplete: () => {
          stars.forEach(star => {
            try {
              if (star.element.parentNode) {
                document.body.removeChild(star.element)
              }
            } catch (e) {
              console.warn('Star element already removed')
            }
          })
        }
      })

      stars.forEach((star, index) => {
        starTl.to(star.element, {
          scale: 2,
          duration: 0.3,
          ease: "back.out(1.7)",
          delay: index * 0.02
        }, 0)
        .to(star.element, {
          left: star.endX,
          top: star.endY,
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        }, 0.1 + index * 0.02)
      })

      // Safety cleanup after 1 second
      setTimeout(() => {
        stars.forEach(star => {
          try {
            if (star.element.parentNode) {
              document.body.removeChild(star.element)
            }
          } catch (e) {
            console.warn('Star element already removed')
          }
        })
      }, 1000)

      return starTl
    } catch (error) {
      console.warn('Error creating star burst:', error)
      return null
    }
  }

  return {
    isTransitioning,
    hyperDimensionalTransition,
    createStarBurst
  }
}
