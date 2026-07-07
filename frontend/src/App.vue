<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useSession } from './composables/useSession'
import HelloWorld from './components/HelloWorld.vue'

const { sessionId, hasSession, clearSession } = useSession()

function handleChangeSession() {
  clearSession()
  window.location.href = '/'
}
</script>

<template>
  <header v-if="hasSession">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <div class="session-info">
        <span class="session-label">Session: <strong>{{ sessionId }}</strong></span>
        <button class="btn-link" @click="handleChangeSession">Change</button>
      </div>

      <HelloWorld msg="Demo project" />

      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/people">People</RouterLink>
        <RouterLink to="/winner">Winner</RouterLink>
      </nav>

    </div>
  </header>

  <RouterView />
</template>

<style scoped src="@/styles/App.css"></style>
