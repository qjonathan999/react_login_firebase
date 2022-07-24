import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import { Alert } from "./Alert"
import { Link } from "react-router-dom"

export default function Login() {
    const [user, setUser] = useState({ email: "", password: "" })
    const { login,loginWithGoogle,resetPassword} = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await login(user.email, user.password)
            navigate("/")
        } catch (error) {
            console.log(error)
            let new_error=""
            switch (error.code) {
                case "auth/wrong-password":
                    new_error="La cuenta o la contraseña es incorrecta"
                    break
                case "auth/user-not-found":
                    new_error="La cuenta no se encuentra registrada"
                    break
                case "auth/invalid-email":
                    new_error="Email inválido"
                    break
                case "auth/internal-error":
                    new_error="La contraseña es obligatoria"    
                    break
                default: new_error="Error en la bd"
            }
            setError(new_error)
        }
    }

    const handleGoogleSignin= async ()=>{
        try {
            await loginWithGoogle()
            navigate("/")   
        } catch (error) {
            console.log(error)
        }
    }

    const handleResetPassword= async ()=>{
        if(!user.email){
            setError("Por favor ingresa tu email")
        }else{
            try {
              await resetPassword(user.email)
              setError("Te enviamos un email con un link para resetear tu contraseña")
            } catch (error) {
                setError(error.message)
            }
        }

    }

    //Estilos de Tailwind
    const clase_container="w-full py-32 max-w-xs mx-auto"
    const clase_formulario="shadow-md rounded bg-slate-200 px-8 py-6"
    const clase_div_grupo="my-4"
    const clase_label="block text-slate-700 text-sm font-semibold my-2"
    const clase_input="shadow appearance-none border w-full rounded py-2 px-3 border-2 focus:outline-none focus:border-sky-500"
    const clase_boton="shadow bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold my-2 py-2 px-4 rounded"
    const clase_boton_google="w-full font-semibold text-lg my-2 py-2 px-4 rounded shadow-md bg-slate-200 hover:bg-slate-300 text-gray-800"
    const clase_link="flex justify-between my-1 text-sm text-zinc-800"
    const clase_link_pass="inline-block align-baseline font-medium text-sky-600 text-sm"
    const clase_div_login="flex items-center justify-between"

    return (
        <div className={clase_container}>
            {error && <Alert mensaje={error}/>}
            <form onSubmit={handleSubmit} className={clase_formulario}>
                <div className={clase_div_grupo}>
                    <label className={clase_label} htmlFor="email">Email</label>
                    <input className={clase_input} type="email" name="email" placeholder="youremail@company.com" onChange={handleChange} />
                </div>

                <div className={clase_div_grupo}>
                    <label className={clase_label} htmlFor="password">Password</label>
                    <input className={clase_input} type="password" name="password" id="password" placeholder="******" onChange={handleChange} />
                </div>

                <div className={clase_div_login}>
                    <button className={clase_boton}>Login</button>
                    <a onClick={handleResetPassword} href="#!" className={clase_link_pass}>Forgot Password?</a>
                </div>
                
                <p className={clase_link}>Don´t have an account?<Link to="/register">REGISTER</Link></p>
            </form>
            <button className={clase_boton_google} onClick={handleGoogleSignin}>Google</button>
        </div>
    )
}