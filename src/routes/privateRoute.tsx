
import PrivateLayout from "@/layouts/privateLayout"
import React from "react"
import { Navigate} from "react-router-dom"

interface privateRouteProps{
    isAuthenticated: boolean
}
const PrivateRoute: React.FC<privateRouteProps> = ({isAuthenticated})=>{
    return isAuthenticated ? <PrivateLayout/> : <Navigate to="/login"/>
    
}
export default PrivateRoute