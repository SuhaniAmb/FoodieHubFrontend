import { useState, useEffect } from "react"
import plus from "../../assets/plus.png"
import minus from "../../assets/minus.png"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"




type Food={
  picture:string
  fooditemtype:string
  rating:string
  fooditemname:string
  categoryname:string
  fullprice:number
  offerprice:number
  halfprice:number
  fooditemid:number
  qty:number
}

type FoodProps={
  data:Food
  refresh: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}



export default function AddToCartComponent({data, refresh,setRefresh}:FoodProps) 
{

  const navigate=useNavigate()

    const [selected, setSelected]=useState("left")
    const [quantity, setQuantity]=useState(data.qty || 0)


    const dispatch=useDispatch()



    const handleMinus=()=>{
    
    const q = quantity-1
    if(q<=0)
    {
      dispatch({type:"DELETE_CART",payload:[data.fooditemid,data]})
      setQuantity(q);
    }
    else
    {
     data.qty=q
      if(quantity>1)
      setQuantity(q)
      dispatch({type:"ADD_CART",payload:[data.fooditemid,data]})

    }
      setRefresh(!refresh)

    }


    
const handleAddClick=()=>{
    
    const q = quantity+1
     data.qty=q
    setQuantity(q);
    dispatch({type:"ADD_CART",payload:[data.fooditemid,data]})
      setRefresh(!refresh)

  }



    useEffect(() => {
    if (data) {
    setQuantity(data.qty ||  0)
    }
    }, [data, selected])



  return (
    <div className=" w-full pl-1 pr-6 " >
        <div className=" w-full flex justify-between bg-white rounded-2xl lg:py-3 py-2 lg:px-7 px-2 " >
            <div className="w-fit  " >
               { data?.halfprice>1?<><div className=" lg:text-[22px] text-[17px] text-black flex justify-center whitespace-nowrap " >Full & Half Price</div></>:<><div className=" sm:text-[22px] text-[17px] text-black flex justify-center " >Price</div></>}
               <div className=" flex space-x-1 justify-center " >
                   {data?.halfprice<1?<><div className={` border border-gray-500 hover:border-gray-900 sm:text-[16px] text-[13px] font-bold flex justify-center items-center rounded-full sm:py-2 py-1 sm:px-3 px-1 sm:mt-2 mt-1 cursor-pointer ${selected==="left"?"bg-green-600":""} ` } onClick={()=>setSelected("left")} >{data?.fullprice}</div></>:<><div className={` border border-gray-500 hover:border-gray-900 sm:text-[16px] text-[13px] font-bold flex justify-center items-center rounded-full sm:py-2 py-1 sm:px-2 px-1 sm:mt-2 mt-1 cursor-pointer ${selected==="left"?"bg-green-600":""} ` } onClick={()=>setSelected("left")} >{data?.fullprice}</div></>}
                   {data?.halfprice>1?<><div className={` border border-gray-500 hover:border-gray-900 sm:text-[16px] text-[13px] font-bold flex justify-center items-center rounded-full sm:py-2 py-1 sm:px-2 px-1 sm:mt-2 mt-1 cursor-pointer ${selected==="right"?"bg-green-600":""} ` } onClick={()=>setSelected("right")} >{data?.fullprice}</div></>:<></>}
              </div>
            </div>
           { quantity==0?( <div className="flex items-center pl-1 xl:pr-6 " >
          <div className=" border-2 hover:border-4 border-green-600 hover:border-green-600 xl:px-20 sm:px-10 px-5 py-2 rounded-3xl text-green-600 font-bold lg:text-[20px] text-[17px] cursor-pointer whitespace-nowrap " onClick={handleAddClick} >Add to cart</div>
          </div>):(<div className=" " >
               <div className=" sm:text-[22px] text-[17px] text-black flex justify-center " >Quantity</div>
               <div className=" flex " >
                <div className=" bg-gray-200 flex justify-center items-center sm:px-3 px-2 sm:py-3 py-1 rounded-full mt-1 cursor-pointer hover:border-black border  transition-transform active:scale-95" onClick={handleMinus} ><img src={minus} width={15} /></div>
                <div className=" sm:mx-2 mx-1 mt-2 text-black text-[20px] " >{quantity}</div>
                <div className=" bg-gray-200 flex justify-center items-center sm:px-3 px-2 sm:py-3 py-1 rounded-full mt-1 cursor-pointer hover:border-black border duration-150 transition-transform active:scale-95 " onClick={handleAddClick} ><img src={plus} width={15} /></div>                

               </div>
            </div>
           )}
        </div>
        <div className=" bg-green-600 flex justify-center rounded-full md:mt-8 mt-5 text-white sm:py-3 py-2 md:text-[20px] text-[17px] font-bold  xl:mx-10 mx-1 cursor-pointer " onClick={()=>navigate('/cart')} >Buy it now</div>
    </div>

  )

}

