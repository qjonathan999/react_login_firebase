import { createContext,useContext} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase"

export const authContext = createContext()

export const useAuth=()=>{
    const context = useContext(authContext)

    if (!context){
        throw new Error("There is not Provider")
    }

    return context
}

export default function authProvider({children}){
    const signup=(email,password)=>{
        //Funcion de Firebase que ejecuta el registro
        return createUserWithEmailAndPassword(auth,email,password)
    }
    return(
        <authContext.Provider value={{signup}}>
            {children}
        </authContext.Provider>
    )
}