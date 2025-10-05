<template>
  <canvas 
    ref="canvasRef" 
    class="absolute inset-0 transition-opacity duration-1000" 
    :class="{'opacity-0': isPortfolioVisible}"
  />
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  isPortfolioVisible: Boolean,
  isWarping: Boolean,
  isPointerDown: Boolean,
  speed: Number,
  warpColor: {
    // type: String,
    default: 'rgba(173, 216, 230, 1)'
  }
})

const emit = defineEmits(['auto-finish-warp', 'should-instant-finish', 'show-guide'])

const canvasRef = ref(null)
let ctx, width, height, stars = [], animationFrameId
let center = { x: 0, y: 0 }
let targetCenter = { x: 0, y: 0 }
let warpStartTime = null
let autoWarpTimer = null
let guideTimer = null
let shouldInstantFinish = false
let isGuideVisible = false
let hasMovedMouse = false
const numStars = 500
const instantFinishDuration = 2000 // 2 seconds
const guideShowDuration = 1000 // 1 second

class Star {
  constructor() { 
    this.reset() 
  }
  
  reset() {
    this.x = (Math.random() - 0.5) * width
    this.y = (Math.random() - 0.5) * height
    this.z = Math.random() * width
    this.pz = this.z
  }
  
  update(speed) { 
    this.z -= speed
    if (this.z < 1) { 
      this.reset() 
    } 
  }
  
  draw(isWarping, warpColor, centerX, centerY) {
    if (!ctx) return
    const sx = (this.x / this.z) * width / 2 + centerX
    const sy = (this.y / this.z) * height / 2 + centerY
    const r = Math.max(0, (1 - this.z / width) * 2.5)
    const px = (this.x / this.pz) * width / 2 + centerX
    const py = (this.y / this.pz) * height / 2 + centerY
    this.pz = this.z
    
    if (isWarping) {
      // Draw warp trail as line when warping - always keep stars white
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(sx, sy)
      ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.z / width})`
      ctx.lineWidth = r * 2.5
      ctx.lineCap = 'round' // Make line ends round
      ctx.stroke()
    } else {
      // Draw as circular stars when not warping - always white
      ctx.beginPath()
      ctx.arc(sx, sy, Math.max(0.5, r), 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.z / width})`
      ctx.fill()
      
      // Add a subtle glow effect for distant stars - always white
      if (r > 1) {
        ctx.beginPath()
        ctx.arc(sx, sy, r * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${(1 - this.z / width) * 0.3})`
        ctx.fill()
      }
    }
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  width = window.innerWidth
  height = window.innerHeight
  center.x = width / 2
  center.y = height / 2
  targetCenter.x = width / 2
  targetCenter.y = height / 2
  canvas.width = width
  canvas.height = height
  stars = []
  for (let i = 0; i < numStars; i++) { 
    stars.push(new Star()) 
  }
}

const animate = () => {
  if (!ctx) return
  
  // Smooth navigation of vanishing point
  if (!props.isPointerDown) {
    targetCenter.x = width / 2
    targetCenter.y = height / 2
  }
  center.x += (targetCenter.x - center.x) * 0.05
  center.y += (targetCenter.y - center.y) * 0.05
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  ctx.fillRect(0, 0, width, height)
  stars.forEach(s => { 
    s.update(props.speed) 
    s.draw(props.isWarping, props.warpColor, center.x, center.y) 
  })
  animationFrameId = requestAnimationFrame(animate)
}

const handleMouseMove = (event) => {
  if (props.isPointerDown && !props.isPortfolioVisible) {
    targetCenter.x = event.clientX
    targetCenter.y = event.clientY
    
    // Hide guide when user starts moving mouse
    if (!hasMovedMouse && isGuideVisible) {
      hasMovedMouse = true
      emit('show-guide', false)
    }
  }
}

const handleTouchMove = (event) => {
  if (props.isPointerDown && !props.isPortfolioVisible && event.touches[0]) {
    targetCenter.x = event.touches[0].clientX
    targetCenter.y = event.touches[0].clientY
    
    // Hide guide when user starts moving touch
    if (!hasMovedMouse && isGuideVisible) {
      hasMovedMouse = true
      emit('show-guide', false)
    }
  }
}

const startAutoWarpTimer = () => {
  // Clear any existing timers
  if (autoWarpTimer) {
    clearTimeout(autoWarpTimer)
  }
  if (guideTimer) {
    clearTimeout(guideTimer)
  }
  
  shouldInstantFinish = false
  isGuideVisible = false
  hasMovedMouse = false

  // Start timer to show guide at 1s
  guideTimer = setTimeout(() => {
    if (props.isWarping && props.isPointerDown && !hasMovedMouse) {
      isGuideVisible = true
      emit('show-guide', true)
    }
  }, guideShowDuration)
  
  // Start timer to mark that we should instant finish at 2s
  autoWarpTimer = setTimeout(() => {
    if (props.isWarping && props.isPointerDown) {
      shouldInstantFinish = true
      emit('should-instant-finish', true)
    }
  }, instantFinishDuration)
}

const clearAutoWarpTimer = () => {
  if (autoWarpTimer) {
    clearTimeout(autoWarpTimer)
    autoWarpTimer = null
  }
  if (guideTimer) {
    clearTimeout(guideTimer)
    guideTimer = null
  }
  if (shouldInstantFinish) {
    shouldInstantFinish = false
    emit('should-instant-finish', false)
  }
  // Always hide guide when clearing timers
  if (isGuideVisible) {
    isGuideVisible = false
    emit('show-guide', false)
  }
  hasMovedMouse = false
}

// Watch for warp state changes to manage the auto-timer
watch(() => props.isWarping, (newValue) => {
  if (newValue) {
    startAutoWarpTimer()
  } else {
    clearAutoWarpTimer()
  }
})

watch(() => props.isPointerDown, (newValue) => {
  if (!newValue) {
    // Cuando se suelta, emitir si debe ser instantáneo
    if (shouldInstantFinish) {
      emit('should-instant-finish', true)
    }
    clearAutoWarpTimer()
  }
})

onMounted(() => {
  initCanvas()
  animate()
  window.addEventListener('resize', initCanvas)
  document.body.addEventListener('mousemove', handleMouseMove)
  document.body.addEventListener('touchmove', handleTouchMove, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  clearAutoWarpTimer()
  if (guideTimer) {
    clearTimeout(guideTimer)
  }
  window.removeEventListener('resize', initCanvas)
  document.body.removeEventListener('mousemove', handleMouseMove)
  document.body.removeEventListener('touchmove', handleTouchMove)
})
</script>
