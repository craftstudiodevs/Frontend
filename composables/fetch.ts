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

    options.headers['Access-Control-Allow-Origin'] = '*'
    options.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'

    return await $fetch(`${apiUrl}${url}`, options)
}