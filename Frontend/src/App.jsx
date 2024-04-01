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
import ProjectsAdd from './pages/projects/projectsAdd'
import ProjectsEdit from './pages/projects/projectsEdit'

function App() {
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna />} />
        <Route path={RouteNames.PROJECT_VIEW} element={<Projects />} />
        <Route path={RouteNames.PROJECT_NEW} element={<ProjectsAdd />} />
        <Route path={RouteNames.PROJECT_EDIT} element={<ProjectsEdit />} />
      </Routes>
    </>
  )
}

export default App
