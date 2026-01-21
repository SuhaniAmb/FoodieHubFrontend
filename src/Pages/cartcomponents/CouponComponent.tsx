import right from "../../assets/forward.png"


export default function CouponComponent() {
  return (
    <div className='  flex justify-center xl:px-36 lg:px-20 md:px-8 sm:px-4 px-4 mt-7 ' >
      <div className=' w-full md:p-4 p-3 flex justify-between border border-gray-300 rounded-2xl cursor-pointer ' >
        <div className=' text-black md:text-[17px] text-[15px] font-bold ' >Apply Coupon</div>        
        <div className="w-7 flex items-center " ><img src={right} width={100} /></div>        
      </div>    
    </div>    

  )
}
