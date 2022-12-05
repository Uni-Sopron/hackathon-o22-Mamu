import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { DataProvider } from './DataProvider'
import {First} from "./Pages/First";

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<First />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App