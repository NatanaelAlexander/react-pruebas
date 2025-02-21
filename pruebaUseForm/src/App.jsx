import { useForm } from 'react-hook-form'
import { useState } from 'react'
import './App.css'

function App() {

  const [datos, setDatos] = useState([])

  /*   const handleNewData = (newData) => {
      setDatos(preview => [...preview, newData])
    } */

  return (
    <>
      <section className='bg-zinc-800 h-svh text-white flex flex-col justify-center items-center text- gap-10 lg:flex-row'>
        <div>
          <span className='font-bold flex justify-center text-lg mb-5'>
            "TO DO" con useForm
          </span>
          {/* <Formulario onSubmit={handleNewData}, pero resumido /> */}
          <Formulario onSubmit={(newData) => setDatos(datosActual => [...datosActual, newData])} />
        </div>
        <Datos datos={datos} />
      </section>
    </>
  )
}

const Formulario = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "Natanael"
    }
  })

  const submit = handleSubmit((data) => {
    /* Solo se ejecuta si todo esta ok, sin ningun error */
    console.log(data)
    console.log(errors)
    /* El callBack pasa estado de form */
    onSubmit(data)
    /* Limpiar formulario */
    reset()
  })

  return (
    /* Hacerlo con nombre, correo, contraseña, confirmar contraseña, fecha compleaños, un numero (literal poner ingresar un numero), checkbox, select y foto de perfil  */
    <form onSubmit={submit} className='flex flex-col gap-5 w-[500px]'>
      {/* Despues hacer componetizado esto */}
      <div className='flex flex-col'>
        <label className='text-start pl-1' htmlFor="name">Nombre</label>
        {/* Le paso el dafault nombre desde el useForm de arriba, se lo paaso como objeto */}
        <input
          className='bg-gray-500/30 px-2'
          type="text"
          {...register('name', {
            required: {
              value: true,
              message: 'el nombre es requerido'
            },
            maxLength: {
              value: 20,
              message: 'maximo 20 caracteres'
            }
          })}
        />
        {errors.name && <span className='text-red-500/80 text-start'>{errors.name.message}</span>}
      </div>

      <div className='flex flex-col'>
        <label className='text-start pl-1' htmlFor="email">Correo</label>
        <input
          className='bg-gray-500/30 px-2'
          type="email"
          {...register('email', {
            required: {
              value: true,
              /* Mensaje por si falla */
              message: 'el correo es requerido'
            },
            /* pattern = para validar expresión regular */
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/,
              message: "Correo no válido",
            },
          })}
        />
        {/* Si existe el error de email, que busque el mensaje */}
        {errors.email && <span className='text-red-500/80 text-start'>{errors.email.message}</span>}
      </div>

      <div className='flex flex-col'>
        <label className='text-start pl-1' htmlFor="date">Nacimiento</label>
        <input
          className='bg-gray-500/30 px-2'
          type="date"
          {...register('fecha_nacimiento', {
            required: {
              value: true,
              message: 'Fecha de nacimiento requerida'
            },
            /* validate  = función personalizada y (value) el valor del input  */
            validate: (value) => {
              const nacimiento = new Date(value)
              const actual = new Date();
              const edad = actual.getFullYear() - nacimiento.getFullYear();
              return edad >= 18 || "debe ser mayor de edad"
            }
          })}
        />
        {errors.fecha_nacimiento && <span className='text-red-500/80 text-start'>{errors.fecha_nacimiento.message}</span>}
      </div>

      <div className='flex flex-col'>
        <label className='text-start pl-1' htmlFor="password">Contraseña</label>
        <input
          className='bg-gray-500/30 px-2'
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'contraseña requerida'
            },
            minLength: {
              value: 6,
              message: 'minimo 6 caracteres'
            }
          })}
        />
        {errors.password && <span className='text-red-500/80 text-start'>{errors.password.message}</span>}
      </div>

      <div className='flex flex-col'>
        <label className='text-start pl-1' htmlFor="repeatPassword">Repetir contraseña</label>
        <input
          className='bg-gray-500/30 px-2'
          type="password"
          {...register('repeat_password', {
            required: {
              value: true,
              message: 'contraseña requerida'
            },
            validate: (value) => {
              /* watch es un onChange de password, siempre lo escucha */
              return value === watch("password") || "las contraseñas no coinciden"
            }
          })}
        />
        {errors.repeat_password && <span className='text-red-500/80 text-start'>{errors.repeat_password.message}</span>}
      </div>

      <div className='flex flex-col'>
        <label className='text-start pl-1' htmlFor="sexo">Sexo</label>
        <select {...register("sexo")} className='bg-gray-500/30'>
          <option className='text-gray-500' value="sin especificar">no expecificar</option>
          <option className='text-gray-500' value="hombre">Hombre</option>
          <option className='text-gray-500' value="mujer">Mujer</option>
        </select>
        {errors.sexo && <span className='text-red-500/80 text-start'>{errors.sexo.message}</span>}
      </div>

      <div className='flex flex-col'>
        <label className='text-start pl-1' htmlFor="foto">Foto de perfil</label>
        {/* el register toma todos los datos de la imagen y los asigna creando un nuevo objeto */}
        {/* si necesitamos algun valor en especifico, utilizar el setValue y agregarselo en el handleSubmit, buscando el data.foto.length[0] */}
        <input className='bg-gray-500/30 cursor-pointer' type="file" {...register("foto", {
          required: {
            value: true,
            message: 'Debes subir un archivo'
          },
          validate: (fileList) => {
            const file = fileList[0]; // Obtiene el archivo subido
            /* Validado, si funciona, 1024 = 1kb */
            if (file.size > 2 * 1024 * 1024) return "El archivo debe pesar menos de 2MB"; // 2MB máximo
            return true;
          }
        })} />
        {errors.foto && <span className='text-red-500/80 text-start'>{errors.foto.message}</span>}
      </div>

      <div className='flex flex-col'>
        <label className='text-start pl-1' htmlFor="terminos">Aceptar términos y condiciones</label>
        <input className='bg-gray-500/30 px-2' type="checkbox" {...register("terminos", {
          required: {
            value: true,
            message: 'Debe aceptar términos y condiciones'
          }
        })} />
        {errors.terminos && <span className='text-red-500/80 text-start'>{errors.terminos.message}</span>}
      </div>

      <button type='submit' className='bg-black/80 rounded-lg py-1 hover:bg-black/20 transition-all duration-150 cursor-pointer'>
        Enviar datos
      </button>
    </form>
  )
}

const Datos = ({ datos }) => {
  return (
    <table className=''>
      <thead>
        <tr className='bg-gray-500/30'>
          <th className='px-10 border-r-2'>Nombre</th>
          <th className='px-10 border-r-2'>Correo</th>
          <th className='px-10 border-r-2'>Nacimiento</th>
          <th className='px-10 '>Contraseña</th>
          <th className='px-10 '>Sexo</th>
        </tr>
      </thead>
      <tbody className='text-sm'>
        {/* Aqui hacer el map */}
        {datos.map((item, index) => (
          <tr key={index}>
            <th>{item.name}</th>
            <th>{item.email}</th>
            <th>{item.fecha_nacimiento}</th>
            <th>{item.password}</th>
            <th>{item.sexo}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App