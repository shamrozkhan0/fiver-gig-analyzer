import { BrowserRouter, Route, Routes } from "react-router-dom"
import Editor from "./components/ediitor.jsx"
import Signup from "./components/signup.jsx"
import Analyzer from './components/analyzer.jsx'
import Login from "./components/login.jsx"
import Auth from "./layouts/auth"

import './App.css'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/:user_id/:content_id" element={<Editor />} /> */}
          {/* <Route path="/" element={<Editor />} /> */}
          
          <Route path="/" element={<Analyzer />} />



          <Route element={<Auth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
