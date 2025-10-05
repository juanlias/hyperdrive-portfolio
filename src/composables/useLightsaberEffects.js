import { onMounted, onUnmounted, watch } from 'vue'
import { useTheme } from './useTheme'

export function useLightsaberEffects() {
  const { currentTheme, themes } = useTheme()
  let sparkInterval = null

  // Update cursor color based on theme
  const updateCursor = () => {
    const theme = themes[currentTheme.value]
    
    // Normal cursor (larger size)
    const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="none" stroke="${encodeURIComponent(theme.color)}" stroke-width="2" opacity="0.3"/><circle cx="16" cy="16" r="7" fill="none" stroke="${encodeURIComponent(theme.light)}" stroke-width="1.5" opacity="0.5"/><circle cx="16" cy="16" r="4" fill="${encodeURIComponent(theme.light)}" opacity="0.9"><animate attributeName="r" values="4;5.5;4" dur="1s" repeatCount="indefinite"/></circle><circle cx="16" cy="16" r="2" fill="%23ffffff"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;utf8,${cursorSvg}') 16 16, auto`
    
    // Hover cursor (larger with more glow)
    const hoverCursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><radialGradient id="glow"><stop offset="0%" stop-color="${encodeURIComponent(theme.light)}" stop-opacity="0.8"/><stop offset="100%" stop-color="${encodeURIComponent(theme.color)}" stop-opacity="0"/></radialGradient></defs><circle cx="24" cy="24" r="20" fill="url(%23glow)" opacity="0.4"/><circle cx="24" cy="24" r="14" fill="none" stroke="${encodeURIComponent(theme.color)}" stroke-width="2" opacity="0.6"/><circle cx="24" cy="24" r="10" fill="none" stroke="${encodeURIComponent(theme.light)}" stroke-width="2" opacity="0.8"><animate attributeName="r" values="10;12;10" dur="0.8s" repeatCount="indefinite"/></circle><circle cx="24" cy="24" r="6" fill="${encodeURIComponent(theme.light)}" opacity="1"><animate attributeName="r" values="6;8;6" dur="0.8s" repeatCount="indefinite"/></circle><circle cx="24" cy="24" r="3" fill="%23ffffff"><animate attributeName="opacity" values="1;0.7;1" dur="0.8s" repeatCount="indefinite"/></circle></svg>`
    
    // Apply hover cursor to clickable elements
    const style = document.getElementById('hover-cursor-style') || document.createElement('style')
    style.id = 'hover-cursor-style'
    style.textContent = `
      a, button, [role="button"], .cursor-pointer, input[type="button"], input[type="submit"] {
        cursor: url('data:image/svg+xml;utf8,${hoverCursorSvg}') 24 24, pointer !important;
      }
    `
    if (!document.getElementById('hover-cursor-style')) {
      document.head.appendChild(style)
    }
  }

  // Watch for theme changes
  watch(currentTheme, updateCursor, { immediate: true })

  // Create spark on click (lightsaber clash effect)
  const createClickSparks = (x, y) => {
    const container = document.createElement('div')
    container.className = 'lightsaber-clash'
    container.style.left = `${x}px`
    container.style.top = `${y}px`
    document.body.appendChild(container)

    // Create 12 spark particles radiating outward
    const particleCount = 12
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'spark-particle'
      
      const angle = (Math.PI * 2 * i) / particleCount
      const distance = 40 + Math.random() * 40 // Random distance between 40-80px
      const tx = Math.cos(angle) * distance
      const ty = Math.sin(angle) * distance
      
      particle.style.setProperty('--tx', `${tx}px`)
      particle.style.setProperty('--ty', `${ty}px`)
      particle.style.transform = `rotate(${angle}rad)`
      
      container.appendChild(particle)
    }

    // Remove after animation
    setTimeout(() => {
      container.remove()
    }, 800)
  }

  // Create cursor trail sparks
  const createCursorSpark = (x, y) => {
    const spark = document.createElement('div')
    spark.className = 'cursor-spark'
    spark.style.left = `${x}px`
    spark.style.top = `${y}px`
    document.body.appendChild(spark)

    setTimeout(() => {
      spark.remove()
    }, 600)
  }

  const handleClick = (e) => {
    createClickSparks(e.clientX, e.clientY)
  }

  const handleMouseMove = (e) => {
    // Only create sparks occasionally (every ~100ms) to avoid performance issues
    if (!sparkInterval) {
      createCursorSpark(e.clientX, e.clientY)
      sparkInterval = setTimeout(() => {
        sparkInterval = null
      }, 100)
    }
  }

  onMounted(() => {
    updateCursor()
    document.addEventListener('click', handleClick)
    document.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
    document.removeEventListener('mousemove', handleMouseMove)
    if (sparkInterval) {
      clearTimeout(sparkInterval)
    }
  })

  return {
    createClickSparks,
    createCursorSpark
  }
}
