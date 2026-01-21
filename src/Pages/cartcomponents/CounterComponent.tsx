
export default function CounterComponent() {
  return (
    <div className='flex justify-center xl:px-36 lg:px-20 md:px-8 sm:px-4 px-4' >
    <div className=' bg-[#dbf7e8] w-full lg:py-4 sm:py-3 py-2  rounded-2xl  my-7 ' >
      {/* <div className=' flex gap-2 ' >
        <div>
        <div className=' border border-gray-400 bg-green-500 py-1 pl-3 mx-4 text-white text-[17px] font-bold rounded-full ' >1</div>
        <div>Your Cart</div>
        </div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-3 text-gray-400 text-[17px] font-bold rounded-full ' >2</div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-3 text-gray-400 text-[17px] font-bold rounded-full ' >3</div>
      </div> */}
      <div className=' flex lg:px-3 justify-center md:gap-2 gap-1 ' >
        <div className=' border border-gray-400 bg-green-500 py-1 px-3 text-white text-[17px] font-bold rounded-full ' >1</div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-3 text-gray-400 bg-white text-[17px] font-bold rounded-full ' >2</div>
        <hr className="w-16  border-gray-300 self-center" />
        <div className=' border border-gray-400 py-1 px-3 text-gray-400 bg-white text-[17px] font-bold rounded-full ' >3</div>
      </div>
      <div className=' flex justify-center lg:gap-12 md:gap-12 gap-10 mt-2 ' >
        <div className=' text-black 0 lg:text-[14px] text-[13px] whitespace-nowrap ' >Your cart</div>
        <div className=' text-gray-600 lg:text-[14px] text-[13px]  whitespace-nowrap' >Order Review</div>
        <div className=' text-gray-600 0 lg:text-[14px] text-[13px]  whitespace-nowrap' >Payment</div>

      </div>
    </div></div>
  )
}
