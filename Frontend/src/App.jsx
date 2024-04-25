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

import Printers from './pages/printers/printers'
import PrintersAdd from './pages/printers/printersAdd'
import PrintersEdit from './pages/printers/printersEdit'

import Resins from './pages/resins/resins'
import ResinsAdd from './pages/resins/resinsAdd'
import ResinsEdit from './pages/resins/resinsEdit'

import Parts from './pages/parts/parts'
import PartsAdd from './pages/parts/partsAdd'
import PartsEdit from './pages/parts/partsEdit'

import ErrorModal from './components/ErrorModal';
import useError from "./hooks/useError"

function App() {

  const { errors, prikaziErrorModal, sakrijError } = useError();

  return (
    <>
      <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
      <NavBar />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna />} />

        <Route path={RouteNames.PROJECT_VIEW} element={<Projects />} />
        <Route path={RouteNames.PROJECT_NEW} element={<ProjectsAdd />} />
        <Route path={RouteNames.PROJECT_EDIT} element={<ProjectsEdit />} />

        <Route path={RouteNames.PRINTER_VIEW} element={<Printers />} />
        <Route path={RouteNames.PRINTER_NEW} element={<PrintersAdd />} />
        <Route path={RouteNames.PRINTER_EDIT} element={<PrintersEdit />} />

        <Route path={RouteNames.RESIN_VIEW} element={<Resins />} />
        <Route path={RouteNames.RESIN_NEW} element={<ResinsAdd />} />
        <Route path={RouteNames.RESIN_EDIT} element={<ResinsEdit />} />

        <Route path={RouteNames.PART_VIEW} element={<Parts />} />
        <Route path={RouteNames.PART_NEW} element={<PartsAdd />} />
        <Route path={RouteNames.PART_EDIT} element={<PartsEdit />} />
      </Routes>
    </>
  )
}

export default App
