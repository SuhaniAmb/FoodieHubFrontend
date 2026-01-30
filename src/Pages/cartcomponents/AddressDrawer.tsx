import pencil from "../../assets/pencil.png"

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}


export default function AddressDrawer({ open, onClose }:DrawerProps) {
    
  if (!open) return 

  
  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* drawer */}
      <div className="fixed right-0 top-0 h-full lg:w-80 md:w-72 w-40 bg-white md:p-4 py-2 px-1">
        <div className="flex" >
            <div className=" whitespace-nowrap text-[black] lg:text-[20px] md:text-[17px] text-[14px] font-bold " >Select Address</div>
            <div className=" cursor-pointer w-fit ml-auto md:mb-10 mb-5 border-gray-100 hover:border rounded-full p-1 " onClick={onClose}>❌</div>
        </div>
        <div className=' text-gray-500 lg:text-[18px] md:text-[15px] text-[12px] font-semibold ' >Saved Address</div>

        
         {/*                       SELECT ADDRESS                                */}
    <div className=" w-full bg-white mt-3 items-center justify-center ">
      <div className=" w-full mt-5 bg-white md:p-4 py-3 px-1 rounded-lg border border-gray-200 hover:border-blue-400 shadow-sm">
        <div className=" flex justify-between " >
            <div className=' text-black md:text-[18px] text-[14px] ' >Suhani Amb</div>
            <div className=" flex items-center bg-gray-50 rounded-full md:px-2 px-1 md:py-2 py-1 cursor-pointer " ><img src={pencil} className="md:w-[12px] w-[10px]" /></div>
        </div>
            <hr className=" md:mt-4 mt-2 border-gray-300 " />
            <div className=" mt-4 text-gray-700 lg:text-[16px] md:text-[15px] text-[12px] " >Shree Nagar Colony, Nadi Paar Taal, Morar</div>
            <div className=" text-gray-700 whitespace-nowrap lg:text-[16px] md:text-[15px] text-[12px] " >Gwalior</div>
            <div className=" text-gray-700 whitespace-nowrap lg:text-[16px] md:text-[15px] text-[12px] " >Madhya Pradesh</div>
            <div className=" text-gray-700 whitespace-nowrap lg:text-[16px] md:text-[15px] text-[12px] " >474011</div>
            <div className=" text-gray-700 whitespace-nowrap lg:text-[16px] md:text-[15px] text-[12px] " >Phone: +91-7449083754</div>
      </div>
    </div>

         {/*                       SELECT ADDRESS END                               */}

         <div className=" flex justify-center items-center mt-5 w-full bg-white border shadow-md border-gray-100 hover:border-blue-400 rounded-lg cursor-pointer
          " >
            <div className=" text-blue-400 md:mr-5 mr-3 md:text-[30px] text-[20px] " >+</div>
            <div className=" text-blue-400 md:text-[18px] text-[12px] whitespace-nowrap " >Add New Address</div>
         </div>



      </div>
    </>
  );
}
