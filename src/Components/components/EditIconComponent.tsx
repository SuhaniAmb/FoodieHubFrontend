import { Pencil } from "lucide-react";
import { useState } from "react";
import { serverURL } from "../Services/Fetchnodeservices";

export default function EditIconComponent({image})
{
    const [iconState, setIconState]=useState()


    const IconComponent=()=>{
        return(
            <div className="absolute top-0 left-0 bg-blue-500 text-white p-2" >
                <Pencil  />
            </div>
        )
    }


    return(
        <div className="absolute top-0 left-0 bg-blue-500 text-white p-2" >
            {iconState?<IconComponent/>:<></>}
            <img className="w-40 h-40 ronded " src={`${serverURL}/images/${image}`} alt="Category Icon"  onMouseOver={()=>setIconState(true)} onMouseLeave={()=>setIconState(false)}" /> 
        </div>
    )
}