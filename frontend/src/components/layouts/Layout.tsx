import React from 'react'
import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { adminMenu,coachMenu } from '../../utils/data'
import { useGetProfileQuery } from '../../features/user/apiSlice'

const Layout = () => {
  const cookies = new Cookies()
  const jwt = cookies.get("jwt")
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  
  useEffect(()=>{
    if(!jwt){
     return navigate(`/login?redirectTo=${pathname}`)
    }
  },[jwt])
  const {data} = useGetProfileQuery(jwt);
  const menu = data?.role==="ADMIN"&&adminMenu || data?.role ==="COACH" &&coachMenu ||[]
  return (
    <div className='h-screen flex flex-col px-16 py-4 max-w-[1920px] mx-auto'>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center gap-20'>
          {menu.map((element, index) => <NavLink key={index} to={element.link} className={({ isActive }) => `whitespace-nowrap text-xl font-medium ${isActive ? "text-primary-dark" : "text-secondary-dark"}`} end>{element.title}</NavLink>)
          }

        </div>
        <div className='flex items-center gap-20'>
          {<NavLink to="/profile-settings" className={({ isActive }) => `whitespace-nowrap text-xl font-medium ${isActive ? "text-primary-dark" : "text-secondary-dark"}`}>{data?.name}</NavLink>}
          <button className='text-xl font-medium text-secondary-dark' onClick={()=>{cookies.remove("jwt"); navigate("/login")}}>logout</button>
        </div>
      </nav>
      <div className='flex-1'>
      <Outlet />
      </div>
    </div>
  )
}

export default Layout