'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../../components/Button/Button";
import FormInput from "@/app/components/Inputs/FormInput";
import { useForm } from "react-hook-form";



export default function SignupForm() {
  const router = useRouter();

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => console.log({ data });

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

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  label="Name"
                  name="name"
                  autoComplete="name"
                  required
                />
                <FormInput
                  label="Email address"
                  name="email"
                  type="email"
                  // ref={register({
                  //   required: "Email is required.",
                  //   pattern: {
                  //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //     message: "Please enter a valid email"
                  //   }
                  // })}
                  autoComplete="email"
                  required
                />
                {/* {errors.email && (
                  <p style={{ color: 'red' }}>{errors.email.message}</p>
                )} */}
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
                <FormInput
                  label="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              <div>
              <Button variant="filled" label="Sign Up" />
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