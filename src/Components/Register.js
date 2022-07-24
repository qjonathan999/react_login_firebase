import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import { Alert } from "./Alert"
import { Link } from "react-router-dom"

export default function Register() {
    const [user, setUser] = useState({ email: "", password: "" })
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await signup(user.email, user.password)
            navigate("/")
        } catch (error) {
            let new_error=""
            switch (error.code) {
                case "auth/email-already-in-use":
                    new_error="Email ya registrado. Por favor intenta con otro"
                    break
                case "auth/weak-password":
                    new_error="La constraseña debe tener al menos 6 caracteres" 
                    break 
                case "auth/invalid-email":
                    new_error="Email con formato inválido"
                    break
                case "auth/missing-email":
                    new_error="El email es obligatorio"
                    break
                case "auth/internal-error"     :
                    new_error="La contraseña es obligatoria"
                    break
                default: new_error="Error interno en la bd"    
            }
            setError(new_error)
        }
    }

    //Estilos de Tailwind
    const clase_container="py-32 w-full max-w-xs m-auto"
    const clase_formulario="shadow-md rounded bg-slate-200 px-8 py-6"
    const clase_div_grupo="my-4"
    const clase_label="block text-slate-700 text-sm font-semibold my-2"
    const clase_input="shadow appearance-none border w-full rounded py-2 px-3 border-2 focus:outline-none focus:border-sky-500"
    const clase_boton="shadow bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold my-2 py-2 px-4 rounded"
    const clase_link="flex justify-between my-1 text-sm text-zinc-800"


    return (
        <div className={clase_container}>
            {error && <Alert mensaje={error}/>}
            <form className={clase_formulario} onSubmit={handleSubmit}>        
                <div className={clase_div_grupo}>
                    <label className={clase_label} htmlFor="email">Email</label>
                    <input className={clase_input} type="email" name="email" placeholder="youemail@company.com" onChange={handleChange} />
                </div>

                <div className={clase_div_grupo}>
                    <label className={clase_label} htmlFor="password">Password</label>
                    <input className={clase_input} type="password" name="password" id="password" onChange={handleChange} />
                </div>

                <button className={clase_boton}>Register</button>
                <p className={clase_link}>Already have an account?<Link to="/login">LOGIN</Link></p>

            </form>
        </div>
    )
}