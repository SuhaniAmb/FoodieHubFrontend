import { useState, useEffect } from "react";
import { getData, getDate, getTime, postData } from "../Services/Fetchnodeservices";
import { SquarePen, Trash, X } from "lucide-react";
import Swal from "sweetalert2";







type BranchType={
    branchid:number;
    branchname:string;
    address:string;
    latlong:string;
    statename:string;
    cityname:string;
    stateid:number;
    cityid:number;
    emailid:string;
    contactnumber:string;
    contactperson:string;
    createddate: string;
    createdtime: string;
    userid: number;

}


interface DisplayAllBranchProps {
  refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function DisplayallBranch({refresh}:DisplayAllBranchProps)
{

    const [branchList,setBranchList]=useState<BranchType[]>([])
    const [branchId,setBranchId]=useState('')
    const [search,setSearch]=useState('')
    const [openDialog,setOpenDialog]=useState(false)



/******************EDIT BRANCH***************************************************** */





  const [branchName,setBranchName]=useState('')
  const [address,setAddress]=useState('')
  const [latLong,setLatLong]=useState('')
  const [stateId,setStateId]=useState('')
  const [stateIdList, setStateIdList] = useState<{ stateid: number, statename: string }[]>([]);
  const [cityId,setCityId]=useState('')
  const [cityIdList,setCityIdList]=useState<{ cityid: string; cityname: string }[]>([]);
  const [emailId,setEmailId]=useState('')
  const [contactNumber,setContactNumber]=useState('')
  const [contactPerson,setContactPerson]=useState('')
  


  const fetchState=async()=>{
    const response= await getData('statecity/fetch_states')
    setStateIdList(response.data)
  }


  const fetchCity=async(sid:string)=>{
    const response= await postData('statecity/fetch_cities',{stateid:sid})
    setCityIdList(response.data)
  }


  useEffect(function(){
    fetchState()
  },[])



  const fillState=()=>{
    return stateIdList.map((item)=>{
      return( <option value={item.stateid} >{item.statename}</option> )
    })
  }

  const fillCity=()=>{
    return cityIdList.map((item)=>{
      return( <option value={item.cityid} >{item.cityname}</option> )
    })
  }

const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setStateId(e.target.value);
  fetchCity(e.target.value);
};

  const handleClick=async()=>{

    const body={branchid:branchId,branchname:branchName,address:address,latlong:latLong,cityid:cityId,stateid:stateId,emailid:emailId,contactnumber:contactNumber,contactperson:contactPerson,createddate:getDate(),createdtime:getTime(),userid:'xxxxx'}
     
    const response=await postData('branch/edit_branch',body)
        if(response.status)
        {
          Swal.fire({ position:'center', icon:'success', title:response.message, showConfirmButton:false, timer:2000, toast:true});
            setOpenDialog(false)
            fetchAllBranch()

        }
        else
          Swal.fire({ position:'center', icon:'error', title:response.message, showConfirmButton:false, timer:2000, toast:true
          });
      
    
  }


const showEditBranch=()=>{
  return (
    <div className="w-[100%] h-auto flex justify-center">
      <div className="w-[80%] border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className=" px-1 pb-2 w-full rounded-t-[5px] bg-[linear-gradient(90deg,hsla(321,41%,24%,1)_0%,hsla(330,53%,77%,1)_100%)] ">
          <div className=" flex flex-row w-full pt-2.5">
            <div className="font-bold text-[24px] text-white">HungerBuddy</div>
            <X className="text-white ml-auto cursor-pointer " onClick={handleCloseDialog} />
          </div>

            <div className="font-[700] text-[16px] text-white">Edit Food Branch</div>
            
          </div>
        <div className="px-2 pt-4 w-full space-y-2 pb-5 " >
          <div className="flex gap-4 flex-row">
            <div className="relative w-full ">
                <input onChange={(e)=>setBranchName(e.target.value)} type="text" id="branchname" value={branchName} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="branchname" className="absolute z-10 left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch Name</label>
            </div>
            <div className="relative w-full ">
                <input onChange={(e)=>setAddress(e.target.value)} type="text" id="address" value={address} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="address" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Address</label>
            </div>
            </div>
          <div className="flex gap-4 flex-row">
            <div className="relative w-full ">
                <input onChange={(e)=>setLatLong(e.target.value)} type="text" id="latlong" value={latLong} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="latlong" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Lat Long</label>
            </div>
            <div className="relative w-full ">
              <select id="stateid" onChange={handleStateChange} value={stateId} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillState()}
              </select>
              <label htmlFor="stateid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >State</label>
            </div>
            </div>
          <div className="flex gap-4 flex-row">
            <div className="relative w-full ">
              <select id="cityid" onChange={(e) => setCityId(e.target.value)} value={cityId} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillCity()}
              </select>
              <label htmlFor="cityid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >City</label>
            </div>
            <div className="relative w-full ">
                <input onChange={(e)=>setEmailId(e.target.value)} type="text" id="emailid" value={emailId} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="emailid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Email Id</label>
            </div>
            </div>
          <div className="flex gap-4 flex-row">
            <div className="relative w-full ">
                <input onChange={(e)=>setContactNumber(e.target.value)} type="text" id="contactnumber" value={contactNumber} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="contactnumber" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Contact Number</label>
            </div>
            <div className="relative w-full ">
                <input onChange={(e)=>setContactPerson(e.target.value)} type="text" id="contactperson" value={contactPerson} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="contactperson" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Contact Person</label>
            </div>
            </div>
          <div className="flex flex-row w-full space-x-14 items-center cursor-pointer  text-[hsla(321,32%,37%,1)] ">
            <button id="save" onClick={handleClick} className="w-full bg-[hsla(321,41%,24%,1)] text-white py-2 px-4 rounded-md transition-colors duration-200">Save</button>
            <button id="Clear" className="w-full bg-[hsla(321,41%,24%,1)] text-white py-2 px-4 rounded-md transition-colors duration-200">Clear</button>
          </div>
            </div>
        </div>
      </div>
  );

}





/********************************************************************************* */




    const fetchAllBranch=async()=>{

        const response=await getData('branch/fetch_all_branch')
        console.log(response.data);
        setBranchList(response.data)
    }



    useEffect(function(){
        fetchAllBranch()
    },[refresh])



    
/****************** DIALOG ************** */

const showDialog = () => {
  return (
    <>
      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50" onClick={handleCloseDialog} >
          <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-3xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">{showEditBranch()}</div>
          </div>
        </div>
      )}
    </>
  );
};

/******************************** */

  const handleOpenDialog=(item:BranchType)=>{

    console.log("Editing branch item:", item);

    setBranchId(`${item.branchid}`)
    setBranchName(`${item.branchname}`)
    setAddress(`${item.address}`)
    setLatLong(`${item.latlong}`)
    setStateId(`${item.stateid}`)
    setCityId(`${item.cityid}`)
    setEmailId(`${item.emailid}`)
    setContactNumber(`${item.contactnumber}`)
    setContactPerson(`${item.contactperson}`)

    fetchCity(String(item.stateid))

    setOpenDialog(true)
    }



        const handleDelete=async(branchId:number)=>{
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
            const response=await postData('branch/delete_branch',{branchid:branchId})
            Swal.fire({
              title: response.message,
              confirmButtonText: 'OK',
              buttonsStyling: true,
              customClass: {
              confirmButton: 'bg-blue-500 hover:bg-blue-600 focus:outline-none text-white px-4 py-2 rounded'
        }
            });
            fetchAllBranch()
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






    const filteredBranchList=branchList.filter((item)=>
        item.branchname.toLowerCase().includes(search.toLowerCase()))


const displayBranch=()=>{
    return(
        <div className="w-screen h-auto flex justify-center " >
        <div className="w-[80%] p-6 box-border rounded-md shadow flex flex-col justify-end">
        <div className="w-full flex mb-4 justify-between items-center">
            <div className="text-lg font-semibold text-black-800 flex items-center">List Of Food Branch</div>
            
        <div className="flex items-center px-4 py-2 rounded-md bg-white border border-gray-300 max-w-md w-100 ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904"
          className="fill-gray-600 mr-2 w-4 h-4">
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
        </svg>
        <input
          type="text"
          placeholder="Search Branch Name..."
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
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Branch Name</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Address</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >LatLong</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >State/City</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Email Id</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Contact Number</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Contact Person</th>


                        </tr>
                   </thead>
                   <tbody className="whitespace-nowrap" >
                    {filteredBranchList.map((item,index)=>(
                        <tr key={index}>
                            <td className="py-3 px-5 text-[15px] text-slate-900 font-medium" >
                                <div className="flex flex-row" >
                                    <button className="focus:outline-none hover:outline-none border-none bg-transparent cursor-pointer" title='Edit'> 
                                        <SquarePen className="h-5 w-5 flex justify-center  text-black " onClick={()=>handleOpenDialog(item)} />
                                    </button> 
                                    <button className="focus:outline-none hover:outline-none border-none bg-transparent cursor-pointer" title='Delete' onClick={()=>handleDelete(item.branchid)} >
                                            <Trash className="h-5 w-5 flex justify-center ml-5"/>
                                    </button>
                                </div> 
                            </td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.branchname}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.address}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.latlong}</td>
                            <td className="pt-3 px-4 text-[15px] text-slate-900 font-medium" >{item.statename},{item.cityname}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.emailid}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.contactnumber}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.contactperson}</td>

                        </tr>
                    ))}
                   </tbody>
                </table>
                {filteredBranchList.length==0 && (
                <div className="text-center text-gray-500 mt-4">No matching Branches found....</div>
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
       {displayBranch()}
    </div>
    {showDialog()}
    </div>
 )

}