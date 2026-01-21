import { postData } from "../Services/Fetchnodeservices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function BranchLogin() {
  const [emailId, setEmailId] = useState('suhaniamb25@gmail.com');
  const [password, setPassword] = useState('@14985$2');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const body = { emailid:emailId, password:password };
    const res = await postData("branch/chk_branch_login", body);
    if (res.status) 
    { // alert(res.token)
      localStorage.setItem("Token",res.token)
      localStorage.setItem("Branch",JSON.stringify(res.data))
      navigate("/branchdashboard");
      //localStorage.setItem("ADMIN", JSON.stringify(res.data));
    } else {
      Swal.fire({
        icon: "error",
        title: res.message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
    }
  };
  return (
    <div className="w-screen flex justify-center items-start">
      <div className="w-[400px] h-auto border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className="w-[400px] rounded-t-[5px]" style={{background:'linear-gradient(90deg, hsla(321, 41%, 24%, 1)0%, hsla(330, 53%, 77%, 1)100%)'}} >
          <div className="flex font-quicksand flex-col w-[30%] p-2.5" >
            <div className="font-bold text-[30px] text-white" >HungerBuddy</div>
          <div className="font-[800]  text-[24px] text-white" > Sign in</div>
            </div>
        </div>
        <div className="px-2 py-2 pt-4 w-full space-y-2 pb-5 " >
            <div className="relative w-full">
                <input onChange={(e)=>setEmailId(e.target.value)} value={emailId} type="text" id="emailid" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="emailid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >EmailId/MobileNo </label>
            </div>
            <div className="relative w-full py-2">
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" id="password" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"/>
               <label htmlFor="password" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Password</label>
            </div>
            <div className="flex gap-4 w-full mt-4">
                <button id="signin" onClick={handleSubmit} className="w-full bg-[#692c55] text-white font-semibold py-2 rounded-md hover:bg-pink-900 transition duration-200">Sign in</button>
            </div>



        </div>
      </div>
    </div>

  )
}
