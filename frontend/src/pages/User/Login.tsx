/* eslint-disable no-unused-vars */

import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { H1 } from "../../components/ui/Typography";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import Loader from "../../components/ui/Loader";
import jwt_decode from "jwt-decode";
import { ButtonSize, UserRole } from "../../utils/types";

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirectTo") || "/";
  const onSubmit = async (data: any) => {
    const result = await login({ email: data.email, password: data.password });
    if (result?.data?.accessToken) {
      cookies.set("jwt", result.data.accessToken, { maxAge: 1800 });

      const decodedToken: any = jwt_decode(result.data.accessToken);
      const userRole = decodedToken.role;

      if (userRole === UserRole.Applicant || UserRole.Prospect) {
        navigate("/home");
      } else {
        navigate(redirectUrl);
      }
    }
  };

  const errorMessage: any =
    errors.name?.message || errors.email?.message || error?.data?.errorMessage;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-screen justify-center gap-5 md:gap-16  px-5 sm:px-10 md:p-0 max-w-xl mx-auto"
    >
      <div className="text-center">
        <H1>Member login</H1>
      </div>
      <div className="flex items-center justify-center">
      {isLoading && <Loader />}
      </div>
      <div className="space-y-3 md:space-y-6 lg:space-y-10 w-full">
        {errorMessage && (
          <div className="py-2 bg-error-light text-error-dark flex justify-center items-center rounded-lg">
            {errorMessage}
          </div>
        )}
        <InputField
          name="email"
          type="email"
          label="Email address"
          placeholder="example@gmail.com"
          register={register}
          options={{
            required: { value: true, message: "Email is required field" },
          }}
          errors={errors}
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          placeholder="password"
          register={register}
          options={{
            required: { value: true, message: "Password is required field" },
          }}
          errors={errors}
        />
      </div>

      <Button size={ButtonSize.Large} type="submit">
        Login
      </Button>
      <div className="flex flex-col text-center">
        <span>
          Forgot password?{" "}
          <Link to="/reset-password" className="text-primary-dark">
            Reset
          </Link>
        </span>
        <span>
          Don&apos;t have an account ?{" "}
          <Link to="/signup" className="text-primary-dark">
            Sign up
          </Link>
        </span>
      </div>
    </form>
  );
};

export default Login;
