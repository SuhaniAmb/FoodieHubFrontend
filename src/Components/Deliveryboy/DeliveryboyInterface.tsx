import { CloudUpload, Save, Trash2 } from "lucide-react";
import burger from "../../assets/burger.png";
import { useEffect, useState } from "react";
import { getData, getDate, getTime, postData } from "../Services/Fetchnodeservices";
import Swal from "sweetalert2";




interface DisplayAllDeliveryboyProps {

  refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;

}



export default function DeliveryboyInterface({refresh,setRefresh}:DisplayAllDeliveryboyProps)
{



    const [branchIdList,setBranchIdList]=useState<{ branchid:number, branchname:string }[]>([])
    const [cityList,setCityList]=useState<{ cityid:number, cityname:string }[]>([])
    const [stateList,setStateList]=useState<{ stateid:number, statename:string }[]>([])

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
    const [photograph, setPhotograph] = useState<{ bytes: File | null; fileName: string;}>({bytes: null,fileName: burger});
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


  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) 
    {
      setPhotograph({ bytes: file, fileName: URL.createObjectURL(file)});
    }
  };




  
    const handleClick = async () => {
      const formData = new FormData();
  
            formData.append('branchid',branchId)
            formData.append('deliveryname',deliveryName)
            formData.append('dob',dob)
            formData.append('gender',gender)
            formData.append('mobileno',mobileNo)
            formData.append('emailid',emailId)
            formData.append('address',address)
            formData.append('city',city)
            formData.append('state',state)
            formData.append('aadharno',aadharNo)
            formData.append('status',status)
            formData.append('vehicleno',vehicleNo) 
            if (photograph.bytes) {
              formData.append("photograph", photograph.bytes);
            }
            formData.append('password',password)
            formData.append('createddate',getDate())
            formData.append('createdtime',getTime())
            formData.append('userid','xxxx')
 
        const response = await postData("deliveryboy/submit_deliveryboy", formData);
  
      if (response.status) 
      {
        Swal.fire({ position: "center", icon: "success", title: response.message, showConfirmButton: false, timer: 2000,toast: true });
      } 
      else 
      {
        Swal.fire({ position: "center", icon: "error", title: response.message, showConfirmButton: false, timer: 2000, toast: true });
      }
  
      setRefresh(!refresh)
  
    }
  



    return(
    <div className="w-[100%] h-auto flex justify-center">
      <div className="w-[80%] border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className="w-full rounded-t-[5px] bg-[linear-gradient(90deg,hsla(321,41%,24%,1)_0%,hsla(330,53%,77%,1)_100%)]">
          <div className="flex font-quicksand flex-col px-1 w-[30%] py-2.5">
            <div className="font-bold text-[24px] text-white">FoodieHub</div>
            <div className="font-[700] text-[16px] text-white mt-2">New Food Deliveryboy</div>
          </div>
        </div>
        <div className="flex p-4 w-full items-center justify-between flex-wrap">
          <div className="relative w-1/4 p-2 ">
            <select id="branchid" onChange={(e)=>setBranchId(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBranch()}
            </select>
              <label htmlFor="branchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setDeliveryName(e.target.value)} type="text" id="deliveryname" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="deliveryname" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Deliveryboy Name</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setDob(e.target.value)} type="date" id="dob" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="dob" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500">Date Of Birth</label>
          </div>
          <div className="relative w-1/4 p-2 flex flex-col justify-center border border-gray-600 rounded-md px-3 pt-6 pb-2 bg-white">
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
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setMobileNo(e.target.value)} type="text" id="mobileno" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="mobileno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Mobile No.</label>
          </div>
            <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setEmailId(e.target.value)} type="text" id="emailid" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="emailid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Email Id</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <select id="state" onChange={handleStateChange} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillState()}
            </select>
              <label htmlFor="state" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >State</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <select id="city" onChange={(e)=>setCity(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillCity()}
            </select>
              <label htmlFor="city" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >City</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setAddress(e.target.value)} type="text" id="address" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="address" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Address</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setAadharNo(e.target.value)} type="text" id="aadharno" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="aadharno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Aadhar No</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <select id="status" onChange={(e)=>setStatus(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                <option>Available</option>
                <option>Unavailable</option>
            </select>
              <label htmlFor="status" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Status</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setVehicleNo(e.target.value)} type="text" id="Vehicleno" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="vehicleno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Vehicle No</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setPassword(e.target.value)} type="text" id="password" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="password" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Password</label>
          </div>
          <div className="relative ">
            <img src={photograph.fileName} alt="Photograph Preview" className="w-[40px]" />
          </div>
          <label htmlFor="photograph" className="flex flex-col items-center text-[hsla(321,32%,37%,1)] cursor-pointer">
            <CloudUpload className="h-9 w-9 flex" />
            <span className="text-xs">Upload</span>
            <input type="file" id="photograph" onChange={handleChange} hidden accept="image/*" />
          </label>
          <div className="flex flex-col items-center cursor-pointer text-[hsla(321,32%,37%,1)] " onClick={handleClick}>
            <Save id="saveIcon" className="h-9 w-9 text-[#692c55]" />
            <span className="text-xs">Save</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer  text-[hsla(321,32%,37%,1)] ">
            <Trash2 id="trashIcon" className="h-9 w-9 text-[#692c55]" />
            <span className="text-xs">Clear</span>
          </div>
        </div>
      </div>
    </div>
        
    )
}