import { useRef } from "react"
import left from "../assets/previous.png"
import right from "../assets/forward.png"
import { postData, serverURL } from "../Components/Services/Fetchnodeservices"

type Category = {
  categoryicon: string
  categoryname: string
  categoryid:number
  
}


type FoodItem = {
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
  dataRef: React.RefObject<HTMLDivElement | null>
  foodList:FoodItem[]
  setFoodList: React.Dispatch<React.SetStateAction<FoodItem[]>>
}



export default function CategoryComponent({data, dataRef, setFoodList}:CategoryProps)
{


  const sliderRef = useRef<HTMLDivElement | null>(null)


  const fetchAllFoodByCategory=async(cid:number)=>{
    const response= await postData('users/fetch_all_fooditems_by_category_id',{categoryid:cid})
    setFoodList(response.data)
  }


  

  const scrollLeft = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    })
  }

  const scrollRight = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    })
  }


   
    
   const handleCategoryClick=(cid:number)=>{
    fetchAllFoodByCategory(cid)
    dataRef.current?.scrollIntoView({behavior:"smooth"})

   }

  return (
    <div className=" w-full flex flex-col mt-12 ">
      <div className="ml-6 lg:ml-24 flex sm:text-[18px] text-[15px] font-bold text-black " >Categories</div>
      <div className=" flex justify-center mt-6 " >
      <button onClick={scrollLeft} className="hidden lg:flex w-11 h-12 bg-transparent mt-12 mr-5 px-1 outline-none border-none focus:outline-none focus:ring-0 " ><img src={left} width={100} /></button>
      <div ref={sliderRef} className="flex overflow-x-auto scroll-smooth w-[90vw] [scrollbar-width:none]" >
        {data.map((item, index) => (
          <div key={index} onClick={()=>handleCategoryClick(item.categoryid)} className="group rounded-2xl hover:shadow-2xl flex-shrink-0 w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 flex flex-col items-start cursor-pointer " >
            <div className="w-full flex justify-center" >
            <img src={`${serverURL}/images/${item.categoryicon}`} width={'100%'} alt={''} className="sm:w-40 sm:h-36 w-28 h-16 object-contain  " />
            </div>
            <div className="w-full flex justify-center" >
            <p className="mt-2 sm:text-lg text-[12px] font-medium flex justify-center">{item.categoryname}</p>
            </div>
            <span className="block h-1 w-0 bg-red-500 transition-all duration-500 group-hover:w-full origin-left" ></span>
          </div>
        ))}
      </div>
        <button onClick={scrollRight} className="hidden lg:flex w-11 h-11 px-1 mt-12 ml-5 bg-transparent outline-none border-none focus:outline-none focus:ring-0 " ><img src={right} width={100} /></button>
        </div>
    </div>
  )

}