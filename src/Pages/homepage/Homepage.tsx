import CategoryComponent from "../CategoryComponent"
import SnacksComponent from "../SnacksComponent"
import Header from "../Header"
import SearchBar from "../SearchBar"
import { useEffect, useState, useRef } from "react"
import { getData, postData } from "../../Components/Services/Fetchnodeservices"
import SouthIndianComponent from "../SouthIndianComponent"
import DrinksComponent from "../DrinksComponent"
import FoodItemCard from "../FoodItemCard"
import AdvertisementComponent from "../AdvertisementComponent"
import Footer from "../Footer"




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


export default function Homepage()
{
  
  const [categoryList,setCategoryList]=useState([])
  const [snacksList, setSnacksList]=useState<FoodItem[]>([])
  const [drinksList, setDrinksList]=useState<FoodItem[]>([])
  const [southindianList, setSouthindianList]=useState<FoodItem[]>([])
  const [foodList, setFoodList]=useState<FoodItem[]>([])

  const aboutRef=useRef(null)
  
   
    const fetchAllFood=async(cn:string)=>{
        const response=await postData('users/fetch_all_fooditems_by_category',{categoryname:cn})
        if(cn=='Snacks')
        {
            setSnacksList(response.data)
        }
        else if(cn=='Drinks')
        {
            setDrinksList(response.data)
        }
        else if(cn=='South Indian')
        {
            setSouthindianList(response.data)
        }

    }



  const fetchAllCategory=async()=>{
    const response=await getData('users/fetch_all_category')
    setCategoryList(response.data)
  }

  useEffect(function(){
    fetchAllCategory()
    fetchAllFood("Snacks")
    fetchAllFood("Drinks")
    fetchAllFood("South Indian")
    fetchAllFoodItems()
  },[])


    
    const fetchAllFoodItems=async()=>{
        const response=await getData('users/fetch_all_fooditems')
            setFoodList(response.data)
    }



  return(

  <div className=" w-full  flex flex-col top-[50px] " >
      <div>
        <Header/>
      </div>
      <div>
        <SearchBar/>
      </div>
      <div>
        <CategoryComponent data={categoryList} dataRef={aboutRef} foodList={foodList} setFoodList={setFoodList} />
      </div>
      <div>
        <SnacksComponent data={snacksList} />
      </div>
      <div>
        <DrinksComponent data={drinksList} />
      </div>
      <div>
        <SouthIndianComponent data={southindianList} />
      </div>
      <div ref={aboutRef} >
        <FoodItemCard data={foodList} />
      </div>
      <div>
        <AdvertisementComponent/>
      </div>
      <div>
        <Footer/>
      </div>
  </div>

  )
}