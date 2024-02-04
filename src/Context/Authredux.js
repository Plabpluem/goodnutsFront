import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut } from 'firebase/auth'

import { auth } from '../firebase'

const userAuthContext = createContext()

export const UserAuthProvider = ({children}) => {
    const [user,setUser] = useState({})

    const signUp = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentuser)=>{
            setUser(currentuser)
        })
        return () => {
            unsubscribe()
        }
    },[])
    return (
        <userAuthContext.Provider value={{user,signUp,login,logout}}>
            {children}
        </userAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(userAuthContext)
}