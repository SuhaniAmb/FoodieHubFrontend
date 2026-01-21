import { useRef } from "react"
import { serverURL } from "../../Components/Services/Fetchnodeservices"
import left from "../../assets/previous.png"
import right from "../../assets/forward.png"
import swiggy from "../../assets/swigy.png"
import blinkit from "../../assets/blinkit_logo.png"
import zepto from "../../assets/zepto.png"
import { useNavigate } from "react-router-dom"



type Category = {
  categoryicon: string
  categoryname: string
  categoryid:number
  picture:string
  fooditemid:number
  
}

type CategoryProps = {
  data: Category[]
}




export default function SimilarImagesComponent({data}:CategoryProps) {



  const navigate=useNavigate()
  const sliderRef = useRef<HTMLDivElement | null>(null)
  
  

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

  
  const handleFoodChange=(foodid:number)=>{
    navigate(`/productdetailcomponent/${foodid}`)
  }

 

    
  return (
        <div className=" w-full flex flex-col ">
      <div className="ml-3 mt-6 flex sm:text-[20px] text-[15px] text-black " >Liked it? Try these!</div>
      <div className=" flex justify-center mt-6 " >
      <button onClick={scrollLeft} className="hidden lg:flex w-20 h-11 mt-12 bg-transparent outline-none border-none focus:outline-none focus:ring-0 " ><img src={left} width={35} /></button>
      <div ref={sliderRef} className="flex overflow-x-auto space-x-1 scroll-smooth w-fit [scrollbar-width:none]" >
        {data.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl hover:shadow-2xl flex-shrink-0 w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 flex flex-col items-start cursor-pointer " onClick={()=>handleFoodChange(item.fooditemid)} >
            <div className="w-full flex justify-center" >
            <img src={`${serverURL}/images/${item.picture}`} width={'100%'} alt={''} className=" px-6 hover:px-5 sm:h-36 h-16 object-contain  " />
            </div>
            <span className="block h-1 w-0 bg-red-500 transition-all duration-500 group-hover:w-full " ></span>
          </div>
        ))}
      </div>
        <button onClick={scrollRight} className="hidden lg:flex w-20 h-11 mt-12 bg-transparent outline-none border-none focus:outline-none focus:ring-0 " ><img src={right} width={35} /></button>
        </div>
        <div className="ml-3 mt-6 flex sm:text-[20px] text-[15px] text-black " >Also available on*</div>
        <div className=" ml-3 flex w-full justify-around sm:pr-60 pr-20 " >
            <img src={swiggy} width={100} />
            <div className="w-px my-8 bg-gray-600"></div>
            <img src={blinkit} width={100} />
            <div className="w-px my-9 mr-2 bg-gray-600"></div>
            <img src={zepto} width={100} className="py-10 " />

        </div>
        <hr className="border-gray-500 block sm:hidden" />

    </div>

  )
}
