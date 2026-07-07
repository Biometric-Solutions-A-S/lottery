<script setup lang="ts">
import { usePeople } from '@/composables/usePeople'

const {
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
} = usePeople()

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })
}
</script>

<template>
  <main class="people">
    <div class="toolbar">
      <h1>People</h1>
      <button class="btn-primary" @click="openCreator">+ Add Person</button>
    </div>

    <p v-if="loading" class="status">Loading…</p>
    <p v-else-if="error" class="status error">{{ error }}</p>

    <table v-else-if="people.length > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Birthday</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in people" :key="c.id" class="clickable-row" @click="openEditor(c)">
          <td>{{ c.name }}</td>
          <td>{{ c.email }}</td>
          <td>{{ c.phone }}</td>
          <td>{{ c.birthday ? formatDate(c.birthday) : '' }}</td>
          <td class="actions">
            <button
              class="delete-btn"
              :disabled="deleting.has(c.id)"
              :aria-label="`Delete ${c.name}`"
              @click.stop="removePerson(c.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit overlay -->
    <Teleport to="body">
      <div v-if="editing" class="backdrop" @click.self="closeEditor">
        <div class="dialog" role="dialog" aria-modal="true" :aria-label="`Edit person ${editing.id}`">
          <h2>{{ isCreating ? 'Add Person' : 'Edit Person' }}</h2>

          <div class="field">
            <label for="edit-name">Name</label>
            <input id="edit-name" v-model="editing.name" type="text" autocomplete="off" />
          </div>
          <div class="field">
            <label for="edit-email">Email</label>
            <input id="edit-email" v-model="editing.email" type="email" autocomplete="off" />
          </div>
          <div class="field">
            <label for="edit-phone">Phone</label>
            <input id="edit-phone" v-model="editing.phone" type="tel" autocomplete="off" />
          </div>
          <div class="field">
            <label for="edit-birthday">Birthday</label>
            <input id="edit-birthday" v-model="editing.birthday" type="date" />
          </div>

          <p v-if="saveError" class="save-error">{{ saveError }}</p>

          <div class="dialog-actions">
            <button class="btn-secondary" :disabled="saving" @click="closeEditor">Cancel</button>
            <button class="btn-primary" :disabled="saving" @click="savePerson">
              {{ saving ? 'Saving…' : isCreating ? 'Add' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<style scoped src="@/styles/PeopleView.css"></style>
