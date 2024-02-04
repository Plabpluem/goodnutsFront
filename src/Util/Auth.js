import { Navigate, redirect,} from "react-router-dom"
import { useUserAuth } from "../Context/Authredux"

export const getAuthToken = () => {
    const token = localStorage.getItem('token')
    if(!token){
        return null
    }
    const tokenDuration = loadAuthToken()
    if(tokenDuration<0){
        return 'EXPIRED'
    }
    return token
}

export const checkAuthToken = () => {
    const token = getAuthToken()
    const email = localStorage.getItem("email");
    if((email !== 'plurm@windowslive.com' && token)){
        return redirect('/')
    }else if (!token){
        return redirect('/login')
    }
    return null
}

export const getProductId = () => {
    const productId = localStorage.getItem('product')
    return productId
}
export const loadAuthToken = () => {
    const authExpire = localStorage.getItem('expiration')
    const exp = new Date(authExpire)
    const now = new Date()
    const duration = exp.getTime() - now.getTime()
    return duration
}

const GetAuthRoute = ({children}) => {
    const {user} = useUserAuth()
    if(!user){
        return <Navigate to='/product' />
    }
    return children
    
}

export default GetAuthRoute

export const GotAuthRoute =({children}) => {
    const {user} = useUserAuth()
    if (user){
        return <Navigate to='/product' />
    }
    return children
}

export const GetAuthToken = () => {
    const {user} = useUserAuth()
    if(!user){
        return <Navigate to='/product' />
    }
    return null
}