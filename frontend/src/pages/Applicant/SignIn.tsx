import React from "react";
import Google from "../../components/ui/applicants/Google";
import { useNavigate } from "react-router-dom";
import InputField from "../Form/InputField";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { loginValidationSchema } from "../../utils/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(loginValidationSchema) });

  const onSubmit = async (data: FormValues) => {
    console.log(data, "thiw will be the dat");
    try {
      const response = await axios.post(
        "http://localhost:3000/applicants/signin",
        data,
      );
      console.log(response, "this is the response");
      if (response.status === 201) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error, "helloooooo");
      const axiosError = error as AxiosError;
      const customError = axiosError.response?.data as {
        type: string;
        errorMessage: { status: number; message: string };
      };
      setError("email", { message: customError.errorMessage.message });
    }
  };

  return (
    <section className="signup min-h-screen flex items-center justify-center lg:py-10">
      <div className="md:px-36 px-16 flex flex-col items-center gap-10 pt-10 pb-10 shadow-2xl">
        <h1 className="text-2xl font-semibold">Applicant Sign-In</h1>
        <div className="flex flex-col gap-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="email"
              id="email"
              placeholder="example@gmail.com"
              label="Email"
              htmlfor="email"
              register={register("email")}
            />

            <InputField
              type="password"
              id="password"
              placeholder="Enter your password"
              label="Password"
              htmlfor="password"
              register={register("password")}
            />
            {errors.email || errors.password ? (
              <p>{(errors.email || errors.password)?.message}</p>
            ) : null}
            <div className="flex justify-center">
              <Button type="submit" variant="small">
                Signin
              </Button>
            </div>
          </form>
          <Google title={"Sign in with Google"} />
          <h3 className="mx-auto">
            Forgot password?
            <span className="text-primary-dark"> Reset</span>
          </h3>
          <h3
            className="text-primary-dark mx-auto cursor-pointer"
            onClick={() => navigate("/applicant/signup")}
          >
            Create an account
          </h3>
        </div>
      </div>
    </section>
  );
}
