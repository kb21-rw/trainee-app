import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
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
            { link: "/logout", title: "Logout" },
          ].map((element, index) => <NavLink key={index} to={element.link} className={({ isActive }) => `text-xl font-medium ${isActive ? "text-primary-dark" : "text-secondary-dark"}`}>{element.title}</NavLink>)
          }

        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout