import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Analyzer = () => {
    const navigate = useNavigate()
    const cookieURL = import.meta.env.VITE_BACKEND_URL + "me"

    useEffect(() => {
        async function checkToken() {
            await fetch(cookieURL, {
                method: "get",
                credentials: "include"
            }).then((res) => {
                if (!res.ok) {
                    navigate("/login")
                }

            }).catch(err => console.log(`Error: ${err}`))
        }
        checkToken()
    }, [navigate])

    return (
        <div>
            <h1>Fiver Gig Analyzer</h1>
        </div>
    )
}

export default Analyzer
