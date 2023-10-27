export default defineNuxtRouteMiddleware(async (to, from) => {
    const config = useRuntimeConfig()

    const auth = await useAuth(to)

    if (!auth.value.user) {
        const baseUrl = process.server ? config.baseUrl : config.public.baseUrl
        return navigateTo(getAuthUrl(`${baseUrl}${to.fullPath}`), { external: true })
    }

    if (!auth.value.user.developerAccount) {
        return abortNavigation('You must have a developer account to access this page')
    }

    if (!auth.value.user.buyerAccount && !auth.value.user.developerAccount) {
        return navigateTo('/account/onboarding')
    }
})