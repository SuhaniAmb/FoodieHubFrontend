import { useEffect, useState } from "react";
import { getData, getDate, getTime, postData } from "../Services/Fetchnodeservices";
import Swal from "sweetalert2";
import { Save, Trash2  } from "lucide-react";


interface DisplayAllBranchProps {
  refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function BranchInterface({refresh,setRefresh}:DisplayAllBranchProps) {


  const [branchName,setBranchName]=useState('')
  const [address,setAddress]=useState('')
  const [latLong,setLatLong]=useState('')
  const [stateId,setStateId]=useState('')
  const [stateIdList, setStateIdList] = useState<{ stateid: number, statename: string }[]>([]);
  const [cityId,setCityId]=useState('')
  const [cityIdList,setCityIdList]=useState<{ cityid: string; cityname: string }[]>([]);
  const [emaiId,setEmailId]=useState('')
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

    const body={branchname:branchName,address:address,latlong:latLong,cityid:cityId,stateid:stateId,emailid:emaiId,contactnumber:contactNumber,contactperson:contactPerson,createddate:getDate(),createdtime:getTime(),userid:'xxxxx'}
     
    const response=await postData('branch/submit_branch',body)
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



  return (
    <div className="w-[100%] h-auto flex justify-center">
      <div className="w-[80%] border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className="w-full rounded-t-[5px] bg-[linear-gradient(90deg,hsla(321,41%,24%,1)_0%,hsla(330,53%,77%,1)_100%)]">
          <div className="flex font-quicksand flex-col px-1 w-[30%] py-2.5" >
            <div className="font-bold text-[24px] text-white" >FoodieHub</div>
            <div className="font-[700] text-[16px] text-white" > New Food Branch</div>
          </div>
        </div>
        <div className="px-2 pt-4 w-full space-y-2 pb-5 " >
          <div className="flex gap-4 flex-row">
            <div className="relative w-[20%] ">
                <input onChange={(e)=>setBranchName(e.target.value)} type="text" id="branchname" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="branchname" className="absolute z-10 left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch Name</label>
            </div>
            <div className="relative w-[20%] ">
                <input onChange={(e)=>setAddress(e.target.value)} type="text" id="address" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="address" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Address</label>
            </div>
            <div className="relative w-[20%] ">
                <input onChange={(e)=>setLatLong(e.target.value)} type="text" id="latlong" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="latlong" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Lat Long</label>
            </div>
            <div className="relative w-[20%] ">
              <select id="stateid" onChange={handleStateChange} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillState()}
              </select>
              <label htmlFor="stateid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >State</label>
            </div>
            <div className="relative w-[20%] ">
              <select id="cityid" onChange={(e) => setCityId(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillCity()}
              </select>
              <label htmlFor="cityid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >City</label>
            </div>
            </div>
          <div className="flex gap-4 flex-row">
            <div className="relative w-[19%] ">
                <input onChange={(e)=>setEmailId(e.target.value)} type="text" id="emailid" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="emailid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Email Id</label>
            </div>
            <div className="relative w-[19%] ">
                <input onChange={(e)=>setContactNumber(e.target.value)} type="text" id="contactnumber" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="contactnumber" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Contact Number</label>
            </div>
            <div className="relative w-[19%] ">
                <input onChange={(e)=>setContactPerson(e.target.value)} type="text" id="contactperson" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="contactperson" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Contact Person</label>
            </div>
            <div className="flex justify-center gap-40 items-center">
              <div className="flex flex-col w-[20%] items-center justify-center cursor-pointer text-[hsla(321,32%,37%,1)] " onClick={handleClick} >
                <Save id="saveIcon" className="h-9 w-9 text-[#692c55] " />
                  <span className="text-xs" >Save</span>
              </div>
              <div className="flex flex-col w-[20%] items-center justify-center cursor-pointer  text-[hsla(321,32%,37%,1)] " >
                <Trash2 id="trashIcon" className="h-9 w-9 text-[#692c55]" />
                <span className="text-xs" >Clear</span>
              </div>
              </div>
            </div>


        </div>
        

      </div>
    </div>
  );
}
