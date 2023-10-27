<template>
    <div class="normal-page">
        <h1>Hello <strong>{{ auth.user?.username }}</strong>!</h1>
        <p>This is the protected buyer dashboard page!</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'buyer-auth'
})

const auth = await useAuth()
</script>