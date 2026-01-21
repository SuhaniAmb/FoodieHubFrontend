import wallet from "../assets/rupeeswallet.png"
import user from "../assets/user.png"
import shopping from "../assets/shopping.png"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../Components/Storage/RootReducer"


export default function Header()
{

    const navigate=useNavigate()

    
    const cart=useSelector((state:RootState)=>state.cart)
    const totalItems=Object.keys(cart)



    return(
        <div className=" w-full h-[auto] flex mt-5 " >
            <div className="grid grid-cols-2 w-full mr-2" >
                <div className=" flex flex-col " >
                    <div className=" ml-5 text-black sm:text-[18px] text-[15px] font-normal " >HungerBuddy in</div>
                    <div className=" ml-5 text-black sm:text-[27px] text-[20px] font-bold whitespace-nowrap " >20 minutes</div>
                    <div className="flex" > 
                        <span className=" ml-5 text-black sm:text-[17px] text-[15px] font-bold " >Home</span>
                        <span className=" ml-2 text-black text-[20px] font-light " >-</span>
                        <span className=" ml-1 text-black sm:text-[18px] text-[15px] font-light whitespace-nowrap " >Jackie Thomas</span>
                    </div>
                </div>
                <div className=" flex justify-end items-center " >
                    { totalItems?.length==0?<></>:<>
                        <div className=" relative bg-red-500  w-5 h-5 rounded-full md:bottom-7 bottom-5 md:left-12 left-10 flex justify-center items-center " >
                            <div className=" text-white " >{totalItems?.length}</div>
                        </div>
                    </> }
                    <div  onClick={()=>navigate(`/cart`)} className=" obsolute cursor-pointer flex bg-[rgba(0,0,0,0.4)] rounded-full sm:w-[45px] sm:h-[45px] w-[35px] h-[35px] p-2 justify-center " >
                        <img src={shopping} width={30} height={20} />
                        </div>
                    <div className=" cursor-pointer flex m-3 bg-[rgba(0,0,0,0.4)] rounded-full sm:w-[45px] sm:h-[45px] w-[35px] h-[35px] p-2 justify-center relative " >
                        <img src={wallet} width={25} height={25} />
                        <div className="absolute sm:top-9 top-7 sm:h-4 h-3 sm:w-12 w-9 text-white sm:text-[11px] text-[9px] flex justify-center items-center bg-[#2d3436] rounded-lg font-bold " >&#8377;20</div>
                    </div>
                    <div className="cursor-pointer flex bg-[rgba(0,0,0,0.4)] rounded-full sm:w-[45px] sm:h-[45px] w-[35px] h-[35px] p-2 justify-center " >
                        <img src={user} width={30} height={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}