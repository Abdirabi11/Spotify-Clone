import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import {axiosInstance} from '../lib/axios'
import { Loader } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";



const updateApiToken=async(token: string | null)=>{
    if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
}

const AuthProvider = ({children}: {children:React.ReactNode}) => {
    const {getToken, userId}= useAuth()
    const [loading, setLoading]= useState(true)
    const {checkAdminStatus }= useAuthStore()
    const {initSocket, disconnectSocket}= useChatStore()

    useEffect(()=>{
        const initAuth= async()=>{
            try {
                const token= await getToken()
                updateApiToken(token)

                if(token){
                    await checkAdminStatus()
                    //init socket
                    if(userId){
                        initSocket(userId)
                    }
                }
            } catch (error) {
                updateApiToken(null)
               console.log('Error in auth provider') 
            }finally{
                setLoading(false)
            }
        }

        initAuth()
        //clean up
        return ()=> disconnectSocket()
    },[getToken, userId, checkAdminStatus, initSocket, disconnectSocket])

    if(loading) return (
        <div className="h-screen w-full flex items-center justify-center">
           <Loader className="size-8 text-emarald-500 animate-spin"/>
        </div>
    ) 

  return (
    <div>{children}</div>
  )
}

export default AuthProvider