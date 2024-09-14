import React from 'react';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import './Auth.css';

function LoginForm({ onLogin }) {
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      username: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      // Simulate login
      onLogin(values);
    },
  });

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          className="auth-input"
        />
        {touched.username && errors.username && <p className="form-error">{errors.username}</p>}
        
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className="auth-input"
        />
        {touched.email && errors.email && <p className="form-error">{errors.email}</p>}
        
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
