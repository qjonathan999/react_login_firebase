import {useAuth} from "../context/authContext"

export default function Home(){
    const {user,logout,loading} = useAuth()

    console.log(user)

    const handleLogout=async()=>{
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    //Estilos de Tailwind
    const clase_container="w-full max-w-xs m-auto text-black py-40"
    const clase_tarjeta="bg-white rounded shadow-md p-8"
    const clase_titulo="text-xl font-medium my-4 text-slate-900"
    const clase_boton_logout="w-full font-semibold text-lg my-2 py-2 px-4 rounded shadow-md bg-red-400 hover:bg-red-600 text-white"

    return(
        <div className={clase_container}>
            <div className={clase_tarjeta}>
                <h1 className={clase_titulo}>Welcome <br/> {user.displayName}</h1>
                <button className={clase_boton_logout} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}