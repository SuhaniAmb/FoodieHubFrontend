import { CloudUpload, Save, Trash2 } from "lucide-react";
import burger from "../../assets/burger.png";
import { useEffect, useState } from "react";
import { getData, getDate, getTime, postData } from "../Services/Fetchnodeservices";
import Swal from "sweetalert2";








interface DisplayAllStudentProps {

  refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;

}




export default function StudentInterface({refresh, setRefresh}:DisplayAllStudentProps)
{


    
    const [branchIdList,setBranchIdList]=useState<{ branchid:number,branchname:string }[]>([])
    const [batchIdList,setBatchIdList]=useState<{ batchid:number,batchname:string }[]>([])
    const [sectionIdList,setSectionIdList]=useState<{ sectionid:number,sectionname:string }[]>([])
    const [currentStateList,setCurrentStateList]=useState<{ stateid:number,statename:string }[]>([])
    const [currentCityList,setCurrentCityList]=useState<{ cityid:number,cityname:string }[]>([])
    const [parmanentStateList,setParmanentStateList]=useState<{ stateid:number,statename:string }[]>([])
    const [parmanentCityList,setParmanentCityList]=useState<{ cityid:number,cityname:string }[]>([])




    const [enrollmentNo,setEnrollmentNo]=useState('')
    const [branchId,setBranchId]=useState('')
    const [batchId,setBatchId]=useState('')
    const [sectionId,setSectionId]=useState('')
    const [studentName,setStudentName]=useState('')
    const [dob,setDob]=useState('')
    const [gender,setGender]=useState('')
    const [fatherName,setFatherName]=useState('')
    const [motherName,setMotherName]=useState('')
    const [emailId,setEmailId]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [fatherContactNo,setFatherContactNo]=useState('')
    const [motherContactNo,setMotherContactNo]=useState('')
    const [currentAddress,setCurrentAddress]=useState('')
    const [currentState,setCurrentState]=useState('')
    const [currentCity,setCurrentCity]=useState('')
    const [currentPincode,setCurrentPincode]=useState('')
    const [parmanentAddress,setParmanentAddress]=useState('')
    const [parmanentState,setParmanentState]=useState('')
    const [parmanentCity,setParmanentCity]=useState('')
    const [parmanentPincode,setParmanentPincode]=useState('')
    const [aadharNo,setAadharNo]=useState('')
    const [studentPicture,setStudentPicture]=useState<{ bytes: File | null; fileName: string;}>({bytes: null,fileName: burger});






    const fetchBranch=async()=>{
            const response=await getData('branch/fetch_all_branch')
            setBranchIdList(response.data)
        }
    
        const fetchBatch=async()=>{
            const response=await getData('batch/fetch_all_batch')
            setBatchIdList(response.data)
        }
    

        const fetchSection=async()=>{
            const response=await getData('section/fetch_all_section')
            setSectionIdList(response.data)
        }
        

        const fetchCurrentState=async()=>{
            const response=await getData('statecity/fetch_states')
            setCurrentStateList(response.data)
        }


        const fetchParmanentState=async()=>{
            const response=await getData('statecity/fetch_states')
            setParmanentStateList(response.data)
        }

        const fetchCurrentCity=async(sid:number)=>{
            const response=await postData('statecity/fetch_cities',{stateid:sid})
            setCurrentCityList(response.data)
        }



        const fetchParmanentCity=async(sid:number)=>{
            const response=await postData('statecity/fetch_cities',{stateid:sid})
            setParmanentCityList(response.data)
        }
    
    
        useEffect(function(){
            fetchBranch()
            fetchBatch()
            fetchSection()
            fetchCurrentState()
            fetchParmanentState()
        },[])


    
        const fillBranch=()=>{
            return branchIdList.map((item)=>{
                    return( <option value={item.branchid}> {item.branchname} </option> )
            })
        }
    
    
        const fillBatch=()=>{
            return batchIdList.map((item)=>{
                    return( <option value={item.batchid}> {item.batchname} </option> )
            })
        }
    

        const fillSection=()=>{
            return sectionIdList.map((item)=>{
                    return( <option value={item.sectionid}> {item.sectionname} </option> )
            })
        }

        const fillCurrentState=()=>{
            return currentStateList.map((item)=>{
                    return( <option value={item.stateid}> {item.statename} </option> )
            })
        }
        


         const fillParmanentState=()=>{
            return parmanentStateList.map((item)=>{
                    return( <option value={item.stateid}> {item.statename} </option> )
            })
        }

        
        const fillCurrentCity=()=>{
            return currentCityList.map((item)=>{
                    return( <option value={item.cityid}> {item.cityname} </option> )
            })
        }


        const fillParmanentCity=()=>{
            return parmanentCityList.map((item)=>{
                    return( <option value={item.cityid}> {item.cityname} </option> )
            })
        }


        

        
      const handleCurrentStateChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        const stateId = Number(e.target.value);
        setCurrentState(stateId.toString())
        fetchCurrentCity(stateId)
      }



      const handleParmanentStateChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        const cityId = Number(e.target.value);
        setParmanentState(cityId.toString())
        fetchParmanentCity(cityId)
      }
    

          
          
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) 
    {
      setStudentPicture({ bytes: file, fileName: URL.createObjectURL(file)});
    }
  };






        const handleClick = async () => {
            const formData = new FormData();
        
                formData.append('enrollmentno',enrollmentNo)
                formData.append('branchid',branchId)
                formData.append('batchid',batchId)
                formData.append('sectionid',sectionId)
                formData.append('studentname',studentName)
                formData.append('dob',dob);
                formData.append('gender',gender)
                formData.append('fathername',fatherName)
                formData.append('mothername',motherName)
                formData.append('emailid',emailId)
                formData.append('mobileno',mobileNo)
                formData.append('fathercontactno',fatherContactNo)
                formData.append('mothercontactno',motherContactNo)
                formData.append('current_address',currentAddress)
                formData.append('current_state',currentState)
                formData.append('current_city',currentCity)
                formData.append('current_pincode',currentPincode)
                formData.append('parmanent_address',parmanentAddress)
                formData.append('parmanent_state',parmanentState)
                formData.append('parmanent_city',parmanentCity)
                formData.append('parmanent_pincode',parmanentPincode)
                formData.append('aadharno',aadharNo)
                if (studentPicture.bytes) {
                    formData.append("student_picture", studentPicture.bytes);
                }
            
                formData.append('createddate',getDate())
                formData.append('createdtime',getTime())
                formData.append('userid','xxxxx')

        
            const response = await postData("students/submit_student", formData);
        
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
            <div className="font-bold text-[24px] text-white">HungerBuddy</div>
            <div className="font-[700] text-[16px] text-white mt-2">New Food Student</div>
          </div>
        </div>
        <div className="flex p-2 w-full items-center justify-between flex-wrap">
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setEnrollmentNo(e.target.value)} type="text" id="enrollmentno" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="enrollmentno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Enrollment Number</label>
          </div>            
          <div className="relative w-1/4 p-2 ">
            <select id="branchid" onChange={(e)=>setBranchId(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBranch()}
            </select>
              <label htmlFor="branchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <select id="batchid" onChange={(e)=>setBatchId(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBatch()}
            </select>
              <label htmlFor="batchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Batch</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <select id="sectionid" onChange={(e)=>setSectionId(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillSection()}
            </select>
              <label htmlFor="sectionid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Section</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setStudentName(e.target.value)} type="text" id="studentname" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="studentname" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Student Name</label>
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
            <input onChange={(e) => setFatherName(e.target.value)} type="text" id="fathername" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="fathername" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Father Name</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setMotherName(e.target.value)} type="text" id="mothername" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="mothername" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Mother Name</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setEmailId(e.target.value)} type="text" id="emailid" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="emailid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Email Id</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setMobileNo(e.target.value)} type="text" id="mobileno" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="mobileno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Mobile No.</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setFatherContactNo(e.target.value)} type="text" id="fathercontactno" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="fathercontactno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Father's Mobile No.</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setMotherContactNo(e.target.value)} type="text" id="mothercontactno" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="mothercontactno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Mother's Mobile No</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setCurrentAddress(e.target.value)} type="text" id="currentaddress" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="currentaddress" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Current Address</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <select id="currentstate" onChange={(handleCurrentStateChange)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillCurrentState()}
            </select>
              <label htmlFor="batchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Current State</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <select id="currentcity" onChange={(e)=>setCurrentCity(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillCurrentCity()}
            </select>
              <label htmlFor="currentcity" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Current City</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setCurrentPincode(e.target.value)} type="text" id="currentpincode" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="currentpincode" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Current Pincode</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setParmanentAddress(e.target.value)} type="text" id="parmanentaddress" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="parmanentaddress" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Permanent Address</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <select id="parmanentstate" onChange={handleParmanentStateChange} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillParmanentState()}
            </select>
              <label htmlFor="parmanentstate" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Parmanent State</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <select id="parmanentcity" onChange={(e)=>setParmanentCity(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillParmanentCity()}
            </select>
              <label htmlFor="parmanentcity" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Parmanent City</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setParmanentPincode(e.target.value)} type="text" id="parmanentpincode" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="parmanentpincode" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Parmanent Pincode</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <input onChange={(e) => setAadharNo(e.target.value)} type="text" id="aadharno" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="aadharno" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Aadhar No</label>
          </div>
          <div className="relative w-1/4 p-2 ">
            <img src={studentPicture.fileName} alt="Student Icon Preview" className="w-[40px]" />
          </div>
          <label htmlFor="studentpicture"  className="flex flex-col w-1/4 items-center text-[hsla(321,32%,37%,1)] cursor-pointer">
            <CloudUpload className="h-9 w-9 flex" />
            <span className="text-xs">Upload</span>
            <input type="file" id="studentpicture" onChange={handleChange} hidden accept="image/*" />
          </label>
          <div className="flex flex-col w-1/4 items-center cursor-pointer text-[hsla(321,32%,37%,1)] " onClick={handleClick}>
            <Save id="saveIcon" className="h-9 w-9 text-[#692c55]" />
            <span className="text-xs">Save</span>
          </div>
          <div className="flex flex-col w-1/4 items-center cursor-pointer  text-[hsla(321,32%,37%,1)] ">
            <Trash2 id="trashIcon" className="h-9 w-9 text-[#692c55]" />
            <span className="text-xs">Clear</span>
          </div>
        </div>
      </div>
    </div>

    )
}