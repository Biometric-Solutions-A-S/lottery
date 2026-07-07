import { ref, onMounted, onUnmounted } from 'vue'
import type { Person } from '@/types/person'
import * as peopleApi from '@/api/peopleApi'
import { useSession } from './useSession'

export function usePeople() {
  const { getSessionId } = useSession()

  const people = ref<Person[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const deleting = ref<Set<number>>(new Set())

  const editing = ref<Person | null>(null)
  const isCreating = ref(false)
  const saving = ref(false)
  const saveError = ref<string | null>(null)

  async function fetchPeople() {
    loading.value = true
    error.value = null
    try {
      people.value = await peopleApi.getPeople(getSessionId())
    } catch {
      error.value = 'Failed to load people. Is the backend running?'
    } finally {
      loading.value = false
    }
  }

  async function removePerson(id: number) {
    deleting.value = new Set(deleting.value).add(id)
    try {
      await peopleApi.deletePerson(id, getSessionId())
      people.value = people.value.filter((c) => c.id !== id)
    } catch {
      error.value = `Failed to delete person #${id}.`
    } finally {
      const next = new Set(deleting.value)
      next.delete(id)
      deleting.value = next
    }
  }

  function openEditor(person: Person) {
    isCreating.value = false
    editing.value = { ...person }
    saveError.value = null
  }

  function openCreator() {
    isCreating.value = true
    editing.value = { id: 0, sessionId: '', name: '', email: '', phone: '', birthday: null }
    saveError.value = null
  }

  function closeEditor() {
    editing.value = null
    saveError.value = null
  }

  async function savePerson() {
    if (!editing.value) return
    saving.value = true
    saveError.value = null
    try {
      const sessionId = getSessionId()
      if (isCreating.value) {
        const { id: _, sessionId: __, ...fields } = editing.value
        const created = await peopleApi.createPerson(fields, sessionId)
        people.value = [...people.value, created]
      } else {
        const updated = await peopleApi.updatePerson(editing.value, sessionId)
        people.value = people.value.map((c) => (c.id === updated.id ? updated : c))
      }
      closeEditor()
    } catch {
      saveError.value = 'Failed to save. Please try again.'
    } finally {
      saving.value = false
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeEditor()
  }

  onMounted(() => {
    fetchPeople()
    window.addEventListener('keydown', onKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  return {
    people,
    loading,
    error,
    deleting,
    editing,
    isCreating,
    saving,
    saveError,
    openEditor,
    openCreator,
    closeEditor,
    savePerson,
    removePerson,
  }
}
