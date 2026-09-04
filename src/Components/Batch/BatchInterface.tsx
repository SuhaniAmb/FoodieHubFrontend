import { useEffect, useState } from "react";
import { getData, getDate, getTime, postData } from "../Services/Fetchnodeservices";
import Swal from "sweetalert2";
import { Save, Trash2  } from "lucide-react";



interface DisplayAllBatchProps{

    refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;

}




export default function BatchInterface({refresh,setRefresh}:DisplayAllBatchProps)
{

    const [branchId,setBranchId]=useState('')
    const [branchIdList,setBranchIdList]=useState<{ branchid:number, branchname:string }[]>([]);
    const [batchName,setBatchName]=useState('')
    const [session,setSession]=useState('')


    
    const fetchBranch=async()=>{
        const res=await getData('branch/fetch_all_branch')
        setBranchIdList(res.data)

    }


    useEffect(function(){
        fetchBranch()
    },[])



    const fillBranch=()=>{
        return branchIdList.map((item)=>{
            return( <option value={item.branchid}> {item.branchname} </option> )
        })
    }



    const handleClick=async()=>{
        const body={branchid:branchId,batchname:batchName,session:session,createddate:getDate,createdtime:getTime,userid:'xxxx'}
        const response=await postData('batch/submit_batch',body)
        if(response.status)
        {
          Swal.fire({ position:'center', icon:'success', title:response.message, showConfirmButton:false, timer:2000, toast:true
          });
        }
        else
          Swal.fire({ position:'center', icon:'error', title:response.message, showConfirmButton:false, timer:2000, toast:true
          });
      
      setRefresh(!refresh)

    }




    return(

    <div className="w-[100%] h-auto flex justify-center">
      <div className="w-[80%] border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className="w-full rounded-t-[5px] bg-[linear-gradient(90deg,hsla(321,41%,24%,1)_0%,hsla(330,53%,77%,1)_100%)]">
          <div className="flex font-quicksand flex-col px-1 w-[30%] py-2.5" >
            <div className="font-bold text-[24px] text-white" >FoodieHub</div>
            <div className="font-[700] text-[16px] text-white mt-2" > New Food Batch</div>
          </div>
        </div>
        <div className="px-2 pt-4 w-full space-y-2 pb-5 " >
          <div className="flex gap-4 flex-row">
            <div className="relative w-full ">
              <select id="branchid" onChange={(e) => setBranchId(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBranch()}
              </select>
              <label htmlFor="branchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch</label>
            </div>
            <div className="relative w-full ">
                <input onChange={(e)=>setBatchName(e.target.value)} type="text" id="batchname" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="batchname" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Batch Name</label>
            </div>
            <div className="relative w-full ">
                <input onChange={(e)=>setSession(e.target.value)} type="text" id="session" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="session" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Session</label>
            </div>
            <div className="flex justify-center gap-40 items-center">
              <div className="flex flex-col w-[50%] items-center justify-center cursor-pointer text-[hsla(321,32%,37%,1)] " onClick={handleClick} >
                <Save id="saveIcon" className="h-9 w-9 text-[#692c55] " />
                  <span className="text-xs" >Save</span>
              </div>
              <div className="flex flex-col w-[50%] items-center justify-center cursor-pointer  text-[hsla(321,32%,37%,1)] " >
                <Trash2 id="trashIcon" className="h-9 w-9 text-[#692c55]" />
                <span className="text-xs" >Clear</span>
              </div>
              </div>
            </div>
        </div>
      </div>
    </div>


    )
}