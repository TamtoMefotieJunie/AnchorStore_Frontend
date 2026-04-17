'use client';
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import FormInput from "@/app/Components/Inputs/FormInput";
import { signup } from '@/app/Actions/auth'
import { useActionState } from 'react'
import Swal from 'sweetalert2';


export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      Swal.fire({
        title: 'Success!',
        text: state.success,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        router.push('/Auth/Signin');
      });
    }
  }, [state?.success, router]);

  return (
    <div className="flex justify-center">
      <div style={{ minWidth: "30%" }}>
        <div className="flex min-h-full mt-5 shadow-2xl flex-col justify-center px-4 py-2 bg-white rounded-lg">
            <div className=" w-full">
              <div className="flex flex-col items-center justify-items-start rounded-t-lg">
                <Image src='/logo.png' width={200} height={150} alt='logo' />
                <h2 className="text-center text-2xl font-bold leading-3  text-gray-900">
                Create an account
                </h2>
              </div>
            </div>

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" action={action}>
                <FormInput
                  label="Name"
                  name="name"
                  autoComplete="name"
                  required
                />
                {state?.errors?.name && <p>{state.errors.name}</p>}
                <FormInput
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                {state?.errors?.email && <p>{state.errors.email}</p>}
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
                {state?.errors?.password && (
                  <div className="text-red-500 text-sm">
                    <p className="font-semibold">Password must:</p>
                    <ul className="list-disc ml-5">
                      {Array.isArray(state.errors.password) ? state.errors.password.map((error, idx) => (
                        <li key={idx}>- {error}</li>
                      )) : <li>- {state.errors.password}</li>}
                    </ul>
                  </div>
                )}
                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                />
                {state?.errors?.confirmPassword && <p className="text-red-500 text-sm">{state.errors.confirmPassword}</p>}
                <FormInput
                  label="Telephone"
                  name="telephone"
                  type="tel"
                  autoComplete="tel"
                />
                {state?.errors?.telephone && <p className="text-red-500 text-sm">{state.errors.telephone}</p>}
                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                  Select Role
                </label>
                <select name="role" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:ring-gray-400 sm:text-sm sm:leading-6">
                  <option value="">Select Role</option>
                  <option value="cashier">Cashier</option>
                  <option value="manager">Manager</option>
                </select>
                {state?.errors?.role && <p className="text-red-500 text-sm">{state.errors.role}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Your role determines what you can access
                </p>
              <div>
              <Button variant="filled" label={pending ? "Signing up..." : "Sign Up"} type="submit" disabled={pending} />
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => {
                  router.push("/Auth/Signin");
                }}
                className="font-semibold leading-6 text-tertiary hover:text-complementary cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}