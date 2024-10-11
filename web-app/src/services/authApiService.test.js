// authApiService.test.js
import axios from 'axios';
import { registerUser, loginUser } from './authApiService'; // Assuming the service is in the same folder

// Mock the axios module
jest.mock('axios');

describe('Auth API Service', () => {
  
  // Test case for registerUser success
  it('should register a user successfully', async () => {
    const mockUserData = { email: 'test@example.com', password: 'password' };
    const mockResponse = { data: { message: 'User registered successfully' } };

    axios.post.mockResolvedValue(mockResponse);  // Mock the axios post call

    const result = await registerUser(mockUserData);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/auth/register'), mockUserData);
    expect(result).toEqual(mockResponse.data);
  });

  // Test case for registerUser error
  it('should handle an error during user registration', async () => {
    const mockUserData = { email: 'test@example.com', password: 'password' };
    const mockError = { response: { data: { error: 'User registration failed' } } };

    axios.post.mockRejectedValue(mockError);  // Mock the axios post call to reject

    await expect(registerUser(mockUserData)).rejects.toEqual(mockError.response.data);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/auth/register'), mockUserData);
  });

  // Test case for loginUser success
  it('should log in a user successfully', async () => {
    const mockUserData = { email: 'test@example.com', password: 'password' };
    const mockResponse = { data: { token: 'mock-jwt-token' } };

    axios.post.mockResolvedValue(mockResponse);  // Mock the axios post call

    const result = await loginUser(mockUserData);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/auth/login'), mockUserData);
    expect(result).toEqual(mockResponse.data);
  });

  // Test case for loginUser error
  it('should handle an error during user login', async () => {
    const mockUserData = { email: 'test@example.com', password: 'password' };
    const mockError = { response: { data: { error: 'Login failed' } } };

    axios.post.mockRejectedValue(mockError);  // Mock the axios post call to reject

    await expect(loginUser(mockUserData)).rejects.toEqual(mockError.response.data);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/auth/login'), mockUserData);
  });
});
