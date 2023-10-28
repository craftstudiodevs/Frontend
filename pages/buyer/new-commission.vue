<template>
    <div class="normal-page">
        <div class="grid-container">
            <section class="section-card">

            </section>
            <section class="section-card">

            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
// definePageMeta({
//     middleware: 'buyer-auth'
// })
</script>

<style scoped lang="scss">
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0.75rem;
}
</style>