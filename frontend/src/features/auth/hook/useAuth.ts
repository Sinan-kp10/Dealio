import { useEffect } from "react"
import useAuthStore from "../stores/auth.store"
import { getCurrentUser } from "../services/auth.service"

function useAuth(){

    const setUser = useAuthStore((state)=> state.setUser)
    const clearAuth = useAuthStore((state) => state.clearAuth)
    const setLoading = useAuthStore((state) => state.setLoading)

    useEffect(()=>{

        const initilizeAuth = async() => {
            try {
                const response = await getCurrentUser()
                setUser(response.data.user)
                
            } catch {

                clearAuth()

            }finally{
                setLoading(false)
            }
        }

            
       void initilizeAuth()
    },[setUser,clearAuth,setLoading])
}

export default useAuth