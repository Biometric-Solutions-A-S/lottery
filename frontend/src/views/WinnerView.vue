<script setup lang="ts">
import { useWinner } from '@/composables/useWinner'

const { people, loading, spinning, winner, displayName, spin, reset } = useWinner()
</script>

<template>
  <main class="winner-view">
    <div class="winner-container">
      <h1>Random Winner Picker</h1>

      <p v-if="loading" class="status">Loading people...</p>
      <p v-else-if="people.length === 0" class="status">No people available. Add some people first!</p>

      <template v-else>
        <div class="spinner-display" :class="{ spinning, winner: winner }">
          <div class="name-display">
            {{ displayName }}
          </div>
        </div>

        <div v-if="winner" class="winner-announcement">
          🎉 Winner: <strong>{{ winner }}</strong> 🎉
        </div>

        <div class="controls">
          <button
            v-if="!winner"
            class="btn-primary btn-large"
            :disabled="spinning || people.length === 0"
            @click="spin"
          >
            {{ spinning ? 'Spinning...' : 'Pick Random Winner' }}
          </button>

          <button
            v-else
            class="btn-secondary btn-large"
            @click="reset"
          >
            Pick Again
          </button>
        </div>

        <div class="info">
          <p>{{ people.length }} {{ people.length === 1 ? 'person' : 'people' }} in the draw</p>
        </div>
      </template>
    </div>
  </main>
</template>

<style scoped src="@/styles/WinnerView.css"></style>
