import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Signin from './Components/SignIn/SignIn'
import Signup from './Components/SignUp/SignUp'



function App() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} exact/>
            <Route path='/signin' element={<Signin />} exact/>
            <Route path='/signup' element={<Signup />} exact/>
        </Routes>
    </div>
  )
}

export default App 