import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage.jsx"
import CreatePage from "./Pages/CreatePage.jsx"
import Navbar from "./RComponents/Navbar.jsx"
import { useColorModeValue } from "./components/ui/color-mode.jsx"
import { Toaster, toaster } from "@/components/ui/toaster"

function App() {

  return (
    <>
      <Box minH={"100vh"} >
        <Toaster />
        <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/create" element={<CreatePage/>}/>
              
            </Routes>
      </Box>
    </>
  )

}

export default App
