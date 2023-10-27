<template>
    <div class="markdown" v-html="rendered_markdown"></div>
</template>

<script setup lang="ts">
import md from 'markdown-it'

const props = defineProps<{
    content: string
}>()

const rendered_markdown = md().render(props.content)
</script>