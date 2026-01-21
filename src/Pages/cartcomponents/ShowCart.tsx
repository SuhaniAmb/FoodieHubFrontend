// npm import dosa from "../../assets/masala-dosa.png"
import { useNavigate } from "react-router-dom"
import { serverURL } from "../../Components/Services/Fetchnodeservices"
import plus from "../../assets/plus.png"
import minus from "../../assets/minus.png"
import { useDispatch } from "react-redux"



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
  refresh: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>

}


export default function ShowCart({data, refresh, setRefresh}:ItemsProps) {


    const navigate=useNavigate()




    const dispatch=useDispatch()



    const handleMinus=(item:Items)=>{
    
    const q = item.qty-1
    if(q<=0)
    {
      dispatch({type:"DELETE_CART",payload:[item.fooditemid,data]})
    }
    else
    {
     item.qty=q
      if(q>1)
      dispatch({type:"ADD_CART",payload:[item.fooditemid,data]})

    }
      setRefresh(!refresh)

    }


      
const handleAddClick=(item:Items)=>{
    
    const q = item.qty+1
     item.qty=q
    dispatch({type:"ADD_CART",payload:[item.fooditemid,data]})
      setRefresh(!refresh)

  }


const totalAmount = data.reduce((sum, item) => {
  return item.offerprice>0? sum + item.offerprice*item.qty : sum + item.fullprice*item.qty
}, 0)


  return (
    <div className=' w-full bg-white lg:mt-10 mt-5 ' >
      <div className=' flex justify-between ' >
        <div className=' whitespace-nowrap ml-2 text-[black] md:text-[16px] text-[15px] font-bold ' >Quick Basket</div>
        <div className='w-full ml-1 text-[15px] ' >({data?.length})</div>
        <div className=' whitespace-nowrap text-black md:text-[16px] text-[15px] font-bold mr-3 ' >₹{totalAmount.toFixed(2)}</div>
      </div>
      <div className=' md:mt-3 mt-2 p-2 rounded-3xl border border-gray-400 ' >
        <div className=' flex items-center m-3 ' >
        <div className=' md:text-[11px] text-[10px] font-bold rounded-md px-1 h-5 flex items-center justify-center bg-[#dbf7e8] ' >Quick</div>
        <div className=' text-green-900 md:text-[14px] text-[12px] ml-1 whitespace-nowrap ' >Delivery in 10 to 30 mins</div>
        </div>
          {totalAmount>99?<></>:<>

        <div className=' mt-2 border border-red-200 lg:p-4 p-2 rounded-lg bg-red-50 ' >
          <div className=" flex " >
          <div className=" bg-orange-600 p-2 flex items-center justify-center w-2 h-2 text-white text-[13px] rounded-full " >!</div>
          <div className=" flex items-end text-black lg:text-[14px] sm:text-[12px] text-[11px] font-[600] ml-1 whitespace-nowrap " >Minimum order is ₹99.00 for grocery</div>
          </div>
          <div className=" flex mt-2 " >
            <div className=" text-black xl:text-[15px] sm:text-[12px] text-[10px] mr-1 whitespace-nowrap" >Add items</div>
            <div className=" text-black xl:text-[15px] sm:text-[12px] text-[10px] font-bold mr-1 whitespace-nowrap" >worth ₹{100-totalAmount}.00</div>
            <div className=" text-black xl:text-[15px] sm:text-[12px] text-[10px] whitespace-nowrap " >from Grocery to proceed</div>
            <div className=" bg-blue-600 lg:px-3 px-1 py-1 rounded-3xl ml-auto text-white lg:text-[14px] sm:text-[12px] text-[9px] font-bold  whitespace-nowrap flex justify-center items-center cursor-pointer " onClick={()=>{navigate(`/homepage`)}} >Add Items</div>
            </div>
        </div>
          </>}

               
                

{data.map((item,index)=>{

const discount=item.fullprice-item.offerprice
const amt=(item.offerprice>0?item.offerprice:item.fullprice)*item.qty

  return(
        <div key={index}  >
          <div  className=" px-2 my-4 flex mb-5" >
        <div className=" lg:mx-3 sm:mx-2 mx-1 " >
        <img src={`${serverURL}/images/${item.picture}`} width={100} className=" flex justify-center items-start " />
        </div>
        <div className=" ml-4  w-full" >
          <div className=" text-gray-600 text-[14px] whitespace-nowrap " >{item.fooditemname}</div>
          <div className="flex items-center gap-1 " >
            {item.offerprice ==0?<><div  className=" text-black text-[15px] font-bold mt-1 " >₹{item.fullprice.toFixed(2)}/unit</div></>:<><div className=" text-black text-[15px] font-bold mt-1 "  >₹{item.offerprice.toFixed(2)}/Unit</div><s  className=" text-gray-600 text-[15px] mt-1 "  >₹{item.fullprice}/Unit</s></>} 
            <div className=" text-black text-[15px] font-bold mt-1 ml-auto " >₹{amt.toFixed(2)}</div>
          </div>
          {item.offerprice>1?<> <div className=" mt-1 px-1 w-fit rounded-sm text-[12px] font-[600] bg-[#dbf7e8] text-green-700 " >You Save ₹{discount}</div></>:<></>}
         <div className=" flex items-center mt-1 " >
            <div className=" text-gray-600 text-[12px] " >Sold by</div>
            <div  className=" text-gray-800 font-bold text-[11px] "  >:</div>
            <div className=" text-black ml-1 text-[13px] " >HungerBuddy Foods</div>
          </div>
          <div className=" flex items-start mt-1 " >
            <div className=" text-gray-600 text-[12px] flex items-start " >Qty</div>
            <div  className=" text-gray-800 font-bold text-[11px] "  >:</div>
            <div className=" text-black ml-1 text-[12px] " >{item.qty}</div>
                <div className=" flex ml-auto " >
                <div className=" border border-gray-300 flex justify-center items-center px-2 py-2  rounded-full mt-1 hover:bg-green-100 hover:border-green-500 cursor-pointer  transition-transform active:scale-95" onClick={()=>handleMinus(item)} ><img src={minus} width={15}  /></div>
                <div className=" sm:mx-2 mx-1 mt-2 text-black text-[20px] " >{item?.qty}</div>
                <div className=" border border-gray-300 flex justify-center items-center px-2 py-2 rounded-full mt-1 cursor-pointer hover:bg-green-100 hover:border-green-500 " onClick={()=>handleAddClick(item)} ><img src={plus} width={15} /></div>                

               </div>

          </div>
        </div>
        </div>
       {index !== data.length - 1 && (
  <hr className="mx-2" />
)}


      </div>
     ) })}
      </div> 

    </div>
  )
}
