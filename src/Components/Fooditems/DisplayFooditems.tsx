import { useState, useEffect } from "react"
import { getData, serverURL, getDate, getTime, postData } from "../Services/Fetchnodeservices"
import { SquarePen, Trash, X } from "lucide-react";
//import { CloudUpload, X } from "lucide-react";
import Swal from "sweetalert2";
//import burger from "../../assets/burger.png";


type FoodType={

    fooditemid:number;
    categoryid:number;
    categoryname:string;
    branchid:number;
    branchname:string;
    fooditemname:string;
    fooditemtype:string;
    fooditemtaste:string;
    ingredients:string;
    fullprice:number;
    halfprice:number;
    offerprice:number;
    status:string;
    rating:string;
    description:string;
    picture:string;

}




interface DisplayAllFooditemsProps {
  refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}




export default function DisplayFooditems({refresh,setRefresh}:DisplayAllFooditemsProps)
{


    const [fooditemList, setFooditemList]=useState<FoodType[]>([])
    const [search,setSearch]=useState('')
    const [openDialog,setOpenDialog]=useState(false)






    /********************** EDIT FOODITEMS ****************************************************/




        const [fooditemId,setFooditemId]=useState('')
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
        //const [picture,setPicture]=useState<{ bytes: File | null; fileName: string;}>({bytes: null,fileName: burger});




        const handleClick = async () => {
           
        const body={'fooditemid':fooditemId, 'categoryid':categoryId, 'branchid':branchId, 'fooditemname':foodItemName, 'fooditemtype':foodItemType, 'fooditemtaste':foodItemTaste, 'ingredients':ingredients, 'fullprice':fullPrice, 'halfprice':halfPrice, 'offerprice':offerPrice, 'status':status, 'rating':rating, 'description':description,'createdate':getDate(), 'createdtime':getTime(), 'userid':'xxxx'}

            const response = await postData("fooditems/edit_fooditems", body);
        
            if (response.status) 
            {
              Swal.fire({ position: "center", icon: "success", title: response.message, showConfirmButton: false, timer: 2000,toast: true });
              setOpenDialog(false)
              fetchAllFooditems()
            } 
            else 
            {
              Swal.fire({ position: "center", icon: "error", title: response.message, showConfirmButton: false, timer: 2000, toast: true });
            }
        
            setRefresh(!refresh)
        
          }
   
          
          
 {/* const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) 
    {
      setPicture({ bytes: file, fileName: URL.createObjectURL(file)});
    }
  };
*/}


  
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



const showEditFooditem=()=>{

    return(
       
    <div className="w-[100%] h-auto flex justify-center">
      <div className="w-[80%] border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className=" px-1 pb-2 w-full rounded-t-[5px] bg-[linear-gradient(90deg,hsla(321,41%,24%,1)_0%,hsla(330,53%,77%,1)_100%)] ">
          <div className=" flex flex-row w-full pt-2.5">
            <div className="font-bold text-[24px] text-white">FoodieHub</div>
            <X className="text-white ml-auto cursor-pointer " onClick={handleCloseDialog} />
          </div>

            <div className="font-[700] text-[16px] text-white">Edit Food Category</div>
            
          </div>
        <div className="flex p-2 w-full items-center justify-between flex-wrap">
          <div className="relative w-[50%] p-2 ">
            <select id="categoryid" onChange={(e)=>setCategoryId(e.target.value)} value={categoryId} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillCategory()}
            </select>
              <label htmlFor="categoryid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Category</label>
          </div>
          <div className="relative w-[50%] p-2 ">
            <select id="branchid" onChange={(e)=>setBranchId(e.target.value)} value={branchId} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBranch()}
            </select>
              <label htmlFor="branchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch</label>
          </div>
          <div className="relative w-[50%] p-2 ">
            <input onChange={(e) => setFoodItemName(e.target.value)} type="text" id="fooditemname" value={foodItemName} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="fooditemname" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Food Name</label>
          </div>
          <div className="relative w-[50%] p-2 ">
            <select id="fooditemtype" onChange={(e)=>setFoodItemType(e.target.value)} value={foodItemType} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="">
                <option value="" disabled hidden></option>
                <option>Vegetarian</option>
                <option>Non Vegetarian</option>
                <option>Vegan</option>
            </select>
              <label htmlFor="fooditemtype" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Food Type</label>
          </div>
          <div className="relative w-[50%] p-2 ">
            <select id="fooditemtaste" onChange={(e)=>setFoodItemTaste(e.target.value)} value={foodItemTaste} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="">
                <option value="" disabled hidden></option>
                <option>Spicy</option>
                <option>Non Spicy</option>
            </select>
              <label htmlFor="fooditemtaste" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Food Taste</label>
          </div>
          <div className="relative w-[50%] p-2 ">
            <input onChange={(e) => setIngredients(e.target.value)} type="text" id="ingredients" value={ingredients} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="ingredients" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Ingredients</label>
          </div>
          <div className="relative w-[50%] p-2 ">
            <input onChange={(e) => setFullPrice(e.target.value)} type="text" id="fullprice" value={fullPrice} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="fullprice" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Full Price</label>
          </div>
          <div className="relative w-[50%] p-2 ">
            <input onChange={(e) => setHalfPrice(e.target.value)} type="text" id="halfprice" value={halfPrice} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="halfprice" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Half Price</label>
          </div>
          <div className="relative w-[50%] p-2 ">
            <input onChange={(e) => setOfferPrice(e.target.value)} type="text" id="offerprice" value={offerPrice} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="offerprice" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Offer Price</label>
          </div>
          <div className="relative w-[50%] p-2 ">
            <select id="status" onChange={(e)=>setStatus(e.target.value)} value={status} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="">
                <option value="" disabled hidden></option>
                <option>Available</option>
                <option>Unavailable</option>
            </select>
              <label htmlFor="fooditemtype" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Status</label>
          </div>
          <div className="relative w-[100%] p-2 ">
            <input onChange={(e) => setRating(e.target.value)} type="text" id="ratings" value={rating} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="ratings" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Ratings</label>
          </div>
          <div className="relative w-[25%] p-2 ">
            <input onChange={(e) => setDescription(e.target.value)} type="text" id="description" value={description} placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="description" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Description</label>
          </div>
          <div className="flex flex-row w-full space-x-14 items-center cursor-pointer  text-[hsla(321,32%,37%,1)] ">
            <button id="save" onClick={handleClick} className="w-full bg-[hsla(321,41%,24%,1)] text-white py-2 px-4 rounded-md transition-colors duration-200">Save</button>
            <button id="Clear" className="w-full bg-[hsla(321,41%,24%,1)] text-white py-2 px-4 rounded-md transition-colors duration-200">Clear</button>
          </div>
        </div>
      </div>
    </div>
        
    )


}




    /******************************************************************************************/


    

/****************** DIALOG ************** */

const showDialog = () => {
  return (
    <>
      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50" onClick={handleCloseDialog} >
          <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-3xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">{showEditFooditem()}</div>
          </div>
        </div>
      )}
    </>
  );
};

/******************************** */


    const fetchAllFooditems=async()=>{
        const response=await getData('fooditems/fetch_all_fooditems')
        setFooditemList(response.data)
    }



    useEffect(function(){
        fetchAllFooditems()
    },[refresh])




    const filteredFooditemList = fooditemList.filter((item) =>
    item.fooditemname.toLowerCase().includes(search.toLowerCase())
  )





  
  const handleOpenDialog=(item: FoodType)=>{

    setFooditemId(`${item.fooditemid}`)
    setCategoryId(`${item.categoryid}`)
    setBranchId(`${item.branchid}`)
    setFoodItemName(`${item.fooditemname}`)
    setFoodItemType(`${item.fooditemtype}`)
    setFoodItemTaste(`${item.fooditemtaste}`)
    setIngredients(`${item.ingredients}`)
    setFullPrice(`${item.fullprice}`)
    setHalfPrice(`${item.halfprice}`)
    setOfferPrice(`${item.offerprice}`)
    setStatus(`${item.status}`)
    setRating(`${item.rating}`)
    setDescription(`${item.description}`)



    setOpenDialog(true)
    }





 

    const handleDelete=async(fooditemId:number)=>{
            Swal.fire({
            title: "Do you want to delete the selected Record ?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            buttonsStyling: true, 
            customClass: {
            confirmButton: 'bg-blue-500 focus:outline-none text-white px-4 py-2 rounded hover:bg-blue-600',
            cancelButton: 'bg-gray-500 focus:outline-none text-white px-4 py-2 rounded hover:bg-gray-600'
  }
         }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) 
        {
            const response=await postData('fooditems/delete_fooditems',{fooditemid:fooditemId})
            Swal.fire({
              title: response.message,
              confirmButtonText: 'OK',
              buttonsStyling: true,
              customClass: {
              confirmButton: 'bg-blue-500 hover:bg-blue-600 focus:outline-none text-white px-4 py-2 rounded'
        }
            });
            fetchAllFooditems()
        } 
        else if (result.isDenied) 
        {
            Swal.fire("Changes are not saved", "", "info");
        }
     });
        


  }



  

  const handleCloseDialog=()=>{
    setOpenDialog(false)
  }






 const displayFoditem=()=>{
    return(


        <div className="w-screen h-auto flex justify-center" >

        <div className="w-[80%] p-6 box-border flex flex-col justify-end rounded-md shadow  ">
       <div className="w-full flex mb-4 justify-between items-center">
            <div className="text-lg font-semibold text-black-800 flex items-center">List Of Food Items</div>
            

        <div className="flex items-center px-4 py-2 rounded-md bg-white border border-gray-300 max-w-md w-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904"
          className="fill-gray-600 mr-2 w-4 h-4">
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
        </svg>
        <input
          type="text"
          placeholder="Search Category Name..."
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full outline-none bg-transparent text-slate-600 text-sm"
        />
        </div>
        </div>
        <div className="flex-1 overflow-auto bg-white min-h-0 ">
           <div className="overflow-x-auto" >
                <table className="min-w-full bg-white ">
                    <thead className="bg-white whitespace-nowrap" >
                        <tr>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Actions</th>
                            <th className="py-3 px-4 text-left text-[17px] font-quicksand text-black " >Category</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Branch</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Food Name</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Full/Half</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Offer</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Status</th>
                            <th className="py-3 pl-4 text-left text-[17px] font-quicksand text-black " >Rating</th>

                            <th className="py-3 px-4 text-[17px] font-quicksand text-black" >Picture</th>
                        </tr>
                   </thead>
                   <tbody className="whitespace-nowrap" >
                    {filteredFooditemList.map((item,index)=>(
                        <tr key={index} >
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >
                                <div className="flex flex-row" >
                                    <button className="focus:outline-none hover:outline-none border-none bg-transparent cursor-pointer" title='Edit'> 
                                        <SquarePen className="h-5 w-5 flex justify-center  text-black " onClick={()=>handleOpenDialog(item)} />
                                    </button> 
                                    <button className="focus:outline-none hover:outline-none border-none bg-transparent cursor-pointer" title='Delete'>
                                            <Trash className="h-5 w-5 flex justify-center ml-5" onClick={()=>handleDelete(item.fooditemid)} />
                                    </button>
                                </div> 
                            </td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.categoryid}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.branchid}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.fooditemname},{item.fooditemtype}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >&#8377;{item.fullprice}/&#8377;{item.halfprice}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >&#8377;{item.offerprice}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.status}</td>
                            <td className="py-3 px-4 text-[15px] text-slate-900 font-medium" >{item.rating}</td>

                            <td className="py-3 px-4" ><img src={`${serverURL}/images/${item.picture}`} alt="icon" className="w-10 h-10 rounded-[10px] mx-auto " /></td>
                        </tr>
                    ))}
                   </tbody>
                </table>
                {filteredFooditemList.length === 0 && (
                <div className="text-center text-gray-500 mt-4">No matching Fooditems found....</div>
              )}
           </div>
        </div>
        </div>
        </div>
    )
 }

    




    ///////////////////////////////////////////////////////////////////
    return(
    <div>
    <div className="min-h-screen flex justify-center items-start pt-10">
       {displayFoditem()}
    </div>
    {showDialog()}
    </div>

    )
}