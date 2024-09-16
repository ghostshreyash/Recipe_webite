import React from 'react';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import './Auth.css';

function LoginForm({ onLogin }) {
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: ''
    },
    validationSchema: Yup.object({
      emailOrUsername: Yup.string().required('Username or Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    }),
    onSubmit: (values) => {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      const matchedUser = existingUsers.find(user => 
        (user.username === values.emailOrUsername || user.email === values.emailOrUsername) &&
        user.password === values.password
      );

      if (matchedUser) {
        onLogin(matchedUser);
      } else {
        alert('Invalid credentials');
      }
    },
  });

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <label>Email or Username:</label>
        <input
          type="text"
          name="emailOrUsername"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emailOrUsername}
          className="auth-input"
        />
        {touched.emailOrUsername && errors.emailOrUsername && <p className="form-error">{errors.emailOrUsername}</p>}
        
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className="auth-input"
        />
        {touched.password && errors.password && <p className="form-error">{errors.password}</p>}

        <button type="submit" className="auth-button">Login</button>

        <p className="switch-form">
          Don't have an account?{' '}
          <Link to='/signup' className="switch-link">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
