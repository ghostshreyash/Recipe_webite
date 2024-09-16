import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import './Auth.css';

function SignupForm() {
  const [usernameTaken, setUsernameTaken] = useState(false);

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      username: Yup.string().required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    }),
    onSubmit: (values) => {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const isUsernameTaken = existingUsers.some(user => user.username === values.username);

      if (isUsernameTaken) {
        setUsernameTaken(true);
      } else {
        const newUser = { username: values.username, email: values.email, password: values.password };
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        alert('Sign up successful! You can now log in.');
      }
    }
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
        {touched.username && errors.username && <p className="form-error">{errors.username}</p>}
        {usernameTaken && <p className="form-error">Username is already taken</p>}

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

        <button type="submit" className="auth-button">Sign Up</button>
      
        <p className="switch-form">
          Already have an account?{' '}
          <Link to="/login" className="switch-link">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
