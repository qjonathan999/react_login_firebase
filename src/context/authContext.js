import { createContext,useContext} from "react";

export const authContext = createContext()

export const useAuth=()=>{
    const context = useContext(authContext)

    if (!context){
        throw new Error("There is not Provider")
    }

    return context
}

export default function authProvider({children}){
    const user={
        login:true
    }

    return(
        <authContext.Provider value={{user}}>
            {children}
        </authContext.Provider>
    )
}