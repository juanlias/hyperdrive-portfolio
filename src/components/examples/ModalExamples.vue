<template>
  <div>
    <!-- Ejemplo básico -->
    <button @click="showBasicModal = true" class="px-4 py-2 bg-cyan-500 text-white rounded">
      Modal Básico
    </button>
    
    <HologramModal
      v-model:is-open="showBasicModal"
      title="Sistema de Información"
      classification="CONFIDENCIAL"
      @close="showBasicModal = false"
    >
      <template #content>
        <div class="space-y-4">
          <p class="text-cyan-100">Este es un ejemplo de modal básico usando slots.</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-cyan-900/20 p-4 rounded border border-cyan-400/30">
              <h4 class="text-cyan-300 font-semibold mb-2">Información</h4>
              <p class="text-cyan-100/80 text-sm">Contenido personalizable via slots</p>
            </div>
            <div class="bg-cyan-900/20 p-4 rounded border border-cyan-400/30">
              <h4 class="text-cyan-300 font-semibold mb-2">Estado</h4>
              <p class="text-green-400 text-sm">Operacional</p>
            </div>
          </div>
        </div>
      </template>
    </HologramModal>

    <!-- Ejemplo con header personalizado -->
    <button @click="showCustomModal = true" class="px-4 py-2 bg-purple-500 text-white rounded ml-4">
      Modal Personalizado
    </button>
    
    <HologramModal
      v-model:is-open="showCustomModal"
      :show-status="false"
      @close="showCustomModal = false"
    >
      <template #header>
        <div class="flex items-center space-x-4">
          <div class="text-4xl">🛸</div>
          <div>
            <h2 class="text-2xl font-bold text-purple-300">
              Transmisión Alien
            </h2>
            <p class="text-purple-400 text-sm">
              Origen: Sector Galáctico 7
            </p>
          </div>
        </div>
      </template>

      <template #content>
        <div class="space-y-6">
          <div class="text-center">
            <div class="text-6xl mb-4">👽</div>
            <h3 class="text-xl text-purple-300 mb-2">Mensaje Interceptado</h3>
            <p class="text-purple-100/80">
              "Greetings, Earth beings. We come in peace. Your portfolio is impressive."
            </p>
          </div>
          
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-purple-900/20 p-3 rounded border border-purple-400/30">
              <div class="text-purple-300 font-semibold">Distancia</div>
              <div class="text-purple-100">42 años luz</div>
            </div>
            <div class="bg-purple-900/20 p-3 rounded border border-purple-400/30">
              <div class="text-purple-300 font-semibold">Tecnología</div>
              <div class="text-purple-100">Warp Drive</div>
            </div>
            <div class="bg-purple-900/20 p-3 rounded border border-purple-400/30">
              <div class="text-purple-300 font-semibold">ETA</div>
              <div class="text-purple-100">2025</div>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="text-center text-purple-400/60 text-sm">
          🛸 TRANSMISIÓN INTERGALÁCTICA - CODIFICADA EN FRECUENCIA CÓSMICA 🛸
        </div>
      </template>
    </HologramModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HologramModal from '../ui/HologramModal.vue'

const showBasicModal = ref(false)
const showCustomModal = ref(false)
</script>

<style scoped>
/* Estilos específicos para este ejemplo */
</style>
