<template>
    <div class="normal-page">
        <div class="grid-container">
            <aside>
                <section id="commission-info" class="section-card">
                    <h1 class="section-title">Commission Info</h1>
                    <h1 id="commission-title">{{ commission_info.title }}</h1>
                    <p id="commission-summary" class="section-summary">"{{ commission_info.summary }}"</p>
                    <p>Expiry: {{ formatTimeRelative(commission_info.expiryTime) }}</p>
                    <p>Category: {{ commission_info.category }}</p>
                </section>
            </aside>

            <section id="description" class="section-card">
                <h1 class="section-title">Description</h1>
                <MarkdownComponent id="description-md" :content="commission_info.requirements" />
            </section>

            <aside>
                <section id="bid-panel" class="section-card">
                    <h1 class="section-title">Submit Bid</h1>
                    <p>Submit a bid for this commission.</p>
                    <textarea name="testimony" id="testimony" placeholder="Testimony" v-model="testimonial"></textarea>
                    <p>
                        Make sure to include any information you think is relevant to allow
                        the buyer to make an informed decision on who to choose.
                        If applicable, give experience you have that apply to the requirements.
                        Remember, submitting a bid is irreversible, and will count to your remaining bids.
                        It's in your best interests to only submit a bid if you are confident you can complete the commission.
                    </p>
                    <input type="number" name="price" id="price" placeholder="Price" v-model="price"/>
                    <p>
                        Only submit a price you are willing to work for! 
                        You do not pay CraftStudio, you pay direct to the buyer.
                    </p>
                    <button @click="submitBid()">Submit Bid</button>
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

const testimonial = ref('')
const price = ref(commission_info.buyerFixedPricePref / 100)
async function submitBid() {
    const request = {
        fixedBidAmount: Math.round(price.value * 100),
        hourlyBidAmount: 0, // TODO: Implement hourly bids
        testimony: testimonial.value,
    }

    await useApiFetch(`/developer/commission/${commission_id}/submit-bid`, {
        method: 'POST',
        body: JSON.stringify(request)
    })

    navigateTo(`/developer/dashboard`)
}
</script>

<style scoped lang="scss">
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

    #commission-title {
        margin-bottom: 0;
    }

    #commission-summary {
        font-style: italic;
    }
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