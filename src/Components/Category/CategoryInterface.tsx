import { CloudUpload, Save, Trash2 } from "lucide-react";
import burger from "../../assets/burger.png";
import { useEffect, useState } from "react";
import { getData, getDate, getTime, postData } from "../Services/Fetchnodeservices";
import Swal from "sweetalert2";

interface DisplayAllCategoryProps {
  refresh: boolean; // or whatever type your state uses
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Category({refresh,setRefresh}:DisplayAllCategoryProps) {
  const [branchId, setBranchId] = useState("");
  const [branchIdList, setBranchIdList] = useState<{ branchid:number, branchname:string }[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState<{ bytes: File | null; fileName: string;}>({bytes: null,fileName: burger});

  const handleClick = async () => {
    const formData = new FormData();

    formData.append("branchid", branchId);
    formData.append("categoryname", categoryName);
    if (categoryIcon.bytes) {
      formData.append("categoryicon", categoryIcon.bytes);
    }
    formData.append("createddate", getDate());
    formData.append("createdtime", getTime());
    formData.append("userid", "xxxx");

    const response = await postData("category/submit_category", formData);

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
      setCategoryIcon({ bytes: file, fileName: URL.createObjectURL(file)});
    }
  };


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

  return (
    <div className="w-[100%] h-auto flex justify-center">
      <div className="w-[80%] border border-[hsla(321,41%,24%,1)] rounded-[5px] flex flex-col ">
        <div className="w-full rounded-t-[5px] bg-[linear-gradient(90deg,hsla(321,41%,24%,1)_0%,hsla(330,53%,77%,1)_100%)]">
          <div className="flex font-quicksand flex-col px-1 w-[30%] py-2.5">
            <div className="font-bold text-[24px] text-white">FoodieHub</div>
            <div className="font-[700] text-[16px] text-white">New Food Category</div>
          </div>
        </div>
        <div className="flex p-4 w-full items-center justify-between flex-wrap">
          <div className="relative w-[25%] ">
            <select id="branchid" onChange={(e)=>setBranchId(e.target.value)} className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent " defaultValue="" >
                <option value="" disabled hidden></option>
                {fillBranch()}
            </select>
              <label htmlFor="branchid" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Branch</label>
          </div>
          <div className="relative w-[25%] ">
            <input onChange={(e) => setCategoryName(e.target.value)} type="text" id="categoryname" placeholder=" " className="peer w-full border border-gray-600 text-gray-900 bg-white rounded-md px-3 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent" />
            <label htmlFor="categoryname" className="absolute left-3 top-2 text-sm text-gray-500 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500" >Category Name</label>
          </div>
          <div className="relative ">
            <img src={categoryIcon.fileName} alt="Category Icon Preview" className="w-[40px]" />
          </div>
          <label htmlFor="categoryicon" className="flex flex-col items-center text-[hsla(321,32%,37%,1)] cursor-pointer">
            <CloudUpload className="h-9 w-9 flex" />
            <span className="text-xs">Upload</span>
            <input type="file" id="categoryicon" onChange={handleChange} hidden accept="image/*" />
          </label>
          <div className="flex flex-col items-center cursor-pointer text-[hsla(321,32%,37%,1)] " onClick={handleClick}>
            <Save id="saveIcon" className="h-9 w-9 text-[#692c55]" />
            <span className="text-xs">Save</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer  text-[hsla(321,32%,37%,1)] ">
            <Trash2 id="trashIcon" className="h-9 w-9 text-[#692c55]" />
            <span className="text-xs">Clear</span>
          </div>
        </div>
      </div>
    </div>
  );
}
