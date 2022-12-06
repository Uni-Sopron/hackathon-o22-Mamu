import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { DataProvider } from './DataProvider'
import {First} from "./Pages/First";
import {Second} from "./Pages/Second";

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/Second" element={<Second />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App