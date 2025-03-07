import React from 'react'
// import CompanyRight from '../assets/images/corebase.png'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4 mt-2">
      <div>
        <span>phAMAcore</span>
        <span className="ms-1">&copy; {new Date().getFullYear()}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        {/* <img width="15" className="img-fluid" src={CompanyRight} alt="company brand" /> */}
        <a
          href="corebase.co.ke"
          target="_blank"
          rel="noopener noreferrer"
          className="company-color"
        >
          Corebase Solutions
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
