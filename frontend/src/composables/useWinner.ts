import { ref, computed } from 'vue'
import { usePeople } from './usePeople'

export function useWinner() {
  const { people, loading } = usePeople()

  const spinning = ref(false)
  const currentIndex = ref(0)
  const winner = ref<string | null>(null)
  const hasSpun = ref(false)

  const displayName = computed(() => {
    if (winner.value) return winner.value
    if (people.value.length === 0) return ''
    return people.value[currentIndex.value % people.value.length]?.name || ''
  })

  async function spin() {
    if (spinning.value || people.value.length === 0) return

    spinning.value = true
    winner.value = null
    hasSpun.value = true

    // Spin with increasing delay
    for (let i = 0; i < 20; i++) {
      currentIndex.value = Math.floor(Math.random() * people.value.length)
      const delay = 100 + i * 35 // Gradually slow down
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    // Final winner
    const winnerIndex = Math.floor(Math.random() * people.value.length)
    currentIndex.value = winnerIndex
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const selectedName = String((people.value[winnerIndex] as any)?.name ?? '')
    winner.value = selectedName ? selectedName : null
    spinning.value = false
  }

  function reset() {
    winner.value = null
    hasSpun.value = false
    currentIndex.value = 0
  }

  return {
    people,
    loading,
    spinning,
    currentIndex,
    winner,
    hasSpun,
    displayName,
    spin,
    reset,
  }
}
