import React from 'react';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import './Auth.css';

function SignUpForm({ onSwitch }) {
  const { values, handleBlur, handleChange, touched, errors, handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      username: Yup.string().required('Required'),
    }),
    onSubmit: async (values,actions) => {
      console.log('Sign-Up Form Data:', values);
      await new Promise((resolve) =>  setTimeout(resolve,1000));
      actions.resetForm();
    },
  });

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign Up</h2>

        <label>Username:</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          className="auth-input"
        />
        {touched.username && errors.username && <div className="form-error">{errors.username}</div>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className="auth-input"
        />
        {touched.email && errors.email ? (
          <div className="form-error">{errors.email}</div>
        ) : null}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className="auth-input"
        />
        {touched.password && errors.password ? (
          <div className="form-error">{errors.password}</div>
        ) : null}

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
          className="auth-input"
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <div className="form-error">{errors.confirmPassword}</div>
        ) : null}

        <button type="submit" className="auth-button">Sign Up</button>

        <p className="switch-form">
          Already have an account?{' '}
          <Link to="/login" className="switch-link">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
