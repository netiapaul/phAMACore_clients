import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Navigate, useLocation } from 'react-router-dom'

const DefaultLayout = () => {
  const location = useLocation()
  const user = location.state?.user || JSON.parse(localStorage.getItem('authUser'))

  if (!user) return <Navigate to={'/'} />

  // console.log(user)
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
