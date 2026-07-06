import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Analyzer = () => {
  const GET_RESPONSE_URL = import.meta.env.VITE_BACKEND_URL + "getanalytics"
  const {profile_id, content_id} = useParams()

  useEffect(()=>{
    try{
      const response = await fetch(GET_RESPONSE_URL, {
        credentials: "include",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          profile_id: profile_id,
          content_id = content_id
        })
      })

    

    }
    catch (error){
      console.error("Error:" + error)
    }
    

  }, [])


  return (
    <div>
      
    </div>
  )
}

export default Analyzer;