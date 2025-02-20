import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const { register } = useForm()
  return (
    <>
      <section>
        <span className='font-bold text-lg mb-5'>
          "TODO" con useForm
        </span>
        <Formulario />
        <Datos />
      </section>
    </>
  )
}

const Formulario = () => {

  return (
    <form action="" className='flex flex-col'>
      Este es el form
      <label htmlFor="name"></label>
      <input type="text" />
      <button>
        Enviar datos
      </button>
    </form>
  )
}

const Datos = () => {
  return (
    <>
      <span>Soy datos</span>
    </>
  )
}

export default App
