import React, { useEffect } from "react"
import Head from "next/head"
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../utils/auth'
import Router from "next/router";

export default function Home () {
  const { isAuthenticated, login } = useAuth()

  useEffect(() => {
    // Prefetch the dashboard page as the user will go there after the login
    Router.prefetch('/citizen')
    if (isAuthenticated) Router.push('/citizen')
  }, [isAuthenticated])
  
  return (
    <div>
      <Head>
        <title>Página Inicial</title>
      </Head>
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col w-1/4 p-4 bg-white rounded-lg">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                  .min(2, 'Too Short!')
                  .max(50, 'Too Long!')
                  .required('Este campo é necessário.'),
                password: Yup.string()
                  .required('Este campo é necessário.'),
              })}
            onSubmit={(values, { setSubmitting }) => {
              console.info(values)
              login(values.username, values.password)
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="username" className="font-semibold">
                  Nome de usuário
                </label>
                <input
                  type="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className="p-2 bg-gray-100 rounded-md shadow"
                />
                {errors.username && touched.username && errors.username}
                <label htmlFor="username" className="mt-4 font-semibold">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="p-2 bg-gray-100 rounded-md shadow"
                />
                {errors.password && touched.password && errors.password}
                <button className="p-2 mt-6 font-bold transition-colors duration-300 rounded-md shadow focus:outline-none hover:bg-secondary hover:text-primary text-secondary bg-primary" type="submit" disabled={isSubmitting}>
                  Enviar
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
