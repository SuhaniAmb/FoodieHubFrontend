import React, { useState, useRef } from "react";
import pencil from "../../assets/pencil.png"
import left from "../../assets/previous.png"


interface Address {
  studentname: string;
  current_address: string;
  current_city: string;
  current_state: string;
  current_pincode: string;
  mobileno: string;
  [key: string]: unknown;
}

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedIndex:number;
  onSelect:(index:number)=> void
  onSave: (newAddress: Address,editMode:boolean, editIndex?:number) => void;
  onDelete: (index: number) => void;
}

export default function AddressDrawer({ open, onClose, onSave, addresses, selectedIndex, onSelect, onDelete }:DrawerProps) {

  const[showForm,setShowForm]=useState(false)
  const[editMode,setEditMode]=useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const[formData,setFormData]=useState<Address>({studentname:"",current_address:"",current_city:"",current_state:"",current_pincode:"",mobileno:""})

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
    
  if (!open) return 

  
  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* drawer */}
      <div ref={drawerRef} className="fixed right-0 top-0 h-full lg:w-80 md:w-72 w-40 bg-white md:p-4 py-2 px-1 overflow-y-auto scrollbar-hide">
        <div className="flex" >
            <div className=" whitespace-nowrap text-[black] lg:text-[20px] md:text-[17px] text-[14px] font-bold " >Select Address</div>
            <div className=" cursor-pointer w-fit ml-auto md:mb-10 mb-5 border-gray-100 hover:border rounded-full p-1 " onClick={onClose}>❌</div>
        </div>
        <div className=' text-gray-500 lg:text-[18px] md:text-[15px] text-[12px] font-semibold ' >Saved Address</div>
       {showForm && (
  <div className="mt-5 w-full bg-white border border-gray-200 rounded-lg shadow-sm p-3 md:p-4">

    {/* FORM TITLE */}
    <div className="flex gap-5" >
    <div><img src={left} className=" w-6 h-6 bg-gray-200 p-1 rounded-full cursor-pointer " onClick={() => setShowForm(false)} /></div>
    <div className="text-black font-bold text-[16px] mb-4">
     {editMode ? "Edit Address" : "Add New Address"}
    </div>
    </div>

    {/* INPUTS */}
    <div className="space-y-2">

      <input
        type="text"
        name="studentname"
        onChange={handleChange}
        value={formData.studentname}
        placeholder="Full Name"
        className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-400"
      />

      <input
        type="text"
        name="current_address"
        value={formData.current_address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-400"
      />

      <input
        type="text"
        name="current_city"
        value={formData.current_city}
        onChange={handleChange}
        placeholder="City"
        className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-400"
      />

      <input
        type="text"
        name="current_state"
        value={formData.current_state}
        onChange={handleChange}
        placeholder="State"
        className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-400"
      />

      <input
        type="text"
        name="current_pincode"
        value={formData.current_pincode}
        onChange={handleChange}
        placeholder="Pincode"
        className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-400"
      />

      <input
        type="text"
        name="mobileno"
        value={formData.mobileno}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-400"
      />

    </div>

    {/* BUTTONS */}
    <div className="flex gap-2 mt-5">

    <button
  type="button"
  onClick={() => {
    if (addresses.length === 1) {
      alert("At least one address is required");
      return;
    }

    if (editIndex !== null) {
      onDelete(editIndex);
    }

    setShowForm(false);
    setEditMode(false);
    setEditIndex(null);
  }}
  className="flex-1 border border-gray-300 text-gray-600 rounded-md py-2 text-sm hover:bg-gray-100"
>
  Delete
</button>
      <button
        type="button"
        onClick={() => {
  const isFormComplete =
    formData.studentname.trim() !== "" &&
    formData.current_address.trim() !== "" &&
    formData.current_city.trim() !== "" &&
    formData.current_state.trim() !== "" &&
    formData.current_pincode.trim() !== "" &&
    formData.mobileno.trim() !== "";

  if (!isFormComplete) {
    alert("Please fill all address fields");
    return;
  }

  onSave(formData, editMode, editMode? editIndex ?? undefined:undefined);
  setShowForm(false);
}}
        className="flex-1 bg-blue-500 text-white rounded-md py-2 text-sm hover:bg-blue-600"
      >
       {editMode ? "Update" : "Save"}
      </button>

    </div>

  </div>
)}

        
         {/*                       SELECT ADDRESS                                */}
   {/* SAVED ADDRESSES */}
<div className="w-full bg-white mt-3">

  {addresses.map((item, index) => (
    <div
      key={index}
      onClick={() => onSelect(index)}
      className={`w-full mt-5 bg-white md:p-4 py-3 px-1 rounded-lg border shadow-sm cursor-pointer
        ${
          selectedIndex === index
            ? "border-blue-400"
            : "border-gray-200"
        }`}
    >

      <div className="flex justify-between">

        <div className="text-black md:text-[18px] text-[14px]">
          {item.studentname}
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setFormData(item);
            setEditMode(true);
            setEditIndex(index)
            setShowForm(true)
          }}
          className="flex items-center bg-gray-50 rounded-full md:px-2 px-1 md:py-2 py-1 cursor-pointer"
        >
          <img
            src={pencil}
            className="md:w-[12px] w-[10px]"
          />
        </div>

      </div>

      <hr className="md:mt-4 mt-2 border-gray-300" />

      <div className="mt-4 text-gray-700 text-[12px] md:text-[15px]">
        {item.current_address}
      </div>

      <div className="text-gray-700 text-[12px] md:text-[15px]">
        {item.current_city}
      </div>

      <div className="text-gray-700 text-[12px] md:text-[15px]">
        {item.current_state}
      </div>

      <div className="text-gray-700 text-[12px] md:text-[15px]">
        {item.current_pincode}
      </div>

      <div className="text-gray-700 text-[12px] md:text-[15px]">
        {item.mobileno}
      </div>

    </div>
  ))}

</div>
         {/*                       SELECT ADDRESS END                               */}

         <div onClick={()=> {setFormData({studentname:"",current_address:"",current_city:"",current_state:"",current_pincode:"",mobileno:""}), setEditMode(false), setShowForm(true), setEditIndex(null); setTimeout(() => {drawerRef.current?.scrollTo({top: 0,behavior: "smooth"})}, 0)}} className=" flex justify-center items-center mt-5 w-full bg-white border shadow-md border-gray-100 hover:border-blue-400 rounded-lg cursor-pointer
          " >
            <div className=" text-blue-400 md:mr-5 mr-3 md:text-[30px] text-[20px] " >+</div>
            <div className=" text-blue-400 md:text-[18px] text-[12px] whitespace-nowrap " >Add New Address</div>
         </div>



      </div>
    </>
  );
}
