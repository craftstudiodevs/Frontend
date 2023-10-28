<template>
    <div class="accordion-container">
        <button class="accordion">{{ name }}</button>
        <div class="panel">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string
}>()
</script>

<style lang="scss">

</style>