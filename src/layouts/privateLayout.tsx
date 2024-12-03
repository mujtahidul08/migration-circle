import { Outlet } from "react-router-dom"

export default function PrivateLayout(){
    return(
        <div>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}