export function decodeJwt(token) {
  try {
    const payload = token.split('.')[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0))
    return JSON.parse(new TextDecoder().decode(bytes))
  } catch {
    return null
  }
}

export function isTokenExpired(token) {
  const claims = decodeJwt(token)
  if (!claims || typeof claims.exp !== 'number') return true
  return claims.exp * 1000 <= Date.now()
}

export function getSessionFromToken(token) {
  if (!token || isTokenExpired(token)) return null

  const claims = decodeJwt(token)
  if (!claims.sub || !claims.role) return null

  return {
    email: claims.sub,
    role: claims.role, // "PATIENT" | "DOCTOR" | "ADMIN"
    expiresAt: claims.exp * 1000,
  }
}