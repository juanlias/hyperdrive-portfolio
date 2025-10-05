import { ref } from 'vue'
import { gsap } from 'gsap'

export function useProjectModal() {
  const isModalOpen = ref(false)
  const selectedProject = ref(null)
  
  const openProject = (project) => {
    selectedProject.value = project
    isModalOpen.value = true
  }
  
  const closeModal = () => {
    isModalOpen.value = false
    selectedProject.value = null
  }
  
  return {
    isModalOpen,
    selectedProject,
    openProject,
    closeModal
  }
}

export function useHologramEffects() {
  const createScanLineEffect = (element, duration = 2) => {
    return gsap.to(element, {
      backgroundPosition: '100% 0',
      duration,
      ease: 'none',
      repeat: -1
    })
  }
  
  const createFlickerEffect = (element, interval = 3000) => {
    const flicker = () => {
      gsap.to(element, {
        opacity: 0.7,
        duration: 0.05,
        yoyo: true,
        repeat: Math.random() > 0.5 ? 1 : 3,
        onComplete: () => {
          setTimeout(flicker, Math.random() * interval + 1000)
        }
      })
    }
    
    flicker()
    return flicker
  }
  
  const createGlowPulse = (element, color = 'rgba(0, 255, 255, 0.3)') => {
    return gsap.to(element, {
      boxShadow: `0 0 30px ${color}`,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    })
  }
  
  const createTextScramble = (element, finalText, duration = 1) => {
    const chars = '!<>-_\\/[]{}—=+*^?#________'
    const originalText = finalText
    let iteration = 0
    
    const scrambleInterval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index]
          }
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      
      if (iteration >= originalText.length) {
        clearInterval(scrambleInterval)
      }
      
      iteration += 1 / 3
    }, 30)
    
    setTimeout(() => {
      clearInterval(scrambleInterval)
      element.textContent = originalText
    }, duration * 1000)
  }
  
  return {
    createScanLineEffect,
    createFlickerEffect,
    createGlowPulse,
    createTextScramble
  }
}
