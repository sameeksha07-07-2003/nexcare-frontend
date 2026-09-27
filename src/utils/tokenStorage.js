const TOKEN_KEY = "nexcare_access_token"

export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
    if (!token || typeof token !== "string") {
        throw new Error("A valid authentication token is required.")
    }

    sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
    sessionStorage.removeItem(TOKEN_KEY)
}
