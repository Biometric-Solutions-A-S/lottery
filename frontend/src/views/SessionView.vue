<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSession } from '@/composables/useSession'

const router = useRouter()
const { setSession } = useSession()

const input = ref('')

function handleSubmit() {
  if (input.value.trim()) {
    setSession(input.value.trim())
    router.push('/people')
  }
}
</script>

<template>
  <main class="session-view">
    <div class="session-card">
      <h1>Welcome</h1>
      <p>Enter your session ID to continue</p>

      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label for="session-id">Session ID</label>
          <input
            id="session-id"
            v-model="input"
            type="text"
            placeholder="e.g. demo, team-a, project-123"
            autocomplete="off"
            autofocus
          />
        </div>

        <button type="submit" class="btn-primary" :disabled="!input.trim()">
          Start
        </button>
      </form>

      <p class="hint">
        Your session ID is used to keep your data separate from other users.
        You can use any ID - e.g. "demo", "team-a", or your name.
      </p>
    </div>
  </main>
</template>

<style scoped>
.session-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
}

.session-card {
  max-width: 500px;
  width: 100%;
  padding: 3rem;
  background: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.session-card h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  text-align: center;
}

.session-card > p {
  margin: 0 0 2rem 0;
  text-align: center;
  color: var(--color-text);
  opacity: 0.8;
}

.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.field input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
}

.field input:focus {
  outline: none;
  border-color: var(--color-border-hover);
}

button[type="submit"] {
  width: 100%;
  padding: 0.875rem;
  font-size: 1.1rem;
}

.hint {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.7;
  text-align: center;
}
</style>
