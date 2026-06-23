import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Analyzer = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("gigbro_token")

        if (!token) {
            console.log("token not found")
            navigate("/login")
        }

    }, [navigate])

    return (
        <div>
            <h1>Fiver Gig Analyzer</h1>
        </div>
    )
}

export default Analyzer
