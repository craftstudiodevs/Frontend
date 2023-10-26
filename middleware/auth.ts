export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = await useAuth()

    if (!auth.value.user) {
        const config = useRuntimeConfig()

        return navigateTo(getAuthUrl(`${config.baseUrl}${to.fullPath}`), { external: true })
    }
})