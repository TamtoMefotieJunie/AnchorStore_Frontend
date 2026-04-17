import axios from "axios"

const url = 'http://127.0.0.1:5000';
const options = {
    headers: {
        'Content-Type': 'application/json',
    },
};
export const getUser = async (userId: string) => {
    const response = await axios.get(`/api/users/${userId}`)
    return response.data
}
export const createUser = async (userData: any) => {
    try{
        const response = await axios.post(`${url}/user/register`, userData, options)
        return {
            success: 'Account created successfully! Please sign in.',
            data: response.data,
        };
    } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("RESPONSE DATA:", error.response?.data);
        
    if (error.response?.data?.message) {
      const errorMessage = error.response.data.message;
      if (errorMessage.includes('email') || errorMessage.includes('Email')) {
        return {
          errors: {
            email: [errorMessage],
          },
        };
      } else if (errorMessage.includes('phone') || errorMessage.includes('Telephone')) {
        return {
          errors: {
            telephone: [errorMessage],
          },
        };
      } else if (errorMessage.includes('password') || errorMessage.includes('Password')) {
        return {
          errors: {
            password: [errorMessage],
          },
        };
      }
    }  
    return {
      errors: {
        name: [],
        email: [error.response?.data?.message || 'Signup failed. Please try again.'],
        password: [],
        confirmPassword: [],
        telephone: [],
        role: [],
      },
    };
  }
}
export const loginUser = async (credentials: any) => {
    try {
        console.log('Sending login request for:', credentials.email);
        const response = await axios.post(`${url}/user/login`, credentials, options);
        console.log('Login response:', response.data);
        return {
          success: 'Login successful!',
          user:  response.data,
          token: response.data.token,
        };
      } catch (error) {
        console.error('Login error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        
        const errorData = error.response?.data;
        
        return {
          errors: {
            email: [errorData?.message || errorData?.error || 'Invalid email or password'],
          },
        };
      }
}
