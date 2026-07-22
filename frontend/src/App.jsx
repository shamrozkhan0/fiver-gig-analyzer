import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Signup from "./components/Signup.jsx"
import Login from "./components/Login.jsx"
import Auth from "./pages/Auth.jsx"
import "./App.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>          
          <Route path="/" element={<LandingPage />} />
          <Route element={<Auth/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App;
