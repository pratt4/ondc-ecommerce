/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import AuthContext from "../../../context/auth.context";
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = ({setIsLogin}) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const users = JSON.parse(localStorage.getItem("users") || "[]");
  
    const existingUser = users.find((user) => user.email === email);
  
    if (existingUser) {
      toast.warn("Email already in use");
    } else {
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("Account created successfully");
    }
  
    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container  '>
      
      <span className='text-xl font-bold'>Create an account here</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
      <p className="cursor-pointer"
      onClick={()=>setIsLogin((prev)=>!prev)}>Already have an account? Log in</p>
    </div>
  );
};

export default SignUpForm;