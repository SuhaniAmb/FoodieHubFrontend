import { serverURL } from "../../Components/Services/Fetchnodeservices"

type Image={
  picture:string
  fooditemtype:string
  rating:string
  fooditemname:string
}

type ImageProps={
  data:Image
}

export default function ProductImageComponent({data}:ImageProps) {
  
  

  return (
    <div className="w-full overflow-x-hidden " >
      <div>
      <img src={`${serverURL}/images/${data?.picture}`} className=" sm:px-24 sm:py-8 md:pt-16 md:pb-5 md:px-10 px-2 py-2 w-full " />
      </div>
    </div>
  )
}
