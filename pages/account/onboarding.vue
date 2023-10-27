<template>
    <div class="normal-page">
        <h1>Pick your account type!</h1>
        <button @click="setAccountType('buyer')">Buyer</button>
        <button @click="setAccountType('developer')">Developer</button>
    </div>
</template>

<script setup lang="ts">
const auth = await useAuth()

definePageMeta({
    middleware: [
        async function (to, from) {
            const auth = await useAuth()

            if (auth.value.user) {
                if (auth.value.user.buyerAccount) {
                    navigateTo('/buyer/dashboard')
                } else if (auth.value.user.developerAccount) {
                    navigateTo('/developer/dashboard')
                }
            }
        }
    ]
})

async function setAccountType(type: string) {
    if (auth.value.user) {
        await useApiFetch(`/account/select-type?type=${type}`)
        navigateTo(`/account/${type}/onboarding`)
    }
}
</script>