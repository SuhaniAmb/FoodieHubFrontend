import StudentInterface from "./StudentInterface"
import DisplayAllStudent from "./DisplayAllStudent"
import { useState } from "react"




export default function Student()
{

    const [refresh,setRefresh]=useState(false)
    
    return(
        <div>
            <StudentInterface refresh={refresh} setRefresh={setRefresh} />
            <DisplayAllStudent refresh={refresh} setRefresh={setRefresh} />
        </div>
        
    )
}