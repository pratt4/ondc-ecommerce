import React,{useState} from 'react'
import SignInForm from '../form/sign-in-form/sign-in-form.component'
import SignUpForm from '../form/sign-up-form/sign-up-form.component'
import "./authentication.styles.scss"

export default function Authentication() {

  const [isLogin,setIsLogin]=useState(true);
  return (
    <div className="authentication-container">
      {
        isLogin?<SignInForm setIsLogin={setIsLogin}/>:<SignUpForm setIsLogin={setIsLogin}/>
      }
      
    </div>
    
  )
}
