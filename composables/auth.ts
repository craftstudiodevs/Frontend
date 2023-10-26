import { useApiFetch } from "./fetch"

export const useAuth = async () => {
    const auth = useState('auth', (): Auth => ({
        token: '',
        user: null
    }))

    if (!auth.value.token) {
        auth.value = await initAuth()
    }

    return auth
}

export const initAuth = async () => {
    const auth: Auth = {
        user: null,
        token: '',
    }

    const route = useRoute()
    const authCookie = useCookie('auth-token', {
        maxAge: 60 * 60 * 24 * 365 * 10, // ten years
        sameSite: 'lax',
        secure: true,
        httpOnly: false,
        path: '/',
    })

    if (route.query.code) {
        console.log('auth code', route.query.code)
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
            console.log('auth error', e)
        }
    }

    return auth
}

export const getAuthUrl = (redirect: string) => {
    const config = useRuntimeConfig()
    console.log(redirect)
    return `${config.public.apiUrl}/auth/login?return_to=${encodeURIComponent(redirect)}`
}

export type Auth = {
    token: string,
    user: UserAccount | null,
}