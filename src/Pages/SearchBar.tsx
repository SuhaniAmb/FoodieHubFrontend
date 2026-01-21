import search from "../assets/search.png"


export default function SearchBar()
{

    return(
        <div className="w-full flex justify-center mt-7 " >
           <div className=" w-full lg:mx-64 mx-10 flex justify-center items-center sm:h-12 h-10 border rounded-xl border-black " >
           <img src={search} width={25} className="sm:m-5 m-2 " />
           <input type="text" placeholder='Search "diaper xxl" ' className="w-full border-none outline-none flex sm:text-[21px] text-[18px] placeholder:text-gray-600 font-medium " />
           
           </div>
        </div>
    )
}