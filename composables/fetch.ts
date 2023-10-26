export const useApiFetch = async (url: string, options: any = {}, skipAuth = false): Promise<any> => {
    const config = useRuntimeConfig()
    const apiUrl = process.server ? config.apiUrl : config.public.apiUrl

    if (!options.headers) {
        options.headers = {}
    }

    if (!skipAuth) {
        const auth = await useAuth()

        options.headers.Authorization = `Bearer ${auth.value.token}`
    }

    return await $fetch(`${apiUrl}${url}`, options)
}