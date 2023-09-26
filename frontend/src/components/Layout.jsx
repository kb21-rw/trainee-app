import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Layout = () => {
  const cookies = new Cookies()
  const jwt = cookies.get("jwt")
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  useEffect(()=>{
    if(!jwt){
      navigate(`/login?redirectTo=${pathname}`)
    
    }
  },[jwt])
  return (
    <div className='px-8 py-4 max-w-[1920px] mx-auto'>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center gap-20'>
          {[
            { link: "/", title: "Overview" },
            { link: "/forms", title: "Forms" },
            { link: "/trainees", title: "Trainees" },
            { link: "/administer-coach", title: "Administer coach" },
          ].map((element, index) => <NavLink key={index} to={element.link} className={({ isActive }) => `text-xl font-medium ${isActive ? "text-primary-dark" : "text-secondary-dark"}`} end>{element.title}</NavLink>)
          }

        </div>
        <div className='flex items-center gap-20'>
          {[
            { link: "/profile-settings", title: "John Doe" },
          ].map((element, index) => <NavLink key={index} to={element.link} className={({ isActive }) => `text-xl font-medium ${isActive ? "text-primary-dark" : "text-secondary-dark"}`}>{element.title}</NavLink>)
          }
          <button className='text-xl font-medium text-secondary-dark' onClick={()=>{cookies.remove("jwt"); navigate("/login")}}>logout</button>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout