'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../../components/Button/Button";
import FormInput from "@/app/components/Inputs/FormInput";

export default function SigninForm() {
  const router = useRouter();

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

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
                <FormInput
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              <div>
              <Button variant="filled" label="Sign In" 
              onClick={() => {
                router.push("/Customer");
              }}
              />
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