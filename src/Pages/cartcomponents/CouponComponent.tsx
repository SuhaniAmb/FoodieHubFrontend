import right from "../../assets/forward.png"
import apply from "../../assets/apply.png"
import { useNavigate } from "react-router-dom"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../Components/Storage/RootReducer"
import { useLocation } from "react-router-dom"
import { useRazorpay } from "react-razorpay"
import { postData } from "../../Components/Services/Fetchnodeservices"
import { useDispatch } from "react-redux"


interface UserData {
  studentname: string
  emailid: string
  mobileno: string
  enrollmentno:string
}


interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}



type Items = {
  fooditemid:number
  picture: string
  fooditemname: string
  fullprice: number
  halfprice: number
  offerprice: number
  rating: string
  fooditemtype: string
  qty:number
}

type ItemsProps = {
  data:Items[]

}





export default function CouponComponent({data}:ItemsProps) {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  // const user=useSelector((state:RootState)=>state.user)
  const userS=localStorage.getItem('USER')
  const user = userS ? JSON.parse(userS) : null
  const { Razorpay } = useRazorpay();
  
  let userData: UserData | "Not Login"
  if(user==null)
  {
      userData="Not Login"
  }
  else
  {
    userData=Object.values(user)[0] as UserData
  }


  const location=useLocation()

    

const totalAmount = data.reduce((sum, item) => {
  return item.offerprice>0? sum + item.offerprice*item.qty : sum + item.fullprice*item.qty
}, 0)




// const total = data.reduce((sum, item) => {
//   return sum + item.fullprice*item.qty
// }, 0)



// const discount = data.reduce((sum, item) => {
//   return item.offerprice>0?sum +(item.fullprice-item.offerprice)*item.qty:sum
// }, 0)






    const options= {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: totalAmount*100, 
      currency: "INR" as const,
      name: "FoodieHub",
      description: "Test Transaction",
      order_id: "", // Generate order_id on server
      handler: async (response:RazorpayResponse) => {
        console.log(response);
        if (userData === "Not Login") return;
          await postData("users/submit_order", { paymentid:response.razorpay_payment_id, orderdate:new Date(), delivery_status:"Not Deliver", payment_type:"None"}).then(async(res)=>{
          await postData("users/submit_order_detail", { orderid:res.orderid, enrollmentno:userData.enrollmentno, emailid:userData.emailid, mobileno:userData.mobileno, data:data})
        })
        // alert("Payment Successful!");
        dispatch({type:'EMPTY_CART'})
        navigate('/homepage')
      },
      // prefill: {
      //   name: user.studentname , 
      //   email: user.emailid,
      //   contact: user?.mobileno,
      // },
      prefill: {
          name: userData !== "Not Login" ? userData.studentname : "",
          email: userData !== "Not Login" ? userData.emailid : "",
          contact: userData !== "Not Login" ? userData.mobileno : "",
      },
      theme: {
        color: "#F37254",
      },
    };


  


  const MakePayment=()=>{
    if(userData==='Not Login')
    {
      navigate("/sign_in?from=MP")
    }
    else
    {
      navigate("/make_payment")
      // alert('payment')
          const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
    }
  }

const btnMessage = user == null ? "Sign In" : "Make Payment"


  return (
    <div className='  flex-col justify-center xl:px-36 lg:px-20 md:px-8 sm:px-4 px-4 mt-7 pb-5' >
      <div className=' w-full md:p-4 p-3 flex border border-gray-300 rounded-2xl cursor-pointer ' >
        <div><img src={apply} width={25} /></div>
        <div className=' text-black md:text-[17px] text-[15px] font-bold ml-5' >Apply Coupon</div>        
        <div className="w-7 flex items-center ml-auto " ><img src={right} width={100} /></div>        
      </div> 
      {location.pathname==="/cart"?(
      <div onClick={()=>navigate("/order_review")} className=" mt-7 bg-blue-600 hover:bg-blue-700 p-3 flex justify-center text-white rounded-full md:text-[17px] text-[15px] transition-transform ease-in-out active:shrink-0 font-bold cursor-pointer active:scale-95 " >Place Order</div>
      ):location.pathname==='/order_review'?(
      <div onClick={MakePayment} className=" mt-7 bg-blue-600 hover:bg-blue-700 p-3 flex justify-center text-white rounded-full md:text-[17px] text-[15px] transition-transform ease-in-out active:shrink-0 font-bold cursor-pointer active:scale-95 " >{btnMessage}</div>
      ):location.pathname==='/make_payment'?(
        null
      ):null}
    </div>
  )
}
