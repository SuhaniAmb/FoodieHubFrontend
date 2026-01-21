import { useState, useEffect } from "react";
import { getData, getDate, getTime, postData } from "../Services/Fetchnodeservices";
import { SquarePen, Trash, X } from "lucide-react";
import Swal from "sweetalert2";



type SectionType={
    sectionid:number;
    branchid:number;
    branchname:string;
    batchid:number;
    batchname:string;
    sectionname:string;
}






interface DisplayAllSectionProps{

    refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;

}



export default function DisplayAllSection({refresh}:DisplayAllSectionProps)
{


    const [sectionList,setSectionList]=useState<SectionType[]>([])
    const [sectionId,setSectionId]=useState('')
    const [search,setSearch]=useState('')
    const [openDialog,setOpenDialog]=useState(false)



/****************** EDIT SECTION ***************************************************/    




    
    const [branchId,setBranchId]=useState('')
    const [branchIdList,setBranchIdList]=useState<{ branchid:number, branchname:string }[]>([]);
    const [batchId,setBatchId]=useState('')
    const [batchIdList,setBatchIdList]=useState<{ batchid:number, batchname:string }[]>([]);
    const [sectionName,setSectionName]=useState('')



        
    const fetchBranch=async()=>{
        const res=await getData('branch/fetch_all_branch')
        setBranchIdList(res.data)

    }




    const fillBranch=()=>{
        return branchIdList.map((item)=>{
            return( <option value={item.branchid}> {item.branchname} </option> )
        })
    }



        
    const fetchBatch=async()=>{
        const res=await getData('batch/fetch_all_batch')
        setBatchIdList(res.data)

    }


    useEffect(function(){
        fetchBranch()
        fetchBatch()
    },[])



    const fillBatch=()=>{
        return batchIdList.map((item)=>{
            return( <option value={item.batchid}> {item.batchname} </option> )
        })
    }





    const handleClick=async()=>{
        const body={sectionid:sectionId,branchid:branchId,batchid:batchId,sectionname:sectionName,createddate:getDate,createdtime:getTime,userid:'xxxx'}
        const response=await postData('section/edit_section',body)
        if(response.status)
        {
          Swal.fire({ position:'center', icon:'success', title:response.message, showConfirmButton:false, timer:2000, toast:true});
            setOpenDialog(false)
            fetchAllSection()

        }
        else
        {
          Swal.fire({ position:'center', icon:'error', title:response.message, showConfirmButton:false, timer:2000, toast:true});
        }

    }


    const showEditSection=()=>{

    return(
    <div className="w-[100%] h-auto flex justify-center">
      <div className="w-[80%] border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className=" px-1 pb-2 w-full rounded-t-[5px] bg-[linear-gradient(90deg,hsla(321,41%,24%,1)_0%,hsla(330,53%,77%,1)_100%)] ">
          <div className=" flex flex-row w-full pt-2.5">
            <div className="font-bold text-[24px] text-white">HungerBuddy</div>
            <X className="text-white ml-auto cursor-pointer " onClick={handleCloseDialog} />
          </div>

            <div className="font-[700] text-[16px] text-white">Edit Food Section</div>
            
          </div>
        <div className="px-2 pt-4 w-full space-y-2 pb-5 " >
          <div className="flex gap-4 flex-row">
            <div className="relative w-full ">
              <select id="branchid" onChange={(e) => setBranchId(e.target.value)} value={branchId} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBranch()}
              </select>
              <label htmlFor="branchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch</label>
            </div>
            <div className="relative w-full ">
              <select id="batchid" onChange={(e) => setBatchId(e.target.value)} value={batchId} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBatch()}
              </select>
              <label htmlFor="branchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Batch</label>
            </div>

            <div className="relative w-full ">
                <input onChange={(e)=>setSectionName(e.target.value)} type="text" id="section" value={sectionName} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="section" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Section</label>
            </div>
          <div className="flex flex-row w-full space-x-14 items-center cursor-pointer  text-[hsla(321,32%,37%,1)] ">
            <button id="save" onClick={handleClick} className="w-full bg-[hsla(321,41%,24%,1)] text-white py-2 px-4 rounded-md transition-colors duration-200">Save</button>
            <button id="Clear" className="w-full bg-[hsla(321,41%,24%,1)] text-white py-2 px-4 rounded-md transition-colors duration-200">Clear</button>
          </div>
            </div>
        </div>
      </div>
    </div>



    )
}



/**********************************************************************************/
    


    const fetchAllSection=async()=>{

        const response=await getData('section/fetch_all_section')
        console.log(response.data);
        setSectionList(response.data)
    }



    useEffect(function(){
        fetchAllSection()
    },[refresh])

    


    
/****************** DIALOG ************** */

const showDialog = () => {
  return (
    <>
      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50" onClick={handleCloseDialog} >
          <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-3xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">{showEditSection()}</div>
          </div>
        </div>
      )}
    </>
  );
};

/******************************** */



  const handleOpenDialog=(item:SectionType)=>{

    console.log("Editing batch item:", item);

    setSectionId(`${item.sectionid}`)
    setBranchId(`${item.branchid}`)
    setBatchId(`${item.batchid}`)
    setSectionName(`${item.sectionname}`)

    setOpenDialog(true)
    }



       
        
                const handleDelete=async(sectionId:number)=>{
                    Swal.fire({
                    title: "Do you want to delete the selected Record ?",
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                    buttonsStyling: true, 
                    customClass: {
                    confirmButton: 'bg-blue-500 focus:outline-none text-white px-4 py-2 rounded hover:bg-blue-600',
                    cancelButton: 'bg-gray-500 focus:outline-none text-white px-4 py-2 rounded hover:bg-gray-600'
          }
                 }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) 
                {
                    const response=await postData('section/delete_section',{sectionid:sectionId})
                    Swal.fire({
                      title: response.message,
                      confirmButtonText: 'OK',
                      buttonsStyling: true,
                      customClass: {
                      confirmButton: 'bg-blue-500 hover:bg-blue-600 focus:outline-none text-white px-4 py-2 rounded'
                }
                    });
                    fetchAllSection()
                } 
                else if (result.isDenied) 
                {
                    Swal.fire("Changes are not saved", "", "info");
                }
             });
        
          }


     


    const handleCloseDialog=()=>{
    setOpenDialog(false)
  }






    const filteredSectionList=sectionList.filter((item)=>
        item.sectionname.toLowerCase().includes(search.toLowerCase()))




     

    const displaySection=()=>{
        return(

        <div className="w-screen h-auto flex justify-center " >
        <div className="w-[80%] p-6 box-border rounded-md shadow flex flex-col justify-end">
        <div className="w-full flex mb-4 justify-between items-center">
            <div className="text-lg font-semibold text-black-800 flex items-center">List Of Food Section</div>
            
        <div className="flex items-center px-4 py-2 rounded-md bg-white border border-gray-300 max-w-md w-100 ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904"
          className="fill-gray-600 mr-2 w-4 h-4">
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
        </svg>
        <input
          type="text"
          placeholder="Search Section Name..."
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full outline-none bg-transparent text-slate-600 text-sm  "
        />
        </div>
        </div>

        

        <div className="flex-1 overflow-auto bg-white min-h-0 ">
           <div className="overflow-x-auto" >
                <table className="min-w-full bg-white ">
                    <thead className="bg-white whitespace-nowrap" >
                        <tr>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Actions</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Branch</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Batch</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Section</th>
                        </tr>
                   </thead>
                   <tbody className="whitespace-nowrap" >
                    {filteredSectionList.map((item,index)=>(
                        <tr key={index}>
                            <td className="py-3 px-5 text-[15px] text-slate-900 font-medium" >
                                <div className="flex flex-row" >
                                    <button className="focus:outline-none hover:outline-none border-none bg-transparent cursor-pointer" title='Edit'> 
                                        <SquarePen className="h-5 w-5 flex justify-center  text-black " onClick={()=>handleOpenDialog(item)} />
                                    </button> 
                                    <button className="focus:outline-none hover:outline-none border-none bg-transparent cursor-pointer" title='Delete' onClick={()=>handleDelete(item.sectionid)} >
                                            <Trash className="h-5 w-5 flex justify-center ml-5"/>
                                    </button>
                                </div> 
                            </td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.branchname}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.batchname}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.sectionname}</td>
                        </tr>
                    ))}
                   </tbody>
                </table>
                {filteredSectionList.length==0 && (
                <div className="text-center text-gray-500 mt-4">No matching Section found....</div>
                 )}
           </div>
        </div>
        </div>
        </div>

        )
    }



    return(

    <div>
    <div className="min-h-screen flex justify-center items-start pt-10">
       {displaySection()}
    </div>
    {showDialog()}
    </div>

    )


}