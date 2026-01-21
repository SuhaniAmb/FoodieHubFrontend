import FooditemsInterface from "./FooditemsInterface";
import DisplayFooditems from "./DisplayFooditems";
import { useState } from "react";


export default function Fooditems()
{

    const [refresh,setRefresh]=useState(false)
    
    return(
        <div>
            <FooditemsInterface refresh={refresh} setRefresh={setRefresh} />
            <DisplayFooditems refresh={refresh} setRefresh={setRefresh} />
        </div>
    )
}