import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux";
import type { RootState } from "../../Components/Storage/RootReducer";
import { generateOtp } from "../../Components/Services/Fetchnodeservices";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";


export default function Otp() {


    const [gOtp, setGotp]=useState('')
    const [otp, setOtp]=useState(["","","","","",""])
    const ref=useRef<(HTMLInputElement | null)[]>([]);
    // const location=useLocation()
    const [param]=useSearchParams()
    const from=param.get('from')



    const user=useSelector((state:RootState)=>state.user)
    console.log("User state:", user);

    // alert(JSON.stringify(user))
    const mobileno= user?Object.keys(user)[0]: " "
    const navigate=useNavigate()
  

    function checkOtp()
    {
      if(gOtp==otp.join(""))
      {
        // window.location.href='/homepage'
        if(from=="MP")
        {
          navigate('/order_review')
        }
        else if(from=="HP")
       {
         navigate('/homepage')
       }
      }
      else
      {
        alert('NOT CORRECT')
      }
    }



    useEffect(function(){
      const otp=generateOtp().toString()
      setGotp(otp)
      alert(otp)
    },[])



    const handleChange=(e: React.ChangeEvent<HTMLInputElement>, index:number)=>{
       const value = e.target.value;
       if (/^\d?$/.test(value)) 
      { 
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (index < 5) 
        {
          ref.current[index + 1]?.focus()
        }
      } 
      else 
      {
        e.target.value = ""
      }
    }


   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") 
    {
      e.preventDefault(); 
      // prevent browser default
      const newOtp = [...otp];
      if (otp[index]) 
      {
        // 1️⃣ Delete current box value
        newOtp[index] = "";
        setOtp(newOtp);
      } 
      else if (index > 0) 
      {
        // 2️⃣ Current empty → previous box focus aur delete
        newOtp[index - 1] = "";
        setOtp(newOtp);
        setTimeout(() => {ref.current[index - 1]?.focus();}, 0);
      }
  }
};


  return (
    <div className='flex justify-center py-20 mx-5 ' >
      <div className=" bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 " >
        {/* <div className=" md:text-[35px] text-[25px] text-black cursor-pointer w-fit " >×</div> */}
        <div className=" md:text-[20px] text-[15px] mt-5 text-black cursor-pointer w-fit " >FoodieHub</div>
        <div className=" md:mt-7 mt-5 text-black md:text-[25px] text-[17px] font-bold " >Verify OTP</div>
        <div className=" text-gray-700 md:text-[16px] text-[13px] " >Enter the OTP send to {mobileno ? `+91-${mobileno}` : "loading..."}</div>
        <div className=" text-blue-700 md:text-[17px] text-[13px] font-bold cursor-pointer " >Update Number</div>
        {/* <div className=" md:mt-10 mt-8 text-black md:text-[16px] text-[14px] " >Enter OTP</div> */}
        <div className=" flex gap-2 md:mt-10 mt-5" >
            {otp.map((_,index)=>(
                <div key={index} className="flex items-center " >
                <input ref={(el) => {ref.current[index] = el}} onChange={(e)=>handleChange(e, index)} onKeyDown={(e)=>handleKeyDown(e,index)} value={otp[index]} type="text" pattern="[0-9]*" maxLength={1} className=" md:w-12 w-6 md:h-12 h-6 border focus:border-2 focus:border-blue-600 rounded-md p-3 border-gray-400 text-black flex justify-center items-center outline-none font-bold text-[19px] " />
            {index < 5 &&(
            <div className=" flex justify-center items-center text-gray-700 text-[30px] md:ml-2 ml-1 " >-</div>
            )}
            </div>
            ))}

        </div>
        <div className="text-gray-800 md:text-[16px] text-[10px] mt-2 " >Entered Value: {otp.join("")}</div>
        <div className=" flex justify-end text-blue-700 md:text-[16px] text-[10px] font-bold md:mt-3 mt-2 cursor-pointer " >Resend OTP</div>
        <div className=" my-2 bg-blue-600 rounded-lg md:mt-44 mt-40 p-2 flex justify-center items-center text-white md:text-[17px] text-[15px] hover:bg-blue-700 active:scale-95 cursor-pointer " onClick={checkOtp} >Verify OTP</div>
      </div>
    </div>      
  )
}
