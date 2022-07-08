import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

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

    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="youemail@company.com" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />

                <button>Register</button>
            </form>
        </div>
    )
}