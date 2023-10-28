<template>
    <article>
        <p>{{ commission.title }}</p>
    </article>
</template>

<script setup lang="ts">
const props = defineProps<{
    commission: CommissionPreviewResponse
}>()
</script>