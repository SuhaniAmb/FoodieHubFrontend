import BatchInterface from "./BatchInterface";
import DisplayAllBatch from "./DisplayAllBatch";
import { useState } from "react";



export default function Batch()
{

    const [refresh,setRefresh]=useState(false)

    return(
        <div>
            <BatchInterface refresh={refresh} setRefresh={setRefresh} />
            <DisplayAllBatch refresh={refresh} setRefresh={setRefresh} />
        </div>
    )
}