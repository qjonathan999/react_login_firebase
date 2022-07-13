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

    return(
        <div>
            <h1>{user.email}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}