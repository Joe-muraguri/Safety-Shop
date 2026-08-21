import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'





function App() {
  

  return (
  
      <>
        <Routes>
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route
        path="/about"
        element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        }
      />
          <Route
        path="/blog"
        element={
          <>
            <Navbar />
            <Blog />
            <Footer />
          </>
        }
      />
          <Route
        path="/blog/:slug"
        element={
          <>
            <Navbar />
            <BlogPost />
            <Footer />
          </>
        }
      />
          <Route path="/admin" element={<AdminPage />} />
        </Routes> 
    </>
  )
}

export default App
