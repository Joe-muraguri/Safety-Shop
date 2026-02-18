import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage' 





function App() {
  

  return (
  
      <>
        <Routes>
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes> 
    </>
  )
}

export default App
