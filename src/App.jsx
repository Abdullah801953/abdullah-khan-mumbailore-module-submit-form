import React from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SubmitPage from './pages/SubmitPage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="min-h-screen p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-2xl font-bold mb-4">Welcome to MumbaiLore</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </>
            }
          />
          <Route path="/stories" />
          <Route path="/submit" element={<SubmitPage/>}/>
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
