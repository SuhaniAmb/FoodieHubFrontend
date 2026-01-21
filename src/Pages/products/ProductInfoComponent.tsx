import { useState } from "react"
import arrow from "../../assets/down-arrow.png"
import share from "../../assets/share.png"
import insta from "../../assets/instagram.png"
import facebook from "../../assets/facebook.png"
import whatsapp from "../../assets/whatsapp.png"




type Food={
  picture:string
  fooditemtype:string
  rating:string
  fooditemname:string
  categoryname:string
  fullprice:number
  offerprice:number
  halfprice:number
  ingredients:string

}

type FoodProps={
  data:Food | null
}





export default function ProductInfoComponent({data}:FoodProps) {

    const [show, setShow]=useState(false)
    const [click,setClick]=useState(false)
    
  return (
    <div className=' mt-8 ' >
        <hr className=" border-gray-400 mb-3 " />
        <div className=" flex justify-between items-center ml-4 mr-6 cursor-pointer" onClick={() => setShow(!show)} >
            <div className=' text-black md:text-[19px] text-[16px]  ' >Ingredients List</div>
            <div><img src={arrow} width={20} className={` duration-300 ${show ? "rotate-180" : "" }`} /></div>
        </div>
        {show && (<div className="mx-6 mt-3 md:text-[16px] text-[12px] ">{data?.ingredients}</div>)}
        <hr className=" border-gray-400 mt-3 " />
        <div className=" flex justify-between items-center ml-4 mr-6 cursor-pointer mt-3 " onClick={() => setClick(!click)} >
            <div className=' text-black md:text-[19px] text-[16px]  ' >Share</div>
            <div><img src={share} width={20} className={` duration-300 ${click ? "rotate-180" : "" }`} /></div>
        </div>
        {click && (<div className="mx-6 mt-3 md:text-[16px] text-[12px] flex space-x-5 ">
            <img src={insta} width={25} className=" cursor-pointer " />
            <img src={facebook} width={25} className=" cursor-pointer " />
            <img src={whatsapp} width={25} className=" cursor-pointer " />
        </div>)}
        <hr className=" border-gray-400 mt-3 " />

    </div>
  )
}
