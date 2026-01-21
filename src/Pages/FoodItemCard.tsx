import { serverURL } from "../Components/Services/Fetchnodeservices"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"


type Category = {
  fooditemid:number
  picture: string
  fooditemname: string
  fullprice: number
  halfprice: number
  offerprice: number
  rating: string
  fooditemtype: string
}

type CategoryProps = {
  data: Category[]
}


export default function FoodItemCard({data}:CategoryProps)
{

    const bgColors = ["bg-[#ffeaa7]","bg-[#fab1a0]","bg-[#dff9fb]","bg-[#686de0]","bg-[#22a6b3]","bg-[#78e08f]","bg-[#fa983a]","bg-[#6a89cc]","bg-[#f8c291]"]
    const randomBgColors = useMemo(() => {
  return data.map(
    () => bgColors[Math.floor(Math.random() * bgColors.length)]
  )
}, [data])

    
   const navigate=useNavigate()

    return(
        <div className=" w-full mt-10 pb-10 overflow-x-hidden">
        <div className="ml-6 lg:ml-24 flex  sm:text-[18px] text-[15px] font-bold text-black sm:mb-5  " >Today's Menu</div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-10 ">
        {data.map((item, index) => (

            <div key={index} onClick={()=>navigate(`/productdetailcomponent/${item.fooditemid}`)} className=" w-full md:ml-10 sm:ml-0 flex justify-center transform transition-transform duration-300 ease-in-out hover:scale-90 cursor-pointer  " >
                <div className=" w-full  mt-10 " >
                    <div className={`relative flex justify-center items-center w-full h-[250px] rounded-3xl ${randomBgColors[index]} `} >
                        <img src={`${serverURL}/images/${item.picture}`}  width={200}/> 
                        <div className=" absolute bg-gradient-to-t from-black to-transparent w-full h-24 bottom-0 rounded-b-3xl " >
                            <div className=" text-white text-2xl font-bold ml-5 mt-14 " >{item.offerprice==0?<></>:<>{Math.round(((item.fullprice - item.offerprice) / item.fullprice) * 100)}% OFF UPTO ₹{(item.fullprice)-(item.offerprice)} </> }</div>
                        </div>
                    </div>
                    <div className=" flex ml-4 mt-4 " >
                        <span>
                            {item.fooditemtype=='Veg'?<img src={`${serverURL}/images/veg.png`} width={20}/>:<img src={`${serverURL}/images/nonveg.png`} width={20} />} </span>
                        <span className=" ml-2 sm:text-xl text-[16px] text-black font-bold " >{item.fooditemname}
                        </span>
                    </div>
                    <div className=" flex ml-4 mt-1 " >
                        <span>
                            <img src={`${serverURL}/images/stars.png`} width={19} className=" bg-green-600 rounded-2xl p-1 " /> </span>
                        <span className=" ml-2 text-[16px] text-black font-bold " >{item.rating}</span>
                        <span className=" ml-1 text-[25px] mt-1 leading-[1px] flex items-center text-black font-bold " >•</span>
                        <span className=" ml-1 sm:text-[17px] text-[15px] text-black font-bold " >30-40 mins</span>
                    </div>
                    <div className=" flex ml-4 mt-1 " >
                        {item.offerprice==0?<><span className=" sm:text-lg text-[16px] text-black font-bold " >₹{item.fullprice}</span></>:<><span className=" text-lg text-black font-bold " >₹{item.offerprice}</span> <s className=" ml-2 text-lg " >₹{item.fullprice}</s></>}
                    </div>
                    <div className=" flex ml-4 sm:text-lg text-[15px] " >North Indian</div>
                    
                </div>
            </div>
        ))}

        </div>
</div>
    )
}