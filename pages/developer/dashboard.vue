<template>
    <div class="normal-page">
        <h1>Hello <strong>{{ auth.user?.username }}</strong>!</h1>
        <p>This is the protected developer dashboard page!</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'dev-auth'
})

const auth = await useAuth()
</script>