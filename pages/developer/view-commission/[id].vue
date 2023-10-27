<template>
    <div class="normal-page">
        <div class="grid-container">
            <section id="commission-info" class="section-card">

            </section>

            <section id="description" class="section-card">
                <MarkdownComponent :content="commission_info.requirements"/>
            </section>

            <section id="bid-panel" class="section-card">

            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'dev-auth'
})

const route = useRoute()

const commission_id = route.params.id
const commission_info = (await useApiFetch(`/developer/commission/${commission_id}`)) as DeveloperCommissionResponse
</script>

<style lang="scss">
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr;
    gap: 0.75rem;
}

#commission-info {
    grid-column: 1;
    grid-row: 1;
}

#description {
    grid-column: 2;
    grid-row: 1;
}

#bid-panel {
    grid-column: 3;
    grid-row: 1;
}
</style>