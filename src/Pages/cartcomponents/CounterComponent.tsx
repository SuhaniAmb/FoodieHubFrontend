import { useLocation } from "react-router-dom"
import check from "../../assets/check.png"



export default function CounterComponent() {


  const location=useLocation()

  return (
    
    <div className='flex justify-center xl:px-36 lg:px-20 md:px-8 sm:px-4 px-4' >
    <div className=' bg-[#dbf7e8] w-full lg:py-4 sm:py-3 py-2  rounded-2xl  my-7 ' >

                     {/*              CART               */}
      {location.pathname==="/cart" &&(<>
      <div className=' flex lg:px-3 justify-center md:gap-2 gap-1 ' >
        <div className=' border border-gray-400 bg-green-500 py-1 px-3 text-white text-[17px] font-bold rounded-full ' >1</div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-3 text-gray-400 bg-white text-[17px] font-bold rounded-full ' >2</div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-3 text-gray-400 bg-white text-[17px] font-bold rounded-full ' >3</div>
      </div>
      <div className=' flex justify-center lg:gap-12 md:gap-12 gap-10 mt-2 ' >
        <div className=' text-black 0 lg:text-[14px] text-[13px] whitespace-nowrap font-bold ' >Your cart</div>
        <div className=' text-gray-600 lg:text-[14px] text-[13px]  whitespace-nowrap' >Order Review</div>
        <div className=' text-gray-600 0 lg:text-[14px] text-[13px]  whitespace-nowrap' >Payment</div>
      </div>
      </>)}
                     {/*             MAKE PAYMENT            */}
      {location.pathname==="/order_review" &&(<>
      <div className=' flex lg:px-3 justify-center md:gap-2 gap-1 ' >
        <div className=' border border-gray-400 py-1 px-1 bg-green-500 text-gray-400 text-[17px] font-bold rounded-full  ' ><img src={check} width={100} className="w-6" /></div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-3 bg-green-500 text-white text-[17px] font-bold rounded-full ' >2</div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-3 text-gray-400 bg-white text-[17px] font-bold rounded-full ' >3</div>
      </div>
      <div className=' flex justify-center lg:gap-12 md:gap-12 gap-10 mt-2 ' >
        <div className=' text-gray-600 0 lg:text-[14px] text-[13px] whitespace-nowrap ' >Your cart</div>
        <div className=' text-black lg:text-[14px] text-[13px]  whitespace-nowrap font-bold' >Order Review</div>
        <div className=' text-gray-600 0 lg:text-[14px] text-[13px]  whitespace-nowrap' >Payment</div>
      </div>

      </>)}
                                {/* PAYMENT LAST          
      {location.pathname==="/make_payment" &&(<>
      <div className=' flex lg:px-3 justify-center md:gap-2 gap-1 ' >
        <div className=' border border-gray-400 py-1 px-1 bg-green-500 text-gray-400 text-[17px] font-bold rounded-full  ' ><img src={check} width={100} className="w-6" /></div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-1 bg-green-500 text-gray-400 text-[17px] font-bold rounded-full  ' ><img src={check} width={100} className="w-6" /></div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-3 text-white bg-green-500 text-[17px] font-bold rounded-full ' >3</div>
      </div>
      <div className=' flex justify-center lg:gap-12 md:gap-12 gap-10 mt-2 ' >
        <div className=' text-gray-600 0 lg:text-[14px] text-[13px] whitespace-nowrap ' >Your cart</div>
        <div className=' text-gray-600 lg:text-[14px] text-[13px]  whitespace-nowrap' >Order Review</div>
        <div className=' text-black lg:text-[14px] text-[13px]  whitespace-nowrap font-bold' >Payment</div>
      </div>
</>)} */}


    </div>
    </div>
  )
}
