import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home'



function App() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} exact/>
        </Routes>
    </div>
  )
}

export default App 