import React from 'react'

export const AlertError = ({ errors }) => {
  return (
    <div className="alert alert-danger p-2" role="alert">
      <span className="fw-semibold">Error/s with your submission</span>
      <ul className="m-0">
        {errors.map((err, index) => (
          <li className="p-1" key={index}>
            {err}
          </li>
        ))}
      </ul>
    </div>
  )
}
