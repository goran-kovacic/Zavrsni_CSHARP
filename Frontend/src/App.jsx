import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/pocetna'
import Projects from './pages/projects/projects'

function App() {
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna />} />
        <Route path={RouteNames.PROJECT_VIEW} element={<Projects />} />
      </Routes>
    </>
  )
}

export default App
