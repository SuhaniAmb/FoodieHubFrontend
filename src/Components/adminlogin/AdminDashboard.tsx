import React from "react";
import dashboard from "../../assets/dashboard.png";
import branch from "../../assets/branch.png";
import batch from "../../assets/batch.png";
import section from "../../assets/section.png";
import student from "../../assets/student.png";
import employee from "../../assets/employee.png";
import delivery from "../../assets/delivery.png";
import logout from "../../assets/check-out.png";
import { useState } from "react";
import Branch from "../Branch/Branch";
import Batch from "../Batch/Batch";
import Section from "../Section/Section";
import Student from "../Students/Student";
import Employees from "../Employees/Employees";
import Deliveryboy from "../Deliveryboy/Deliveryboy";




export default function AdminDashboard() {
    const [activeMenu, setActiveMenu] = useState("Dashboard");
  return (
    <div className=" w-screen h-screen " >
        <div className=" w-full h-[8%] rounded-t-[10px] flex flex-row space-x-[84%] bg-[#852f68] " >
            <div className="h-full text-[25px] text-white flex flex-row items-center pl-5 " >FoodieHub</div>
            <div className="h-[80%] w-[3%] mt-1.5 bg-gray-500 rounded-[50%] flex items-center" >
               <div className=" h-full w-full text-[25px] text-white flex items-center justify-center" >R</div>
            </div>
        </div>
        <div className="flex h-full" > 
        <div className="h-[70%] w-[15%] bg-pink-100 m-2 rounded-[5px] flex flex-col " >
            <div className="w-full h-[10%] flex flex-row items-center " >
                <img src={dashboard} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[20px] text-black " >Dashboard</div>
            </div>

<hr className=" mx-2 border-gray-400 " />
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={branch} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Branch")} >Branch</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={batch} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Batch")} >Batch</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={section} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Section")} >Section</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={student} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Student")} >Student</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={employee} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Employee")} >Employee</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={delivery} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Delivery")} >Delivery</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={logout} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Logout")} >Logout</div>
            </div>


        </div>
        <div className="h-full w-[85%] m-2 bg-white rounded-[5px] p-5 ">
          {activeMenu === "Branch" && <Branch />}
          {activeMenu === "Batch" && <Batch/>}
          {activeMenu === "Section" && <Section/>}
          {activeMenu === "Student" && <Student/>}
          {activeMenu === "Employee" && <Employees/>}
          {activeMenu === "Delivery" && <Deliveryboy/>}
          {activeMenu === "Logout" && <h1>Logging out...</h1>}
        </div>
    </div>
    </div>

  );
}
