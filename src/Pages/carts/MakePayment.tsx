import CounterComponent from "../cartcomponents/CounterComponent"
import ShowCart from "../cartcomponents/ShowCart"
import ProductDetailComponent from "../cartcomponents/ProductDetailComponent"
import CouponComponent from "../cartcomponents/CouponComponent"
// import { useEffect, useState } from "react"
// import { getData } from "../../Components/Services/Fetchnodeservices"
import { useSelector } from "react-redux"
import type { RootState } from "../../Components/Storage/RootReducer"
import { useState } from "react"
import AddressComponent from "../cartcomponents/AddressComponent"



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





export default function MakePayment() {


  
  const cart=useSelector((state:RootState)=>state.cart)
  const products=Object.values(cart) as Items[]
  const [refresh,setRefresh]=useState(false)



  // const [foodList, setFoodList]=useState([])
     
  //   const fetchAllFoodItems=async()=>{
  //       const response=await getData('users/fetch_all_fooditems')
  //           setFoodList(response.data)
  //   }

    // useEffect(function(){
    //   fetchAllFoodItems()
    // },[])

  return (
    <div> 
      {products.length==0?<><div>Cart is Empty</div></>:<>
    <div className="w-full xl:mt-12 lg:mt-8 md:mt-5 mt-2 lg:pl-5 overflow-x-hidden">
      <div className="sm:grid grid-cols-2 gap-1 ">
        <div className="xl:pl-14 lg:pl-10 md:pl-3 pl-1 ">
          <div className=" text-black text-2xl font-bold">Order Review</div>
          <div><AddressComponent/></div>
          <div>
            <ShowCart data={products} refresh={refresh} setRefresh={setRefresh} />
          </div>
        </div>
        <div className=" lg:mt-14 md:mt-8 ">
          <div><CounterComponent/></div>
          <div><ProductDetailComponent data={products} /></div>
          <div><CouponComponent/></div>
        </div>
      </div>
    </div>
    </>}
    </div>
  )
}
