import type { Person } from '@/types/person'

const BASE = 'http://localhost:5091'

export async function getPeople(sessionId: string): Promise<Person[]> {
  const res = await fetch(`${BASE}/people?sessionId=${encodeURIComponent(sessionId)}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function createPerson(person: Omit<Person, 'id'>, sessionId: string): Promise<Person> {
  const res = await fetch(`${BASE}/people?sessionId=${encodeURIComponent(sessionId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...person, sessionId }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function updatePerson(person: Person, sessionId: string): Promise<Person> {
  const res = await fetch(`${BASE}/people/${person.id}?sessionId=${encodeURIComponent(sessionId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(person),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function deletePerson(id: number, sessionId: string): Promise<void> {
  const res = await fetch(`${BASE}/people/${id}?sessionId=${encodeURIComponent(sessionId)}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}
