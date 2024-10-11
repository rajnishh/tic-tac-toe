import React from 'react';
import { TextField, Button, Typography, Box, Link, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';  // Import the loginUser action
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);  // Get loading and error from Redux state

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),

    onSubmit: (values) => {
      dispatch(loginUser(values.email, values.password)).then(() => {
        navigate('/');  // Navigate to home on successful login
      });
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
          Login
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

        {error && (
          <Typography color="error" variant="body2" mt={2}>
            {error}
          </Typography>
        )}

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
          disabled={loading}  // Disable the button when loading
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
        <Link
          href="#"
          variant="body2"
          onClick={() => navigate('/register')}
          sx={{ mt: 2, display: 'block' }}
        >
          Don't have an account? Register here
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
