import EmployeeInterface from "./EmployeeInterface"
import DisplayAllEmployee from "./DisplayAllEmployee"
import { useState } from "react"




export default function Employee()
{

    const [refresh,setRefresh]=useState(false)
    
    return(
        <div>
            <EmployeeInterface refresh={refresh} setRefresh={setRefresh} />
            <DisplayAllEmployee refresh={refresh} setRefresh={setRefresh} />
        </div>
        
    )
}