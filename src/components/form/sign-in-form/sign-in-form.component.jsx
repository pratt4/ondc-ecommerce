import { useContext, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import AuthContext from '../../../context/auth.context';

import { useNavigate } from "react-router-dom";



import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const {onLogin}=useContext(AuthContext);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const users = JSON.parse(localStorage.getItem("users") || "[]");
  
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
  
    if (user) {
      alert("Login successful");
      navigate('/');
      onLogin();
    } else {
      alert("Invalid Credentials");
    }
  
    resetFormFields();
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2 className='text-xl font-bold'>Already have an account?</h2>
      <span className='text-xl font-bold '>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google 
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;