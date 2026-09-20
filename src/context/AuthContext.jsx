import { createContext, useContext, useState } from 'react'
import { clearToken, getToken, setToken } from '../utils/tokenStorage'
import { getSessionFromToken } from '../utils/jwt'

const AuthContext = createContext(null)

// Runs once at startup: is there a valid saved token from a previous visit?
function readStoredSession() {
  const token = getToken()
  const session = getSessionFromToken(token)

  if (!session) {
    clearToken() // nothing saved, or it was expired/garbage: clean up
    return null
  }
  return { token, ...session }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)

  const login = (token) => {
    const next = getSessionFromToken(token)
    if (!next) throw new Error('The server returned an invalid login token.')

    setToken(token)
    setSession({ token, ...next })
    return next
  }

  const logout = () => {
    clearToken()
    setSession(null)
  }

  const value = {
    user: session ? { email: session.email, role: session.role } : null,
    token: session?.token ?? null,
    role: session?.role ?? null,
    isAuthenticated: Boolean(session),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}