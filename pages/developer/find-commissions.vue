<template>
    <div class="normal-page">
        <div v-if="remainingBids > 0" class="grid-container">
            <aside>
                <section id="search-filters" class="section-card">
                    Filters go here
                </section>
            </aside>
            <section id="results-column">
                <aside id="search-box-container">
                    <input type="text" v-model="search_filters.searchQuery" placeholder="Search for commissions..." />
                </aside>
                <section id="search-results">
                    <article v-for="search_item in search_results.commissions" class="search-result">
                        <p>{{ search_item.title }}</p>
                        <p>{{ search_item.summary }}</p>
                        <nuxt-link :to="`/developer/view-commission/${search_item.commissionId}`">${{
                            search_item.fixedPriceAmount / 100 }}</nuxt-link>
                    </article>
                </section>
            </section>
        </div>
        <div v-else>
            <p>You have no bids remaining. You can either wait until your subscription renews, or upgrade your subcription
                plan!.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'dev-auth'
})
const auth = await useAuth()
const remainingBids = computed(() => auth.value.user.developerAccount.remainingBids)

const route = useRoute()

const search_filters = ref({
    searchQuery: route.query.searchQuery ?? '',
    sortFunction: route.query.sortFunction ?? 'newest',
    page: route.query.page ?? 1,
    pageSize: route.query.pageSize ?? 10,
})

const search_results = ref<DeveloperAvailableCommissionsResponse>({})
watch(search_filters, async (filters, _) => {
    search_results.value = await useApiFetch<DeveloperAvailableCommissionsResponse>(`/developer/available-commissions?page=${filters.page}&pageSize=${filters.pageSize}&searchQuery=${filters.searchQuery}&sortFunction=${filters.sortFunction}`)
}, {
    deep: true, // watch the properties inside the object, not the object itself, that doesn't change
    immediate: true, // trigger an event immediately to start the search
})
</script>

<style scoped lang="scss">
.grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr;
    gap: 0.75rem;
}

#search-results {
    min-width: 100%;

    .search-result {
        background-color: $color-bg-light;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
    }
}
</style>