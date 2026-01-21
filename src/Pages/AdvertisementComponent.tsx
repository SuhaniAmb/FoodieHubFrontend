import React, { useState } from 'react'
import starbucks from '../assets/starbucks.png'

export default function AdvertisementComponent() {

  const [hovered, setHovered]=useState(false)

  return (
    <div className='my-10 lg:px-20 md:flex w-full ' >
      <div className=' w-full bg-[#fcb4b4] flex justify-center items-center ' >
        <img src={starbucks} className=' w-full  object-contain ' />
      </div>
      <div className=' w-fit flex justify-center bg-[#421212] sm:py-24 py-3 items-center ' >
        <div className=' h-fit sm:mt-[30px] xl:mt-[0px]  text-white ' >
            <div className=' sm:text-lg md:text-lg lg:text-xl xl:text-2xl pt-6 font-bold  flex justify-center items-end ' >Your free cup of cheer</div>
            <div className=' mt-12 sm:text-lg md:text-lg lg:text-xl xl:text-xl font-600 flex justify-center lg:px-26 px-12 ' >
              Celebrate the season with a free handcrafted drink with purchase. It’s our gift to you during your first week as a Starbucks® Rewards member.*
            </div>
            <div className='flex justify-center' >
            <div className={` sm:text-lg ${hovered?"bg-[#250a0a]":"bg-[#421212]"} cursor-pointer md:text-lg lg:text-xl xl:text-xl font-bold inline-block mt-10 py-2 px-6 rounded-full border-2 border-white `} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} >join now</div>
            </div>


            </div>
        </div>
    </div>
  )
}
