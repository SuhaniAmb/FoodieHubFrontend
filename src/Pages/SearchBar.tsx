import React, { useEffect, useState, useRef } from "react"
import search from "../assets/search.png"
import { getData } from "../Components/Services/Fetchnodeservices"
import { useNavigate } from "react-router-dom"

type categoryType={
    fooditemname:string
    fooditemid:number
}

export default function SearchBar()
{

    
 const [foodList, setFoodList]=useState<categoryType[]>([])
 const [searchText, setSearchText]=useState("")
 const [showDropdown, setShowDropdown]=useState(false)
 const [highlightedIndex,setHighlightedIndex]=useState(-1)

 const navigate=useNavigate()
 

///////// OUTSIDE CLICK BLANK /////////////////////

 const ref=useRef<HTMLDivElement>(null)


 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node)
    ) {
      setShowDropdown(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [])
/////////////////// ENDDDDD ////////////////


const fetchAllFood=async()=>{
    const response=await getData('fooditems/fetch_all_fooditems')
    setFoodList(response.data)
 }

 useEffect(function(){
    fetchAllFood()
 },[])


   // select dropdown item
  const handleSelect=(name:string)=>{
    setSearchText(name)
    setShowDropdown(false)
  }


  const filteredItems = foodList.filter((item) =>
  item.fooditemname.toLowerCase().includes(searchText.toLowerCase())
)
  
  //  Arrows
const handleKeyDown=(e:React.KeyboardEvent)=>{

if(e.key==="ArrowDown")
{
setHighlightedIndex((prev)=>
prev < filteredItems.length-1 
? prev+1 
: 0
)
}


if(e.key==="ArrowUp")
{
setHighlightedIndex((prev)=>
prev > 0 
? prev-1 
: filteredItems.length-1
)
}


if(e.key==="Enter" && highlightedIndex>=0)
{
const item=filteredItems[highlightedIndex]

setSearchText(item.fooditemname)

navigate(
`/productdetailcomponent/${item.fooditemid}`
)

setShowDropdown(false)
}

}


    return(
        <div className="w-full flex justify-center mt-7 " >
           <div ref={ref} className=" relative w-full lg:mx-64 mx-10 flex items-center sm:h-12 h-10 border rounded-xl border-black " >
           <img src={search} width={25} className="sm:m-5 m-2 " />
           <input type="text" value={searchText} placeholder='Search "Food Category" ' className="w-full border-none outline-none flex sm:text-[21px] text-[18px] placeholder:text-gray-600 font-medium " onKeyDown={handleKeyDown} onChange={(e) => {setSearchText(e.target.value)
            setShowDropdown(true)}} />

           {searchText && showDropdown && (
           <div className=" absolute top-full w-full overflow-hidden ml-14 pr-16 " >
               {foodList.filter((item) =>
               item.fooditemname.toLowerCase().includes(searchText.toLowerCase())).map((item,index) => (
               <p key={item.fooditemid} onClick={()=>{handleSelect(item.fooditemname);navigate(`/productdetailcomponent/${item.fooditemid}`)}}className={`p-2 cursor-pointer mt-2 ${highlightedIndex === index ? "bg-gray-200" : "hover:bg-gray-100"}`}>{item.fooditemname}</p>
               ))}
            </div>
           )}

           </div>
        </div>
    )
}