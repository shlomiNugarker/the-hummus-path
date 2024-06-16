import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'
import { HomePage } from './pages/home-page/HomePage'

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/signup" element={<SignupPage />} /> */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
