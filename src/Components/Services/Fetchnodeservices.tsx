import axios ,{AxiosError } from "axios";
import Swal from "sweetalert2";

const serverURL='http://localhost:5000'



function generateOtp(){
    const otp=Math.floor(Math.random()*899999)+100000
    return otp
}


function getDate()
{
    const cd=new Date()
    return (`${cd.getFullYear()}/${cd.getMonth()+1}/${cd.getDate()}`)
}




function getTime()
{
    const cd=new Date()
    return (`${cd.getHours()}/${cd.getMinutes()}/${cd.getSeconds()}`)
}


async function postData(url:string,body:unknown)
{
    try
    {   
        //alert (localStorage.getItem('Token'))
        const config=
        {
            headers:
            {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }
        }
        const response=await axios.post(`${serverURL}/${url}`,body,config)
        const data=response.data
        return(data)
    }
    catch(e)
    {
        const error = e as AxiosError

        //alert(JSON.stringify(error.response))
        if(error.response?.status===401)
        {
           //Swal.fire({ position: "center", icon: "error", title:'Your session is expired......pls login', timer: 2000, toast: true }); 
           Swal.fire('Your session is expired......pls login')
        }
        else
        {
            //Swal.fire({ position: "center", icon: "error", title:"Site is not working proerly....ls wait for sometime", timer: 2000, toast: true });
            Swal.fire("Site is not working proerly....ls wait for sometime")
        }
        return([])
    }
}



async function getData(url:string)
{
    try
    {
        // alert (localStorage.getItem('Token'))
        const token = localStorage.getItem('Token');

        const config={
            headers:{
                'Content-Type':'application/json',
                'Authorization': token ? `Bearer ${token}` : ""
            }
        }
        const response=await axios.get(`${serverURL}/${url}`,config)
        const data=response.data
        return(data)
    }
    catch(e)
    {
        const error=e as AxiosError
        //alert(JSON.stringify(e.response))
        if(error.response?.status===401)
        {
            Swal.fire('Your session is expired...pls login')
        }
        else
        {
            Swal.fire("Site is not working properly....Pls wait for sometime")
        }
        return([])
    }
}
export {postData,serverURL,getDate,getTime,getData, generateOtp}