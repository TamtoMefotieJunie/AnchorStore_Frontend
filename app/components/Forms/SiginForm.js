'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import FormInput from "@/app/Components/Inputs/FormInput"; 
import { useState,useEffect } from "react";
import { useActionState } from 'react';
import { login } from '@/app/Actions/auth';
 

export default function SigninForm() {
  const router = useRouter();
 const [state, action, pending] = useActionState(login, null);
useEffect(() => {
    if (state?.success && state?.user) {
      const userData = state.user.user || state.user;
      const token = state.token || state.user.token;
      const userToStore = {
        id: userData._id,
        name: userData.Full_name,
        email: userData.email,
        role: userData.role,
        token: token
      };
      
      console.log('Storing user data:', userToStore);
      localStorage.setItem('user', JSON.stringify(userToStore));
      if (token) {
        localStorage.setItem('token', token);
      }
      const stored = localStorage.getItem('user');
      console.log('Verified stored user:', JSON.parse(stored));
      const role = userData.role;
      console.log('User role:', role);
      if (role === 'manager') {
        router.push('/Retailer');
      } else if (role === 'cashier') {
        router.push('../Cashier');
      } else {
        router.push('/Customer');
      }
    }
  }, [state, router]);
    const logOut = () => {
        localStorage.removeItem('user');
    }
  //  const handleSubmit= async (e) => {
  //   e.preventDefault();
  //   const form = e.target;  
  //   const body = {
  //     "email":form.email.value,
  //     "password":form.password.value
  //   }
  //   console.log("Form data:", body);

  //   const response = await fetch('http://127.0.0.1:5000/user/login', {
  //     method: 'POST',
  //     headers: {   
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   });
  //   const data = await response.json();
  //   console.log('Response:', data);
  //   if (response.ok) {
  //     alert("Signin successful! Redirecting...");
  //     router.push("/Cashier");
  //   } else {
  //     alert("Signin failed. Please check your credentials and try again.");
  //   }
  // }

  return (
    <div className="flex justify-center mt-25">
      <div style={{ minWidth: "30%" }}>
        <div className="flex min-h-full shadow-2xl flex-1 flex-col justify-center px-6 py-8  bg-white">
          <div className=" w-full">
            <div className="flex flex-col items-center justify-center">
              <Image src='/logo.png' width={210} height={150} alt='logo' />
              <h2 className="text-center text-2xl font-bold leading-3  text-gray-900">
              Sign In
              </h2>
            </div>
            
          </div>
          {state?.success && (<p className="text-green-500 text-sm text-center">{state.success}</p>)}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" action={action}>
                <FormInput
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                {state?.errors?.email && ( <p className="text-red-500 text-sm">{state.errors.email}</p>)}
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                />
                {state?.errors?.password && ( <p className="text-red-500 text-sm">{state.errors.password}</p>)}
              <div>
              <Button variant="filled" label="Sign In" />
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Do not have an account?{" "}
              <span
                onClick={() => {
                  router.push("/Auth/Signup");
                }}
                className="font-semibold leading-6 text-complementary hover:text-tertiary cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}