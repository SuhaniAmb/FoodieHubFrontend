import { useState } from "react"
import { postData } from "../../Components/Services/Fetchnodeservices"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"



export default function SignIn() {

  // const [userData,setUserData]=useState('')
  const [mobileno,setMobileno]=useState('')
  const [message,setMessage]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleClick=async()=>{
    const response=await postData("users/student_sign_in",{mobileno})
    if(response.status)
    {
      const mn=response?.data?.mobileno
      dispatch({type:'ADD_USER', payload:[String(mn),response?.data]})
      setMessage('')
      navigate("/otp_page")
    }
    else
    {
      setMessage(response.message)
    }
    }

  return (
    <div className='flex justify-center py-20 mx-5' >
      <div className=" bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 " >
        {/* <div className=" md:text-[35px] text-[25px] text-black cursor-pointer w-fit " >×</div> */}
        <div className=" md:text-[20px] text-[15px] mt-5 text-black cursor-pointer w-fit " >HungerBuddy</div>
        <div className=" md:mt-7 mt-5 text-black md:text-[23px] text-[17px] font-bold " >Almost their</div>
        <div className=" text-gray-700 md:text-[18px] text-[15px] " >Simple sign in to place your order</div>
        <div className=" md:mt-12 mt-10 text-gray-800 md:text-[19px] text-[14px] " >Mobile Number</div>
        <div className=" border border-gray-400 hover:border-blue-600 flex p-2 rounded-md hover:border-2 text-black " >+91-
            <input type="text" onChange={(e)=>setMobileno(e.target.value)} onFocus={() => setMessage('')}  className="text-black  w-full border-none outline-none ml-2" />
        </div>
        <div className=" mt-5 text-red-600 " >{message}</div>
        {/* <div className=" md:text-[12px] text-[10px] " > */}
        <div className=" md:text-[12px] text-[10px] md:mt-40 mt-20 " >
        <hr className=" md:pt-16 pt-10 " />
            <span className=" text-gray-600 " >By Signin in, you agree to our </span>
            <span className=" text-blue-600 " >Terms and Conditions of Use </span>
            <span className=" text-gray-600 " >and </span>
            <span className=" text-blue-600 " > Privacy Policy </span>
        </div>
        <div onClick={(handleClick)} className=" my-2 bg-blue-600 rounded-lg  p-2 flex justify-center items-center text-white md:text-[17px] text-[15px] hover:bg-blue-700 active:scale-95 cursor-pointer " >SIGN IN</div>
      </div>
    </div>
  )
}