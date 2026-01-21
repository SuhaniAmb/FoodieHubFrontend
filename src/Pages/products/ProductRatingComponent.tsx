import { FaStar } from 'react-icons/fa';
import { useState } from 'react';




type Food={
  picture:string
  fooditemtype:string
  rating:string
  fooditemname:string
  categoryname:string
  fullprice:number
  offerprice:number
}

type FoodProps={
  data:Food
}


export default function ProductRatingComponent({data}:FoodProps)
{
  
  const [rating, setRating] = useState(5);
  
  return (
    <div>
    <div className="flex space-x-3 sm:ml-0 ml-2 sm:mt-10   ">
      <div className="flex space-x-1 sm:mt-5 mt-3 ">
      {[1,2,3,4,5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-50'}`}
          onClick={() => setRating(star)}
        />
      ))}
      </div>
      <div  className=" text-black sm:mt-4  mt-3 sm:text-[18px] text-[15px]  sm:ml-0 ml-4" > {data?.rating}</div>
    </div>
<div className=' sm:ml-0 ml-2 mb-5' >
      <div className=' sm:text-gray-400 text-black text-[15px] mt-2 ' >{data?.categoryname}</div>
      <div className=' text-black sm:text-3xl text-2xl font-bold mt-2 ' >{data?.fooditemname}</div>
      <div className='flex' >
        {data?.offerprice ==0?<><div className=' text-black sm:text-3xl text-2xl font-bold mt-2 ' >₹{data?.fullprice}</div></>:<><div className=' text-black sm:text-3xl text-2xl font-bold mt-2 ' >₹{data?.offerprice}</div><s className=' text-black ml-4 sm:text-3xl text-2xl font-bold mt-2 ' >₹{data?.fullprice}</s></>} </div>
      <div className=' text-gray-400 sm:text-[14px] text-[12px] mt-3 ' >Tax include. Shipping calculated at checkout.</div>
      <div className=' text-gray-500 sm:text-[22px] text-[14px] mt-3 mr-6 ' >The snack that’s always invited to the party! Lightly peppered, just a hint of mint, and crunchy—Aloo Sev makes everything better, from chai time to movie night.</div>
</div>


    </div>
  );
}
