<template>
    <header>
        <div id="header-container">
            <div class="nav-row nav-left">
                <nuxt-link to="/" id="nav-home">CraftStudio</nuxt-link>

                <template v-if="auth.user?.developerAccount">
                    <nuxt-link to="/developer/find-commissions" class="other-btn">Find commissions</nuxt-link>
                    <nuxt-link to="/developer/my-bids" class="other-btn">My bids</nuxt-link>
                    <nuxt-link to="/developer/my-commissions" class="other-btn">My commissions</nuxt-link>
                </template>

                <template v-else-if="auth.user?.buyerAccount">
                    <nuxt-link to="/buyer/my-commissions" class="other-btn">Commissions</nuxt-link>
                    <nuxt-link to="/buyer/create-commission" class="other-btn">Create</nuxt-link>
                </template>

                <template v-else-if="auth.user">
                    <nuxt-link to="/account/onboarding">Pick your account type to begin using!</nuxt-link>
                </template>

                <template v-else>
                    <nuxt-link to="/about-us">About us</nuxt-link>
                </template>

                <nuxt-link to="/premium" v-if="!isPayingCustomer" id="premium">Premium</nuxt-link>
                <nuxt-link to="/upgrade" v-else-if="auth.user && (auth.user.buyerAccount || auth.user.developerAccount)" id="premium">Upgrade</nuxt-link>
            </div>
        
            <div class="developer-nav nav-row nav-right" v-if="auth.user?.developerAccount">
                <nuxt-link to="/developer/dashboard" class="main-btn">Dashboard</nuxt-link>
            </div>
            <div class="buyer-nav nav-row nav-right" v-else-if="auth.user?.buyerAccount">
                <nuxt-link to="/buyer/dashboard" class="main-btn">Dashboard</nuxt-link>
            </div>
            <div class="buyer-nav nav-row nav-right" v-else-if="auth.user">
                <nuxt-link to="/account/onboarding" class="main-btn">Finish setup</nuxt-link>
            </div>
            <div class="loggedout-nav nav-row nav-right" v-else>
                <nuxt-link :to="`/auth/login?redirect=${route.fullPath}`" class="main-btn">Log in</nuxt-link>
                <nuxt-link to="/auth/register" class="other-btn">Register</nuxt-link>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const auth = await useAuth()
const route = useRoute()

const isPayingCustomer = computed(() => {
    if (!auth.value.user) return false

    if (auth.value.user.developerAccount) {
        return auth.value.user.developerAccount.subscriptionType != 'free'
    }
    if (auth.value.user.buyerAccount) {
        return auth.value.user.buyerAccount.subscriptionType != 'free'
    }
    return false
})
</script>

<style lang="scss">
header {
    width: 100%;
}

#header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .75rem auto .75rem auto;
    max-width: 80rem;
    padding: 1rem 0rem;
    
    #nav-home {
        color: $color-text-strong;
        font-size: 1.3rem;
        font-weight: 500;
        transition: 0.3s;

        &:hover {
            color: $color-accent-strong;
            text-decoration: none;
        }
    }

    .nav-row {
        display: flex;
        align-items: center;

        &.nav-left {
            flex-direction: row;

            & > * {
                margin-right: 1.5rem;
            }
        }

        &.nav-right {
            flex-direction: row-reverse;

            & > * {
                margin-left: 1.5rem;
            }
        }
    }

    .main-btn {
        padding: 0.25rem 1rem;
        border: $color-accent 2px solid;
        border-radius: 0.5rem;
        color: $color-accent;
        transition: 0.3s;

        &:hover {
            text-decoration: none;
            color: $color-text-strong;
            background-color: $color-accent;
            border-color: $color-accent;
        }
    }

    #premium {
        color: $color-accent-strong;
    }
}
</style>