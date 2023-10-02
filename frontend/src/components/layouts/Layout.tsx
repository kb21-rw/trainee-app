import React, {useContext} from 'react'
import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { authContext } from '../../App'
import jwtDecode from "jwt-decode"
import { adminMenu,coachMenu } from '../../utils/data'

const Layout = () => {
  const cookies = new Cookies()
  const jwt = cookies.get("jwt")
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const {user, setUser} = useContext(authContext)
  
  useEffect(()=>{
    if(!jwt){
     return navigate(`/login?redirectTo=${pathname}`)
    }
   const userInfo = jwtDecode(jwt);
   setUser(userInfo)
  },[jwt])
  const menu = user?.role==="ADMIN"&&adminMenu || user?.role ==="COACH" &&coachMenu ||[]
  return (
    <div className='h-screen flex flex-col px-16 py-4 max-w-[1920px] mx-auto'>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center gap-20'>
          {menu.map((element, index) => <NavLink key={index} to={element.link} className={({ isActive }) => `whitespace-nowrap text-xl font-medium ${isActive ? "text-primary-dark" : "text-secondary-dark"}`} end>{element.title}</NavLink>)
          }

        </div>
        <div className='flex items-center gap-20'>
          {<NavLink to="/profile-settings" className={({ isActive }) => `whitespace-nowrap text-xl font-medium ${isActive ? "text-primary-dark" : "text-secondary-dark"}`}>{user?.name}</NavLink>}
          <button className='text-xl font-medium text-secondary-dark' onClick={()=>{cookies.remove("jwt"); setUser(null); navigate("/login")}}>logout</button>
        </div>
      </nav>
      <div className='flex-1'>
      <Outlet />
      </div>
    </div>
  )
}

export default Layout