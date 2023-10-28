<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'CraftStudio',
  meta: [
    { name: 'description', content: 'Find buyers to develop Minecraft mods for, or find developers to get your mod ideas come to life!' }
  ]
})
</script>
