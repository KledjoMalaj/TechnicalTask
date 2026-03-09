import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {

  return (
    <>
      <div>
          <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/homepage" element={<HomePage/>} />
          </Routes>
      </div>
    </>
  )
}

export default App
