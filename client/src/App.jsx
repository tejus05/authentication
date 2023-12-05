import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { About, Home, Login, Profile, Signup } from './pages/'
import {Footer, Header} from './components'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <BrowserRouter>
    {/* Header Component */}
    <Header/>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/about' element={ <About/>} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/signup' element={ <Signup/>} />
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={ <Profile/>} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
