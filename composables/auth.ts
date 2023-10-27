import type { RouteLocationNormalized } from "vue-router"

export const useAuth = async (route: RouteLocationNormalized | null = null) => {
    const auth = useState('auth', (): Auth => ({
        token: '',
        user: null
    }))

    if (!auth.value.user) {
        auth.value = await initAuth(route)
    }

    return auth
}

export const initAuth = async (route: RouteLocationNormalized | null = null) => {
    const auth: Auth = {
        user: null,
        token: '',
    }

    if (!route) {
        route = useRoute()
    }
    const authCookie = useCookie('auth-token', {
        maxAge: 60 * 60 * 24 * 365 * 10, // ten years
        sameSite: 'lax',
        secure: true,
        httpOnly: false,
        path: '/',
    })

    if (route.query.code) {
        authCookie.value = route.query.code as string
    }

    if (authCookie.value) {
        auth.token = authCookie.value

        try {
            auth.user = await useApiFetch(
                '/account/me',
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                },
                true
            )
        } catch (e) {
            authCookie.value = ''
            auth.token = ''
        }
    }

    return auth
}

export const getAuthUrl = (redirect: string) => {
    const config = useRuntimeConfig()
    return `${config.public.apiUrl}/auth/login?return_to=${encodeURIComponent(redirect)}`
}

export type Auth = {
    token: string,
    user: UserAccount | null,
}