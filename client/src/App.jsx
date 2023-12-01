import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { About, Home, Login, Profile, Signup } from './pages/'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/about' element={ <About/>} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/signup' element={ <Signup/>} />
        <Route path='/profile' element={ <Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
