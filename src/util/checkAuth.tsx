import Cookies from 'js-cookie'

export function checkAuthStatus(response: Response) {
    if (!response.ok) {
        if (response.status === 401) {
            Cookies.remove('auth')
            localStorage.removeItem('sidebar')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
    }
}