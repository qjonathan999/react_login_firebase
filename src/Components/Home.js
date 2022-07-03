import { useContext } from "react"
import {context, useAuth} from "../context/authContext"

export default function Home(){
    const {user} = useAuth()
    console.log(user)

    return(
        <h1>Home</h1>
    )
}