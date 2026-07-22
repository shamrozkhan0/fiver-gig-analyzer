import GigBroLogo from "../images/gigBro-logo.png"
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { useState } from "react";

const Signup = () => {
  const backendSignupURL = import.meta.env.VITE_BACKEND_URL + "signup"

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const {showNotification} = useNotification()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(backendSignupURL, {
        method: "post",
        headers:{
          "Content-Type" : "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
    })


    const data = await response.json()
    console.log(data)

    showNotification({
      success: data.success,
      message: data.message
    })

  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Logo badge - responsive, scales with the card */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-full bg-emerald-500 flex flex-col items-center justify-center text-white shrink-0">
            <img src={GigBroLogo} alt="" className="rounded-full" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 text-center mb-2">
          Join GigBro
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
          Create an account to start finding gigs and unlock all features.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-slate-800"
              >
                Username
              </label>
              <span className="text-xs text-gray-400">
                {form.username.length}/15
              </span>
            </div>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              maxLength={15}
              placeholder="Choose a username"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-800"
              >
                Email
              </label>
              <span className="text-xs text-gray-400">
                {form.email.length}/50
              </span>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              maxLength={50}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-800"
              >
                Password
              </label>
              <span className="text-xs text-gray-400">
                {form.password.length}/20
              </span>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              maxLength={20}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          {/* Link back to login */}
          <p className="text-right text-sm text-gray-500">
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/login")} className="cursor-pointer font-bold text-slate-800 hover:text-emerald-600">
              Login
            </button>
          </p>

          {/* Submit */}
          <button

            type="submit"
            
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl py-3 text-sm transition shadow-sm"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;