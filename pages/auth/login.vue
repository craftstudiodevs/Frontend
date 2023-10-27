<template>

</template>

<script setup lang="js">
definePageMeta({
    middleware: 'user-auth'
})

const route = useRoute()
navigateTo(route.query.redirect)
</script>