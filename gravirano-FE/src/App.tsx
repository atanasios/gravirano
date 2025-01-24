import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UploadMap from './components/UploadMap'
import Home from './pages/Home'
import SingleMapPage from './pages/SingleMapPage'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploadMapPage" element={<UploadMap />} />
          <Route path="/map/:id" element={<SingleMapPage />} />
        </Routes>
    </Router>
  )
}

export default App