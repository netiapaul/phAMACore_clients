import React, { useState } from 'react'
import { useFormik } from 'formik'
import CompanyRight from '../../../assets/images/corebase.png'
import { AuthLoginUSer } from '../../../../utils/services/services_api'
import { AlertError } from '../../../UI/alerts/alert'
import { extractErrorMessages } from '../../../../utils/functions'
import { useNavigate } from 'react-router'

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less'
  }

  return errors
}

const Login = () => {
  //meta title
  document.title = 'Login | phAMACore'

  const navigate = useNavigate()

  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      setErrors([]) // Reset previous errors before submitting
      setIsLoading(true)
      AuthLoginUSer(values)
        .then((data) => {
          setIsLoading(false)
          navigate('/dashboard', { state: { user: data }, replace: true })
          localStorage.setItem('authUser', JSON.stringify(data))
        })
        .catch((err) => {
          const errorMessage = extractErrorMessages(err)
          setIsLoading(false)
          setErrors((prevErrors) => [...prevErrors, ...errorMessage])
        })
    },
  })
  return (
    <div className="container-fluid min-vh-100 login_page">
      <div className="row min-vh-100 align-items-center">
        <div className="col-md">
          <div className="card border-0">
            <div className="card-body d-grid col-md-10 col-12 col-lg-5 col-xl-4 mx-auto">
              <div className="mt-5 mb-3">
                <h2 className="mb-3">
                  <span className="company_text_color">phAMACore</span> &trade;
                </h2>
                <h5 className="mb-1">Welcome back!</h5>
                <p className="text-muted">Please enter your credentials to sign in!</p>
              </div>
              <div>
                {Boolean(errors.length) && <AlertError errors={errors} />}
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={`${formik.errors.email ? 'form-control is-invalid' : 'form-control'} `}
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.errors.email && (
                      <p className="m-0 text-danger">{formik.errors.email}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`${formik.errors.password ? 'form-control is-invalid' : 'form-control'} `}
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.errors.password && (
                      <p className="m-0 text-danger">{formik.errors.password}</p>
                    )}
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customControlInline"
                      disabled
                    />
                    <label className="form-check-label" htmlFor="customControlInline">
                      Remember me
                    </label>
                  </div>
                  <div className="d-grid gap-2 mb-3">
                    <button className="btn btn-sm login-btn" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        'Sign In '
                      )}
                    </button>
                  </div>
                  <p className="text-decoration-underline text-muted text-center">
                    Forgot password
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 min-vh-100 d-none d-xl-block login_asset"></div>
      </div>
      <footer id="footer">
        <div className="copy-right text-center my-2">
          <p className="m-0 company-sm">Powered by</p>
          <img width="15" className="img-fluid" src={CompanyRight} alt="company brand" />
          <p className="m-0 company-lg">CoreBase Solutions</p>
        </div>
      </footer>
    </div>
  )
}

export default Login
