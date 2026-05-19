import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('fitstack_token')
    const userData = localStorage.getItem('fitstack_user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Fake JWT auth
    const users = JSON.parse(localStorage.getItem('fitstack_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, message: 'Invalid email or password.' }

    const fakeToken = btoa(`${email}:${Date.now()}`)
    const userData = { id: found.id, name: found.name, email: found.email }
    localStorage.setItem('fitstack_token', fakeToken)
    localStorage.setItem('fitstack_user', JSON.stringify(userData))
    setUser(userData)
    return { success: true }
  }

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('fitstack_users') || '[]')
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered.' }
    }
    const newUser = { id: Date.now().toString(), name, email, password }
    users.push(newUser)
    localStorage.setItem('fitstack_users', JSON.stringify(users))
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('fitstack_token')
    localStorage.removeItem('fitstack_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
