<template>
    <NuxtLayout>
        <div class="normal-page">
            <h1>Oops! Something went wrong!</h1>
            <p>{{ error.message }}</p>
            <button @click="handleError">Go back</button>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps<{
    error: Object
}>()

const handleError = () => clearError({ redirect: '/' })
</script>