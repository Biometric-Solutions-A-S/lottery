import { ref, computed } from 'vue'

const STORAGE_KEY = 'people-session-id'

const sessionId = ref<string | null>(localStorage.getItem(STORAGE_KEY))

export function useSession() {
  const hasSession = computed(() => sessionId.value !== null && sessionId.value.trim() !== '')

  function setSession(id: string) {
    const trimmed = id.trim()
    sessionId.value = trimmed
    localStorage.setItem(STORAGE_KEY, trimmed)
  }

  function clearSession() {
    sessionId.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  function getSessionId(): string {
    return sessionId.value || ''
  }

  return {
    sessionId,
    hasSession,
    setSession,
    clearSession,
    getSessionId,
  }
}
