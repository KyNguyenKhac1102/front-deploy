import React from 'react'
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'

export default function Home({userId}) {
  return (
    <>
      <Header userId={userId}/>  
      <RegisterForm userId={userId}/>
    </>
  )
}
