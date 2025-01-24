import logo from "../assets/Gravirano-Logo.png"
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div className='bg-main w-full h-24 flex items-center text-center align-center justify-center'>
        <Link to="/"><div><img src={logo} alt="" className='w-52 h-16'/></div></Link>
    </div>
  )
}

export default Header