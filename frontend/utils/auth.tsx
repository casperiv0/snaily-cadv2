import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import api from './api'
import { useRouter } from 'next/router'
import { IAuth } from './interfaces/IAuth'
const AuthContext = createContext<Partial<IAuth>>({})

export const AuthProvider = ({ children }: { children: JSX.Element}): JSX.Element => {
  const [user, setUser] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token')
      if (token) {
        api.defaults.headers['x-auth-snailycad-token'] = token
        const { data } = await api.get('/auth/user')
        if (data) setUser(data.user[0])
      }
      setLoading(false)
    }

    loadUserFromCookies()
  }, [])

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const { data: oauth } = await api.post('/auth/login', {
        username,
        password,
      })
      if (oauth?.msg === 'LoggedIn') {
        Cookies.set('token', oauth.token, { expires: 1 })
        api.defaults.headers['x-auth-snailycad-token'] = oauth.token
        const { data } = await api.get('/auth/user')
        setUser(data.user[0])
      }
      /** 
      if (oauth) {
        Cookies.set('token', oauth.token, { expires: 1 })
        api.defaults.headers.Authorization = `Bearer ${oauth.access_token}`
        const { data: user } = await api.get('/current/user')
        setUser(user)
      }
      */
    } catch (e) {
        console.warn(e?.response?.msg)
        /** setNotify(
          'Se o problema persistir, entre em contato com os administradores.',
          'Erro do servidor',
          'error'
        )
        */
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(undefined)
    window.location.pathname = '/'
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export function ProtectRoute(Component) {
  function useProtectedRoute() {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated && !loading) router.replace('/')
    }, [loading, isAuthenticated, router])

    if (loading) {
      return (
        <div className="flex justify-center py-3 my-6">
          <svg
            className="w-5 h-5 mr-3 -ml-1 dark:text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )
    }

    return <Component {...arguments} />
  }

  return useProtectedRoute
}