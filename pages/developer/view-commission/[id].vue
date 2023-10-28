<template>
    <div class="normal-page">
        <div class="grid-container">
            <aside>
                <section id="commission-info" class="section-card">
                    <h1 class="section-title">{{ commission_info.title }}</h1>
                    <p class="section-summary">{{ commission_info.summary }}</p>
                    <p>Expiry: {{ formatTimeRelative(commission_info.expiryTime) }}</p>
                </section>
            </aside>

            <section id="description" class="section-card">
                <p>TODO: Add a fullscreen button aligned right next to requirements that expands the requirements over the
                    top of the left and right columns and darkens the screen. Reader mode.</p>
                <MarkdownComponent id="description-md" :content="commission_info.requirements" />
            </section>

            <aside>
                <section id="bid-panel" class="section-card">
                    <h2 class="strong-text">Submit Bid</h2>
                </section>
            </aside>
            
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

    &>* {
        overflow: hidden;
    }
}

#commission-info {
    grid-column: 1;
    grid-row: 1;
}

#description {
    grid-column: 2;
    grid-row: 1;

    #description-md {
        overflow: hidden;
    }
}

#bid-panel {
    grid-column: 3;
    grid-row: 1;
}
</style>