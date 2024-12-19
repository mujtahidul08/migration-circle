
import { apiURL } from "@/utils/baseurl"

export const getAllUser = (token:string) => {
    fetch(apiURL + 'users',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`,
        }
      })
      .then((data)=>{
        console.log(data)
        if(data.status === 200)
        {return data.json()}
        else{
          throw new Error(data.statusText)
        }
      })
      .then((result)=>{
        console.log(result)
      })
      .catch((err)=>{
        console.error(err)
      })
    }