import DeliveryboyInterface from "./DeliveryboyInterface"
import DisplayAllDeliveryboy from "./DisplayAllDelivery"
import { useState } from "react"




export default function Deliveryboy()
{

    const [refresh,setRefresh]=useState(false)
    
    return(
        <div>
            <DeliveryboyInterface refresh={refresh} setRefresh={setRefresh} />
            <DisplayAllDeliveryboy refresh={refresh} setRefresh={setRefresh} />
        </div>
        
    )
}