import Header from '../components/Header'
import { Link } from 'react-router-dom'
import AllMaps from '../components/AllMaps'

const Home = () => {
  return (
    <div>
        <Header />
        <Link to='/UploadMapPage' className="mr-10 rounded-lg bg-secondary w-32 h-8 items-center text-main justify-center flex justify-self-end">Upload map</Link>
        <AllMaps />
    </div>
  )
}

export default Home