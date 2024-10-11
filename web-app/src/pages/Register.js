import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authApiService';  // Import the service

const Register = () => {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await registerUser(values);  // Use the service
        navigate('/login');  // Redirect to login on successful registration
      } catch (error) {
        setServerError(error.message || 'Registration failed. Try again.');
      }
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.paper"
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        width={300}
        bgcolor="white"
        p={3}
        borderRadius={2}
        boxShadow={3}
        textAlign="center"
      >
        <Typography variant="h4" color="primary" mb={2}>
          Register
        </Typography>

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        {serverError && (
          <Typography color="error" variant="body2">
            {serverError}
          </Typography>
        )}

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Register
        </Button>

        <Link
          href="#"
          variant="body2"
          onClick={() => navigate('/login')}
          sx={{ mt: 2, display: 'block' }}
        >
          Already have an account? Login here
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
