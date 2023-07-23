import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import { Calendar } from './components/Calendar'
import { CreateShift } from './components/CreateShift'
import { UpdateShift } from './components/UpdateShift'
import axios from 'axios'
import { CsrfToken } from './types'

function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/create-shift" element={<CreateShift />} />
        <Route path="/update-shift" element={<UpdateShift />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
