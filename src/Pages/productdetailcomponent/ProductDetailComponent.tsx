import ProductImageComponent from "../products/ProductImageComponent";
import { useState, useEffect } from "react";
import { postData } from "../../Components/Services/Fetchnodeservices";
import { useParams } from "react-router-dom";
import SimilarImagesComponent from "../products/SimilarImagesComponent";
import ProductRatingComponent from "../products/ProductRatingComponent";
import AddToCartComponent from "../products/AddToCartComponent";
import ProductInfoComponent from "../products/ProductInfoComponent";
import Header from "../Header";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import type { RootState } from "../../Components/Storage/RootReducer";




export default function ProductDetailComponent() {



type FoodItem = {
  fooditemid:number
  picture: string
  fooditemname:string
  fooditemtype:string
  rating:string
  categoryname:string
  fullprice:number
  offerprice:number
  halfprice:number
  ingredients:string
  qty:number
  categoryid:string
  selected:string


}  



type CategoryList = {
  categoryicon: string
  categoryname: string
  categoryid:number
  picture:string
  fooditemid:number

}


    const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
    const [categoryList, setCategoryList] = useState<CategoryList[]>([]);
    const [refresh, setRefresh]=useState(false)
    const cart=useSelector((state:RootState)=>state.cart)



    const {id}=useParams()

    const fetchAllFoodItems=async()=>{

      const cartKeys=Object.keys(cart)

      if(cartKeys.includes(id!))
      {
        const item=cart[id!] as FoodItem
        setFoodItem(item)
        // alert('cart m h')
  fetchAllFoodByCategory(item.categoryid)

      }
      else
      {
        // alert('nahi h')

        const response=await postData('users/fetch_all_fooditems_by_id',{fooditemid:id})
        // console.log(response.data)
        // alert(JSON.stringify(response.data))

        response.data[0].qty=0
        setFoodItem(response.data[0])
       if (response.data.length > 0) {
  fetchAllFoodByCategory(response.data[0].categoryid)
 }}
    }

    

    const fetchAllFoodByCategory=async(cn:string)=>{
        const response=await postData('users/fetch_all_fooditems_by_category_id',{categoryid:cn})
        //alert('xxxxxxxxxxxxxxx',JSON.stringify(response.data))
        setCategoryList(response.data)

    }




    useEffect(function(){
    fetchAllFoodItems()
    },[id,cart])


if (!foodItem) return <div>Loading...</div>; // ✅ handle null data


  return (
    <div>
      <div><Header/></div>
    <div className="w-full mt-10 xl:px-40 lg:px-8 md:px-10 mb-10 overflow-x-hidden">
      <div className="sm:grid grid-cols-2 bg-[#F4EDF9] sm:rounded-3xl gap-5">
        <div className=" sm:flex flex-col ">
          <div>
            <ProductImageComponent data={foodItem!} />
         </div>
         <div>
          <SimilarImagesComponent data={categoryList} />
         </div>
         </div>
        <div>
          <div>
          <ProductRatingComponent data={foodItem!} />
          </div>
          <div>
            <AddToCartComponent data={foodItem!} refresh={refresh} setRefresh={setRefresh}  />
          </div>
          <div>
            <ProductInfoComponent data={foodItem} />
          </div>
        </div>
        </div>
      </div>
      <div><Footer/></div>
      </div>
  )
}
