import { apiURL } from "@/utils/baseurl"
import axios, { AxiosResponse } from 'axios'
import { LoginFromProps } from "../types/authTypes"

export const fetchLogin = async (data:LoginFromProps) => {
  try{
    const res:AxiosResponse = await axios.post(apiURL + 'auth/login',data, {
      headers:{
        'Content-Type' : "application/json"
      }
    }) 

      console.log('result',res)
      return res.data
      }

      catch (error){
        if(axios.isAxiosError(error)){
          console.error('axios error',error.response?.data||error.message)
          throw new Error(error.response?.data?.message||'something went wrong')
        }else{
          console.error('unexpected error:',error)
          throw error
        }
      }
    }