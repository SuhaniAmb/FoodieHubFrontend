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
  const [addresses,setAddresses]=useState<Address[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className=" w-full bg-white mt-12 items-center justify-center ">
        <div className=' whitespace-nowrap text-[black] md:text-[18px] text-[15px] font-bold ' >Delivery Address</div>
        {addresses.length > 0 && (
  <div className="w-full mt-5 bg-white md:p-4 p-3 rounded-lg border border-gray-200 shadow-sm">
    <div className="flex justify-between">
      <div className="text-black md:text-[18px] text-[17px]">
        {addresses[selectedIndex].studentname}
      </div>

      <div
        className="flex items-center bg-gray-100 rounded-full px-2 py-2 cursor-pointer hover:scale-105 active:scale-90"
        onClick={() => setOpen(true)}
      >
        <img src={pencil} width={16} />
      </div>
    </div>

    <hr className="md:mt-4 mt-2 border-gray-300" />

    <div className="mt-4 text-gray-700">
      {addresses[selectedIndex].current_address}
    </div>

    <div className="text-gray-700">
      {addresses[selectedIndex].current_city}
    </div>

    <div className="text-gray-700">
      {addresses[selectedIndex].current_state}
    </div>

    <div className="text-gray-700">
      {addresses[selectedIndex].current_pincode}
    </div>

    <div className="text-gray-700">
      Phone: {addresses[selectedIndex].mobileno}
    </div>
  </div>
)}
           <AddressDrawer
  open={open}
  onClose={() => setOpen(false)}
  addresses={addresses}
  selectedIndex={selectedIndex}
  onSelect={(index) => {
    setSelectedIndex(index)
    setOpen(false)
  }}
  onDelete={(index) => {
  setAddresses(prev => {
    const newAddresses = prev.filter((_, i) => i !== index);

    // Agar deleted address selected tha
    if (newAddresses.length === 0) {
      setSelectedIndex(0);
    } else if (index < selectedIndex) {
      setSelectedIndex(prevIndex => prevIndex - 1);
    } else if (index === selectedIndex && selectedIndex >= newAddresses.length) {
      setSelectedIndex(newAddresses.length - 1);
    }

    return newAddresses;
  });
}}
  onSave={(newAddress, editMode, editIndex) => {

    if (editMode && editIndex !== undefined) {
      setAddresses(prev =>
        prev.map((item, index) =>
          index === editIndex ? newAddress : item
        )
      )
    } else {
      setAddresses(prev => [...prev, newAddress])
    }

    setOpen(false)
  }}
/>
{addresses.length === 0 && (
  <div
    onClick={() => setOpen(true)}
    className="flex justify-center items-center mt-5  bg-white border shadow-md border-gray-100 mr-5 hover:border-blue-400 rounded-lg cursor-pointer"
  >
    <div className="text-blue-400 md:mr-5 mr-3 md:text-[30px] text-[20px]">
      +
    </div>

    <div className="text-blue-400 md:text-[18px] text-[12px] whitespace-nowrap">
      Add New Address
    </div>
  </div>
)}
    </div>
    
  )
}
