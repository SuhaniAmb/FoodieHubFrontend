import { useState } from "react"
import pencil from "../../assets/pencil.png"
import AddressDrawer from "./AddressDrawer"



interface Address {
  studentname: string
  current_address:string
  current_city:string
  current_state:string
  current_pincode:string
  mobileno: string
  [key: string]: unknown
}

interface AddressProps {
  address:Address
}

export default function AddressComponent({address}:AddressProps) {

  const [open, setOpen]=useState(false)

  return (
    <div className=" w-full bg-white mt-12 items-center justify-center ">
        <div className=' whitespace-nowrap text-[black] md:text-[18px] text-[15px] font-bold ' >Delivery Address</div>
      <div className=" w-full mt-5 bg-white md:p-4 p-3 rounded-lg border border-gray-200 shadow-sm">
        <div className=" flex justify-between " >
            <div className=' text-black md:text-[18px] text-[17px] ' >{address.studentname}</div>
            <div className=" flex items-center bg-gray-100 rounded-full px-2 py-2 cursor-pointer hover:scale-105 active:scale-90 "onClick={() => setOpen(true)} ><img src={pencil} width={16} /></div>
        </div>
        <AddressDrawer open={open} onClose={() => setOpen(false)} />
            <hr className=" md:mt-4 mt-2 border-gray-300 " />
            <div className=" mt-4 text-gray-700 whitespace-nowrap md:text-[17px] text-[15px] " >{address.current_address}</div>
            <div className=" text-gray-700 whitespace-nowrap md:text-[17px] text-[15px]  " >{address.current_city}</div>
            <div className=" text-gray-700 whitespace-nowrap md:text-[17px] text-[15px]  " >{address.current_state}</div>
            <div className=" text-gray-700 whitespace-nowrap md:text-[17px] text-[15px]   " >{address.current_pincode}</div>
            <div className=" text-gray-700 whitespace-nowrap md:text-[17px] text-[15px]   " >Phone:{address.mobileno}</div>
      </div>
    </div>
    
  )
}
