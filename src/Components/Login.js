import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import { Alert } from "./Alert"

export default function Login() {
    const [user, setUser] = useState({ email: "", password: "" })
    const { login,loginWithGoogle } = useAuth()
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

    return (
        <div>
            {error && <Alert mensaje={error}/>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="youremail@company.com" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />

                <button>Login</button>
            </form>
            <button onClick={handleGoogleSignin}>Google</button>
        </div>
    )
}