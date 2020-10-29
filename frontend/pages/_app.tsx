// @flow
import React from "react"
import App, { AppProps } from "next/app"
import "../css/tailwind.css"
import { AuthProvider } from "../utils/auth"
import Navbar from "../components/Navbar"
import { useRouter } from "next/router"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  const Router = useRouter()

  return (
    <>
      <div className="min-h-screen bg-secondary">
        <AuthProvider>
          {Router.pathname === '/' ? (
          <Component {...pageProps} />
          ) : (
            <div className="flex flex-col">
              <Navbar />
              <Component {...pageProps} />
            </div>
          )}
        </AuthProvider>
      </div>
    </>
  )
}
