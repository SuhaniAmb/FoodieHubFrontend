import dashboard from "../../assets/dashboard.png";
import logout from "../../assets/check-out.png";
import foodcategory from "../../assets/cutlery.png"
import fooditem from "../../assets/masala-dosa.png"
import order from "../../assets/online-order.png"
import { useState } from "react";
import Fooditems from "../Fooditems/Fooditems";
import Category from "../Category/Category";



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
                <img src={foodcategory} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Category")} >Food Category</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={fooditem} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Fooditems")} >Food Items</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={fooditem} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("More Pictures")} >More Pictures</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={order} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Order")} >Orders</div>
            </div>
            <div className="w-full h-[10%] flex flex-row items-center hover:bg-pink-200 cursor-pointer " >
                <img src={logout} className="w-7 ml-5" />
                <div className="w-full ml-5 text-[17px] text-black " onClick={()=>setActiveMenu("Logout")} >Logout</div>
            </div>


        </div>
        <div className="h-full w-[85%] m-2 bg-white rounded-[5px] p-5 ">
          {activeMenu === "Category" && <Category />}
          {activeMenu === "Fooditems" && <Fooditems/>}
          {activeMenu === "More Pictures" && <h1>More Pictures</h1>}
          {activeMenu === "Order" && <h1>Order</h1>}
          {activeMenu === "Logout" && <h1>Logging out...</h1>}
        </div>
    </div>
    </div>

  );
}
