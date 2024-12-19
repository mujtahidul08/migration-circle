import { apiURL } from "@/utils/baseurl"
import axios, { AxiosResponse } from 'axios'

export const getAllThreads = async (token:string) => {
  try{
    const res:AxiosResponse = await axios.get(apiURL + 'thread',{
      method:'GET',
      headers:{
          'Authorization':`Bearer ${token}`,
      }
    }) 
      console.log('result',res)
      return res.data.thread
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