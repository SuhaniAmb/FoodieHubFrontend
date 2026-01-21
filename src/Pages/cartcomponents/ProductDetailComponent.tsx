



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




export default function ProductDetailComponent({data}:ItemsProps) {


  

const totalAmount = data.reduce((sum, item) => {
  return item.offerprice>0? sum + item.offerprice*item.qty : sum + item.fullprice*item.qty
}, 0)




const total = data.reduce((sum, item) => {
  return sum + item.fullprice*item.qty
}, 0)



const discount = data.reduce((sum, item) => {
  return item.offerprice>0?sum +(item.fullprice-item.offerprice)*item.qty:sum
}, 0)



  return (
    <div className='  flex justify-center xl:px-36 lg:px-20 md:px-8 sm:px-4 px-4 ' >
      <div className=' w-full p-5  border border-gray-300 rounded-2xl ' >
          <div className=' text-black text-[16px] font-bold ' >Payment Details</div>

        <div className=' flex justify-between mt-3 mb-2 ' >
          <div className=' text-gray-700 lg:text-[16px] sm:text-[15px] text-[14px] ' >MRP Total</div>
          <div className=' text-gray-600  lg:text-[16px] sm:text-[15px] text-[14px] font-bold ' >₹{total.toFixed(2)}</div>
        </div>
        <hr />
        <div className=' flex justify-between my-2 ' >
          <div className=' text-gray-700  lg:text-[16px] sm:text-[15px] text-[14px] ' >Product Discount</div>
          <div className=' text-green-500  lg:text-[16px] sm:text-[15px] text-[14px] font-bold ' >- ₹{discount.toFixed(2)}</div>
        </div>
        <hr />
        <div className=' flex justify-between my-2 ' >
          <div className=' text-green-500  lg:text-[16px] sm:text-[15px] text-[14px] ' >Delivery Fee (Quick)</div>
          <div className=' text-green-500  lg:text-[16px] sm:text-[16px] text-[15px] font-bold ' >FREE</div>
        </div>
        <hr />
        <div className=' flex justify-between mt-2 ' >
          <div className=' text-gray-700  lg:text-[16px] sm:text-[15px] text-[14px] ' >Total</div>
          <div className=' text-black  lg:text-[17px] sm:text-[16px] text-[15px] font-bold ' >₹{totalAmount.toFixed(2)}</div>
        </div>
        <div className=' text-green-500  lg:text-[16px] sm:text-[15px] text-[14px] font-bold  flex justify-end my-2 ' >You Saved ₹{discount.toFixed(2)}</div>
      </div>
   </div>    
  )
}
