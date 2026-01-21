import { CloudUpload, Save, Trash2 } from "lucide-react";
import burger from "../../assets/burger.png";
import { useEffect, useState } from "react";
import { getData, getDate, getTime, postData } from "../Services/Fetchnodeservices";
import Swal from "sweetalert2";




interface DisplayAllFooditemsProps {

  refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;

}



export default function FooditemsInterface({refresh, setRefresh}:DisplayAllFooditemsProps)
{

        const [categoryId,setCategoryId]=useState('')
        const [categoryIdList,setCategoryIdList]=useState<{ categoryid:number, categoryname:string }[]>([]);
        const [branchId,setBranchId]=useState('')
        const [branchIdList,setBranchIdList]=useState<{ branchid:number, branchname:string }[]>([]);
        const [foodItemName,setFoodItemName]=useState('')
        const [foodItemType,setFoodItemType]=useState('')
        const [foodItemTaste,setFoodItemTaste]=useState('')
        const [ingredients,setIngredients]=useState('')
        const [fullPrice,setFullPrice]=useState('')
        const [halfPrice,setHalfPrice]=useState('')
        const [offerPrice,setOfferPrice]=useState('')
        const [status,setStatus]=useState('')
        const [rating,setRating]=useState('')
        const [description,setDescription]=useState('')
        const [picture,setPicture]=useState<{ bytes: File | null; fileName: string;}>({bytes: null,fileName: burger});




        const handleClick = async () => {
            const formData = new FormData();
        
            formData.append("categoryid", categoryId);
            formData.append("branchid", branchId);
            formData.append("fooditemname", foodItemName);
            formData.append("fooditemtype", foodItemType);
            formData.append("fooditemtaste", foodItemTaste);
            formData.append("ingredients", ingredients);
            formData.append("fullprice", fullPrice);
            formData.append("halfprice", halfPrice);
            formData.append("offerprice", offerPrice);
            formData.append("status", status);
            formData.append("rating", rating);
            formData.append("description", description);

            if (picture.bytes) {
              formData.append("picture", picture.bytes);
            }
            formData.append("createddate", getDate());
            formData.append("createdtime", getTime());
            formData.append("userid", "xxxx");
        
            const response = await postData("fooditems/submit_fooditems", formData);
        
            if (response.status) 
            {
              Swal.fire({ position: "center", icon: "success", title: response.message, showConfirmButton: false, timer: 2000,toast: true });
            } 
            else 
            {
              Swal.fire({ position: "center", icon: "error", title: response.message, showConfirmButton: false, timer: 2000, toast: true });
            }
        
            setRefresh(!refresh)
        
          }
   
          
          
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) 
    {
      setPicture({ bytes: file, fileName: URL.createObjectURL(file)});
    }
  };



  
  const fetchCategory=async()=>{
    const response=await getData('fooditems/fetch_category')
    setCategoryIdList(response.data)
  }

  useEffect(function(){
    fetchBranch()
    fetchCategory()
  },[])


  const fillCategory=()=>{
    return categoryIdList.map((item)=>{
      return( <option value={item.categoryid} >{item.categoryname}</option> )
    })
  }


  
  const fetchBranch=async()=>{
    const response=await getData('branch/fetch_all_branch')
    setBranchIdList(response.data)
  }

  useEffect(function(){
    fetchBranch()
  },[])


  const fillBranch=()=>{
    return branchIdList.map((item)=>{
      return( <option value={item.branchid} >{item.branchname}</option> )
    })
  }





    return(
       
    <div className="w-[100%] h-auto flex justify-center">
      <div className="w-[80%] border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className="w-full rounded-t-[5px] bg-[linear-gradient(90deg,hsla(321,41%,24%,1)_0%,hsla(330,53%,77%,1)_100%)]">
          <div className="flex font-quicksand flex-col px-1 w-[30%] py-2.5">
            <div className="font-bold text-[24px] text-white">HungerBuddy</div>
            <div className="font-[700] text-[16px] text-white">New Food Category</div>
          </div>
        </div>
        <div className="flex p-2 w-full items-center justify-between flex-wrap">
          <div className="relative w-[25%] p-2 ">
            <select id="categoryid" onChange={(e)=>setCategoryId(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillCategory()}
            </select>
              <label htmlFor="categoryid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Category</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <select id="branchid" onChange={(e)=>setBranchId(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBranch()}
            </select>
              <label htmlFor="branchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <input onChange={(e) => setFoodItemName(e.target.value)} type="text" id="fooditemname" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="fooditemname" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Food Name</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <select id="fooditemtype" onChange={(e)=>setFoodItemType(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="">
                <option value="" disabled hidden></option>
                <option>Vegetarian</option>
                <option>Non Vegetarian</option>
                <option>Vegan</option>
            </select>
              <label htmlFor="fooditemtype" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Food Type</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <select id="fooditemtaste" onChange={(e)=>setFoodItemTaste(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="">
                <option value="" disabled hidden></option>
                <option>Spicy</option>
                <option>Non Spicy</option>
            </select>
              <label htmlFor="fooditemtaste" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Food Taste</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <input onChange={(e) => setIngredients(e.target.value)} type="text" id="ingredients" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="ingredients" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Ingredients</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <input onChange={(e) => setFullPrice(e.target.value)} type="text" id="fullprice" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="fullprice" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Full Price</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <input onChange={(e) => setHalfPrice(e.target.value)} type="text" id="halfprice" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="halfprice" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Half Price</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <input onChange={(e) => setOfferPrice(e.target.value)} type="text" id="offerprice" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="offerprice" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Offer Price</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <select id="status" onChange={(e)=>setStatus(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="">
                <option value="" disabled hidden></option>
                <option>Available</option>
                <option>Unavailable</option>
            </select>
              <label htmlFor="fooditemtype" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Status</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <input onChange={(e) => setRating(e.target.value)} type="text" id="ratings" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="ratings" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Ratings</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <input onChange={(e) => setDescription(e.target.value)} type="text" id="description" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="description" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Description</label>
          </div>
          <div className="relative  w-[6%] p-2 ">
            <img src={picture.fileName} alt="Picture Icon Preview" className="w-[40px]" />
          </div>
          <label htmlFor="picture" className=" w-[6%] p-2 flex flex-col items-center text-[hsla(321,32%,37%,1)] cursor-pointer">
            <CloudUpload className="h-9 w-9 flex" />
            <span className="text-xs">Upload</span>
            <input type="file" id="picture" onChange={handleChange} hidden accept="image/*" />
          </label>
          <div className="  w-[5%] p-2 flex flex-col items-center cursor-pointer text-[hsla(321,32%,37%,1)] " onClick={handleClick}>
            <Save id="saveIcon" className="h-9 w-9 text-[#692c55]" />
            <span className="text-xs">Save</span>
          </div>
          <div className="  w-[5%] p-2 flex flex-col items-center cursor-pointer  text-[hsla(321,32%,37%,1)] ">
            <Trash2 id="trashIcon" className="h-9 w-9 text-[#692c55]" />
            <span className="text-xs">Clear</span>
          </div>
        </div>
      </div>
    </div>
        
    )
}