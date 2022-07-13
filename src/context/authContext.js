import { createContext,useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import {auth} from "../firebase"

export const authContext = createContext()

export const useAuth=()=>{
    const context = useContext(authContext)

    if (!context){
        throw new Error("There is not Provider")
    }

    return context
}

export default function AuthProvider({children}){
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const signup=(email,password)=>{
        //Funcion de Firebase que ejecuta el registro
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login=(email,password)=>{
        //Funcion de Firebase que ejecuta el login
        return signInWithEmailAndPassword(auth,email,password)
    }

    const loginWithGoogle=()=>{
        const googleProvider=new GoogleAuthProvider()
        return signInWithPopup(auth,googleProvider)
    }

    const logout=()=>{
        signOut(auth)
    }

    useEffect(()=>{
        onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
    },[])

    return(
        <authContext.Provider value={{signup,login,logout,user,loading,loginWithGoogle}}>
            {children}
        </authContext.Provider>
    )
}