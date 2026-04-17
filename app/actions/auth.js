
"use server";

import { SignupFormSchema } from "@/lib/signup"
import { LoginFormSchema } from "@/lib/signin";
import axios from "axios";
import { z } from "zod";
 
export async function signup(state, formData) {
  const formDataObj = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    telephone: formData.get('telephone'),
    role: formData.get('role'),
  };

  const validatedFields = SignupFormSchema.safeParse(formDataObj);

  if (!validatedFields.success) {
    console.log('Validation errors:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const body = {
    full_name: validatedFields.data.name,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    telephone: validatedFields.data.telephone || '',
    role: validatedFields.data.role,
  };

  const url = 'http://127.0.0.1:5000/user/register';
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    console.log('Sending signup request with data:', {
      ...body,
    });
    
    const response = await axios.post(url, body, options);
    console.log('Signup response:', response.data);
    
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

export async function login(state, formData) {
  const formDataObj = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validatedFields = LoginFormSchema.safeParse(formDataObj);

  if (!validatedFields.success) {
    console.log('Validation errors:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const body = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const url = 'http://127.0.0.1:5000/user/login';
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    console.log('Sending login request for:', body.email);
    const response = await axios.post(url, body, options);
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

export async function logout() {
  return { success: 'Logged out successfully' };
}