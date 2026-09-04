import { useState, useEffect } from "react"
import { getData, serverURL, getDate, getTime, postData } from "../Services/Fetchnodeservices"
import { SquarePen, Trash, X } from "lucide-react";
//import { CloudUpload, X } from "lucide-react";
import Swal from "sweetalert2";
//import burger from "../../assets/burger.png";





type DeliveryboyType={

  delivery_id:number;
  branchid:number;
  deliveryname:string;
  dob:string;
  gender:string;
  mobileno:number;
  emailid:string;
  address:string;
  statename:number;
  cityname:string;
  state:number;
  city:number;
  aadharno:number;
  status:string;
  vehicleno:string;
  password:string;
  photograph:string;
}






interface DisplayAllDeliveryboyProps {

  refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;

}



export default function DisplayAllDeliveryboy({refresh}:DisplayAllDeliveryboyProps)
{


      const [deliveryboyList, setDeliveryboyList]=useState<DeliveryboyType[]>([])
      const [search,setSearch]=useState('')
      const [openDialog,setOpenDialog]=useState(false)
  



/***************** EDIT DELIVERYBOY ******************************************************************/      





    const [branchIdList,setBranchIdList]=useState<{ branchid:number, branchname:string }[]>([])
    const [cityList,setCityList]=useState<{ cityid:number, cityname:string }[]>([])
    const [stateList,setStateList]=useState<{ stateid:number, statename:string }[]>([])

    const [deliveryboyId,setdeliveryboyId]=useState('')
    const [branchId,setBranchId]=useState('')
    const [deliveryName,setDeliveryName]=useState('')
    const [dob,setDob]=useState('')
    const [gender,setGender]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [emailId,setEmailId]=useState('')
    const [address,setAddress]=useState('')
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [aadharNo,setAadharNo]=useState('')
    const [status,setStatus]=useState('')
    const [vehicleNo,setVehicleNo]=useState('')
   {/* const [photograph, setPhotograph] = useState<{ bytes: File | null; fileName: string;}>({bytes: null,fileName: burger}); */}
    const [password,setPassword]=useState('')

  


  const fetchBranch=async()=>{
    const response=await getData('branch/fetch_all_branch')
    setBranchIdList(response.data)
  }



  const fetchState=async()=>{
    const response=await getData('statecity/fetch_states')
      setStateList(response.data)
  }

        

  const fetchCity=async(sid:number)=>{
    const response=await postData('statecity/fetch_cities',{stateid:sid})
    setCityList(response.data)
  }


  useEffect(function(){
    fetchBranch()
    fetchState()
  },[])


  const fillBranch=()=>{
    return branchIdList.map((item)=>{
      return( <option value={item.branchid} >{item.branchname}</option> )
    })
  }




  const fillState=()=>{
    return stateList.map((item)=>{
      return( <option value={item.stateid}> {item.statename} </option> )
      })
    }
     

        
  const fillCity=()=>{
    return cityList.map((item)=>{
      return( <option value={item.cityid}> {item.cityname} </option> )
      })
  }

        

      
  const handleStateChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
    const stateId = Number(e.target.value);
      setState(stateId.toString())
      fetchCity(stateId)
  }


  {/*
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) 
    {
      setPhotograph({ bytes: file, fileName: URL.createObjectURL(file)});
    }
  };

*/}


  
    const handleClick = async () => {
                const body={
                'branchid':branchId, 
                'deliveryname':deliveryName, 
                'dob':dob,
                'gender':gender,
                'mobileno':mobileNo,
                'emailid':emailId,
                'address':address,
                'city':city,
                'state':state,
                'aadharno':aadharNo,
                'status':status,
                'vehicleno':vehicleNo,
                'password':password,
                'createddate':getDate(),
                'createdtime':getTime(),
                'userid':'xxxx',
                'delivery_id':deliveryboyId
            }
 

        const response = await postData("deliveryboy/edit_deliveryboy", body);
  
      if (response.status) 
      {
        Swal.fire({ position: "center", icon: "success", title: response.message, showConfirmButton: false, timer: 2000,toast: true });
        setOpenDialog(false)
        fetchAllDeliveryboy()
      } 
      else 
      {
        Swal.fire({ position: "center", icon: "error", title: response.message, showConfirmButton: false, timer: 2000, toast: true });
      }
    }
  


const showEditDeliveryboy=()=>{
    return(
    <div className="w-[100%] h-auto flex justify-center">
      <div className="w-[80%] border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className=" px-1 pb-2 w-full rounded-t-[5px] bg-[linear-gradient(90deg,hsla(321,41%,24%,1)_0%,hsla(330,53%,77%,1)_100%)] ">
          <div className=" flex flex-row w-full pt-2.5">
            <div className="font-bold text-[24px] text-white">FoodieHub</div>
            <X className="text-white ml-auto cursor-pointer " onClick={handleCloseDialog} />
          </div>

            <div className="font-[700] text-[16px] text-white">Edit Deliveryboy</div>
            
          </div>
        <div className="flex p-4 w-full items-center justify-between flex-wrap">
          <div className="relative w-1/3 p-2 ">
            <select id="branchid" onChange={(e)=>setBranchId(e.target.value)} value={branchId} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBranch()}
            </select>
              <label htmlFor="branchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch</label>
          </div>
          <div className="relative w-1/3 p-2 ">
            <input onChange={(e) => setDeliveryName(e.target.value)} type="text" id="deliveryname" value={deliveryName} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="deliveryname" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Deliveryboy Name</label>
          </div>
          <div className="relative w-1/3 p-2 ">
            <input onChange={(e) => setDob(e.target.value)} type="date" id="dob" value={dob} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="dob" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500">Date Of Birth</label>
          </div>
          <div className="relative w-1/3 p-2 flex flex-col justify-center border border-gray-600 rounded-md px-3 pt-6 pb-2 bg-white">
            <label htmlFor="gender" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-focus:text-blue-500 font-medium">Gender</label>
            <div className="flex items-center justify-between mt-1">
                <label className="flex items-center space-x-2 text-gray-900">
                   <input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} className="accent-blue-500 h-4 w-4 cursor-pointer"/>
                   <span className="text-sm">Male</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-900">
                   <input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} className="accent-blue-500 h-4 w-4 cursor-pointer"/>
                   <span className="text-sm">Female</span>
                </label>
            </div>
          </div>
          <div className="relative w-1/3 p-2 ">
            <input onChange={(e) => setMobileNo(e.target.value)} type="text" id="mobileno" value={mobileNo} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="mobileno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Mobile No.</label>
          </div>
            <div className="relative w-1/3 p-2 ">
            <input onChange={(e) => setEmailId(e.target.value)} type="text" id="emailid" value={emailId} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="emailid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Email Id</label>
          </div>
          <div className="relative w-1/3 p-2 ">
            <select id="state" onChange={handleStateChange} value={state} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillState()}
            </select>
              <label htmlFor="state" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >State</label>
          </div>
          <div className="relative w-1/3 p-2 ">
            <select id="city" onChange={(e)=>setCity(e.target.value)} value={city} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillCity()}
            </select>
              <label htmlFor="city" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >City</label>
          </div>
          <div className="relative w-1/3 p-2 ">
            <input onChange={(e) => setAddress(e.target.value)} type="text" id="address" value={address} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="address" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Address</label>
          </div>
          <div className="relative w-1/3 p-2 ">
            <input onChange={(e) => setAadharNo(e.target.value)} type="text" id="aadharno" value={aadharNo} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="aadharno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Aadhar No</label>
          </div>
          <div className="relative w-1/3 p-2 ">
            <select id="status" onChange={(e)=>setStatus(e.target.value)} value={status} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                <option>Available</option>
                <option>Unavailable</option>
            </select>
              <label htmlFor="status" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Status</label>
          </div>
          <div className="relative w-1/3 p-2 ">
            <input onChange={(e) => setVehicleNo(e.target.value)} type="text" id="Vehicleno" value={vehicleNo} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="vehicleno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Vehicle No</label>
          </div>
          <div className="relative w-1/3 p-2 ">
            <input onChange={(e) => setPassword(e.target.value)} type="text" id="password" value={password} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="password" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Password</label>
          </div>
          <div className="flex flex-row w-full space-x-14 items-center cursor-pointer  text-[hsla(321,32%,37%,1)] ">
            <button id="save" onClick={handleClick} className="w-full bg-[hsla(321,41%,24%,1)] text-white py-2 px-4 rounded-md transition-colors duration-200">Save</button>
            <button id="Clear" className="w-full bg-[hsla(321,41%,24%,1)] text-white py-2 px-4 rounded-md transition-colors duration-200">Clear</button>
          </div>
        </div>
      </div>
    </div>
        
    )
  }



/****************************************************************************************************/




    const fetchAllDeliveryboy=async()=>{
        const response=await getData('deliveryboy/fetch_deliveryboy')
        setDeliveryboyList(response.data)
    }



    useEffect(function(){
        fetchAllDeliveryboy()
    },[refresh])




    const filteredDeliveryboyList = deliveryboyList.filter((item) =>
    item.deliveryname.toLowerCase().includes(search.toLowerCase())
  )






  
  const handleOpenDialog=(item: DeliveryboyType)=>{

    setdeliveryboyId(`${item.delivery_id}`)
    setBranchId(`${item.branchid}`)
    setDeliveryName(`${item.deliveryname}`)
    setDob(`${item.dob}`)
    setGender(`${item.gender}`)
    setMobileNo(`${item.mobileno}`)
    setEmailId(`${item.emailid}`)
    setAddress(`${item.address}`)
    setCity(`${item.city}`)
    setState(`${item.state}`)
    setAadharNo(`${item.aadharno}`)
    setStatus(`${item.status}`)
    setVehicleNo(`${item.vehicleno}`)
    setPassword(`${item.password}`)

    fetchCity(item.state)

    setOpenDialog(true)
    }



        

/****************** DIALOG ************** */

const showDialog = () => {
  return (
    <>
      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50" onClick={handleCloseDialog} >
          <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-3xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">{showEditDeliveryboy()}</div>
          </div>
        </div>
      )}
    </>
  );
};

/******************************** */




 

    const handleDelete=async(deliveryId:number)=>{
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
            const response=await postData('deliveryboy/delete_deliveryboy',{delivery_id:deliveryId})
            Swal.fire({
              title: response.message,
              confirmButtonText: 'OK',
              buttonsStyling: true,
              customClass: {
              confirmButton: 'bg-blue-500 hover:bg-blue-600 focus:outline-none text-white px-4 py-2 rounded'
        }
            });
            fetchAllDeliveryboy()
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





 const displayDeliveryboy=()=>{
    return(


        <div className="w-screen h-auto flex justify-center" >

        <div className="w-[80%] p-6 box-border flex flex-col justify-end rounded-md shadow  ">
       <div className="w-full flex mb-4 justify-between items-center">
            <div className="text-lg font-semibold text-black-800 flex items-center">List Of Deliveryboy</div>
            

        <div className="flex items-center px-4 py-2 rounded-md bg-white border border-gray-300 max-w-md w-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904"
          className="fill-gray-600 mr-2 w-4 h-4">
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
        </svg>
        <input
          type="text"
          placeholder="Search Category Name..."
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full outline-none bg-transparent text-slate-600 text-sm"
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
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Delivery Name</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >DOB/Gender</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Mobile No</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Email Id</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Address</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Aadhar No</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Status</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Vehicle No</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Password</th>

                            <th className="py-3 px-4 text-[17px] font-quicksand text-black" >Photograph</th>
                        </tr>
                   </thead>
                   <tbody className="whitespace-nowrap" >
                    {filteredDeliveryboyList.map((item,index)=>(
                        <tr key={index} >
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >
                                <div className="flex flex-row" >
                                    <button className="focus:outline-none hover:outline-none border-none bg-transparent cursor-pointer" title='Edit'> 
                                        <SquarePen className="h-5 w-5 flex justify-center  text-black " onClick={()=>handleOpenDialog(item)} />
                                    </button> 
                                    <button className="focus:outline-none hover:outline-none border-none bg-transparent cursor-pointer" title='Delete'>
                                            <Trash className="h-5 w-5 flex justify-center ml-5" onClick={()=>handleDelete(item.delivery_id)} />
                                    </button>
                                </div> 
                            </td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.branchid}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.deliveryname}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.dob}/{item.gender}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.mobileno}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.emailid}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.address}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.aadharno}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.status}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.vehicleno}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.password}</td>

                            <td className="py-3 px-4" ><img src={`${serverURL}/images/${item.photograph}`} alt="icon" className="w-10 h-10 rounded-[10px] mx-auto " /></td>
                        </tr>
                    ))}
                   </tbody>
                </table>
                {filteredDeliveryboyList.length === 0 && (
                <div className="text-center text-gray-500 mt-4">No matching deliveryboy found....</div>
              )}
           </div>
        </div>
        </div>
        </div>
    )
 }

    




    ///////////////////////////////////////////////////////////////////
    return(
    <div>
    <div className="min-h-screen flex justify-center items-start pt-10">
       {displayDeliveryboy()}
    </div>
    {showDialog()}
    </div>

    )



}
