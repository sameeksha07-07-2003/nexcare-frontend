import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
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

  useEffect(() => {
    function handleUnauthorized() {
      setSession(null)
    }

    window.addEventListener(
      'nexcare:unauthorized',
      handleUnauthorized,
    )

    return () => {
      window.removeEventListener(
        'nexcare:unauthorized',
        handleUnauthorized,
      )
    }
  }, [])

  useEffect(() => {
    if (!session?.expiresAt) {
      return undefined
    }

    const remainingMilliseconds =
      session.expiresAt - Date.now()

    if (remainingMilliseconds <= 0) {
      const timeoutId = window.setTimeout(() => {
        clearToken()
        setSession(null)
      }, 0)

      return () => window.clearTimeout(timeoutId)
    }

    const maximumTimeout = 2_147_483_647
    const timeoutId = window.setTimeout(() => {
      clearToken()
      setSession(null)
    }, Math.min(remainingMilliseconds, maximumTimeout))

    return () => window.clearTimeout(timeoutId)
  }, [session?.expiresAt])

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

  const value = useMemo(
    () => ({
      user: session
        ? {
            email: session.email,
            role: session.role,
          }
        : null,
      token: session?.token ?? null,
      role: session?.role ?? null,
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
