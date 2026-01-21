import CategoryInterface from "./CategoryInterface"
import DisplayAllCategory from "./DisplayAllCategory";
import { useState } from "react";

export default function Category()
{

    const [refresh,setRefresh]=useState(false)


    return(
        <div>
            <CategoryInterface refresh={refresh} setRefresh={setRefresh} />
            <DisplayAllCategory refresh={refresh} setRefresh={setRefresh} />
        </div>
        )
}