<template>
    <NuxtLink to="/test">To test 1</NuxtLink>

    <p>Hello {{ auth.user?.username }}</p>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const auth = await useAuth()
</script>