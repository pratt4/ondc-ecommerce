import React from 'react'
import SignInForm from '../form/sign-in-form/sign-in-form.component'
import SignUpForm from '../form/sign-up-form/sign-up-form.component'
import "./authentication.styles.scss"

export default function Authentication() {
  return (
    <div className="authentication-container">

    <SignInForm/>
    <SignUpForm/>
    </div>
    
  )
}
