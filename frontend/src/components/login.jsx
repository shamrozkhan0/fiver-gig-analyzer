import logo from "../../images/gigBro-logo.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Login = () => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const logniURL = import.meta.env.VITE_BACKEND_URL + "login"
  const navigate = useNavigate()

  const submitForm = async (e) => {
    e.preventDefault()

    await fetch(logniURL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Card */}
      <div className="w-[380px] bg-white rounded-2xl shadow-xl p-6 border border-gray-200">

        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full  flex items-center justify-center shadow-md">
            <img src={logo} alt="GigBro login" className="rounded-full" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Welcome to GigBro
          </h1>

          <p className="text-sm text-gray-500 text-center mt-2">
            Looks like you are not logged in. Please login to continue and access all features.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitForm} className="mt-6 space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 "
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot + Signup */}
          <div className="flex justify-end items-center text-sm">
            {/* <a href="#" className="text-green-600 hover:under    line">
              Forgot password?
            </a> */}

            <a href="/signup" className="text-gray-600 hover:text-green-600">
              Don't have an account? <b>Signup</b>
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-fiver-green hover:bg-red-500 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login