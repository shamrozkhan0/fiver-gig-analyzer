import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

const Editor = () => {
    const navigate = useNavigate()
    const cookieURL = import.meta.env.VITE_BACKEND_URL + "me"
    const fetchContentURL = import.meta.env.VITE_BACKEND_URL + "getcontent"

    const textareaRef = useRef()

    const { user_id, content_id } = useParams();
    const [isScrapped, setIsScrapped] = useState()
    const [contentLength, setContentLength] = useState()

    const [content, setContent] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    useEffect(() => {
        async function init() {

            const isLogin = await fetch(cookieURL, {
                credentials: "include"
            })

             if (!isLogin.ok) {
                navigate("/login")
                console.log("not login")
                return;
            }
            console.log("user is login")

            const getContent = async () => {
                const response = await fetch(fetchContentURL, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: user_id,
                        content_id: content_id
                    })
                })
                return response
            }


            let response = await getContent()
            let data = await response.json()
            if (!data.success) {
                console.log(data.message)
                return 
            }

            let finalContent = Object.entries(data.message).map((key, val)=> `${key.toString().replace(",",": ")} ${val}`).join("\n\n")
            console.log(finalContent)
            setContent(finalContent)
        }

        init()
    }, [navigate, user_id, content_id])

    const handleAnalyze = () => {
        setIsAnalyzing(true)
        // Hook up to your analyze endpoint here
        setTimeout(() => setIsAnalyzing(false), 1200)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 px-6 py-10">
            {/* Logo */}
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-2xl font-bold tracking-tight">
                    <span className="text-emerald-500">Gig</span>
                    <span className="text-slate-900">Bro</span>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-slate-100 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-slate-900">Scraped Content</h1>
                        <p className="mt-2 text-slate-500">Review and edit the scraped content before analysis</p>
                    </div>

                    {/* Textarea panel */}
                    <div className="rounded-xl border border-emerald-300 bg-white p-5">
                        <label className="mb-3 block text-sm font-semibold text-emerald-600">
                            Gig Content
                        </label>
                        <textarea
                            ref={textareaRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={7}
                            className="w-full resize-y text-slate-700 leading-7 placeholder:text-slate-400 focus:outline-none"
                            placeholder="Use GigBro extension to directly scrape your Gig content"
                        />
                    </div>

                    {/* Status row */}
                    <div className="mt-4 flex items-center justify-between border-b border-slate-100 pb-6 text-sm">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <CheckCircleIcon className="h-4 w-4" />
                            <span>Content scraped successfully</span>
                        </div>
                        <span className="font-medium text-emerald-600">
                            {content.length} characters
                        </span>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center pt-6">
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || content.length === 0}
                            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <SparkleIcon className="h-4 w-4" />
                            {isAnalyzing ? "Analyzing..." : "Analyze Content"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CheckCircleIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 12.5l2.2 2.2 4.8-5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const CrossIcon = ({ className }) => {
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M6 6L18 18M18 6L6 18" />
    </svg>
}

const SparkleIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" />
        <path d="M19 14l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" opacity="0.7" />
    </svg>
)

export default Editor