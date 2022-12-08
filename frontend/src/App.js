import React from 'react'
import { Routes, Route, BrowserRouter, Navigate  } from 'react-router-dom'
import { DataProvider } from './DataProvider'
import {First} from "./Pages/First";
import {Second} from "./Pages/Second";
import {Eredmenyek} from "./Pages/Eredmenyek";
import {AlmodoVisszamondo} from "./Pages/AlmodoVisszamondo";

import "./styles/styles.css"

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/Second" element={<Second />} />
          <Route path="/Eredmenyek" element={<Eredmenyek />} />
          <Route path="/Almodo" element={<AlmodoVisszamondo />} />
          <Route path="*" element={ <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App