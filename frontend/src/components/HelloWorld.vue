<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Simple Vue 3 + TypeScript project - with C# minimal API and clean architecture backend. <br />
    </h3>
  </div>
</template>

<style scoped src="@/styles/HelloWorld.css"></style>
