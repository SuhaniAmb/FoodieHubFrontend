import right from "../../assets/forward.png"
import apply from "../../assets/apply.png"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../Components/Storage/RootReducer"
import { useLocation } from "react-router-dom"


export default function CouponComponent() {

  const navigate=useNavigate()
  const user=useSelector((state:RootState)=>state.user)
  const location=useLocation()

  const MakePayment=()=>{
    alert(user===undefined)
    // navigate("/make_payment")

  }

  return (
    <div className='  flex-col justify-center xl:px-36 lg:px-20 md:px-8 sm:px-4 px-4 mt-7 ' >
      <div className=' w-full md:p-4 p-3 flex border border-gray-300 rounded-2xl cursor-pointer ' >
        <div><img src={apply} width={25} /></div>
        <div className=' text-black md:text-[17px] text-[15px] font-bold ml-5' >Apply Coupon</div>        
        <div className="w-7 flex items-center ml-auto " ><img src={right} width={100} /></div>        
      </div> 
      {location.pathname==="/cart"?<>
      <div onClick={()=>navigate("/order_review")} className=" mt-7 bg-blue-600 hover:bg-blue-700 p-3 flex justify-center text-white rounded-full md:text-[17px] text-[15px] transition-transform ease-in-out active:shrink-0 font-bold cursor-pointer active:scale-95 " >Place Order</div>
      </>:<>
      <div onClick={MakePayment} className=" mt-7 bg-blue-600 hover:bg-blue-700 p-3 flex justify-center text-white rounded-full md:text-[17px] text-[15px] transition-transform ease-in-out active:shrink-0 font-bold cursor-pointer active:scale-95 " >Make Payment</div>
      </>}
    </div>
  )
}
