import { useRef} from "react"
import left from "../assets/previous.png"
import right from "../assets/forward.png"
import { serverURL } from "../Components/Services/Fetchnodeservices"
import { useNavigate } from "react-router-dom"

type Category = {
  picture: string
  fooditemname: string
  fooditemid:number
}

type CategoryProps = {
  data: Category[]
}



export default function SouthIndianComponent({data}:CategoryProps)
{

  

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const navigate=useNavigate()

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



  return (
    <div className=" w-full flex flex-col mt-12 ">
      <div className="ml-6 lg:ml-24 flex sm:text-[18px] text-[15px] font-bold text-black " >South Indian</div>
      <div className=" flex justify-center mt-6 " >
      <button onClick={scrollLeft} className="hidden lg:flex w-11 h-12 px-1 mt-12 outline-none border-none bg-transparent mr-5 focus:outline-none focus:ring-0 " ><img src={left} width={100} /></button>
      <div ref={sliderRef} className="flex overflow-x-auto scroll-smooth w-[90vw] [scrollbar-width:none]" >
        {data.map((item, index) => (
          <div key={index} onClick={()=>navigate(`/productdetailcomponent/${item.fooditemid}`)} className="group rounded-2xl hover:shadow-2xl flex-shrink-0 w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 flex flex-col items-start cursor-pointer " >
            <div className="w-full flex justify-center" >
            <img src={`${serverURL}/images/${item.picture}`} width={'100%'} alt={''} className="sm:w-40 sm:h-36 w-28 h-16 object-contain" />
            </div>
            <div className="w-full flex justify-center" >
            <p className="mt-2 sm:text-lg text-[14px] font-medium">{item.fooditemname}</p>
            </div>
            <span className="block h-1 w-0 bg-red-500 transition-all duration-500 group-hover:w-full origin-left" ></span>
          </div>
        ))}
      </div>
        <button onClick={scrollRight} className="hidden lg:flex w-11 h-11 px-1 mt-12 outline-none bg-transparent ml-5 border-none focus:outline-none focus:ring-0 " ><img src={right} width={100} /></button>
        </div>
    </div>
  )

}