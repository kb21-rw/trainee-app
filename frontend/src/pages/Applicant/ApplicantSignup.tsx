import React from "react";
import { useSignupMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { H2 } from "../../components/ui/Typography";
import Loader from "../../components/ui/Loader";
import { ButtonSize } from "../../utils/types";

const ApplicantSignup = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const cookies = new Cookies();
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (userData: any) => {
    const result = await signup({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    if (result.data.userId) {
      cookies.set("jwt", result.data.userId, { maxAge: 1800 });
      return navigate("/signup/thank-you");
    }
  };

  const errorMessage: any =
    errors.email?.message ||
    errors.password?.message ||
    errors["confirm-password"]?.message ||
    error?.data?.errorMessage;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-screen justify-center gap-5 md:gap-16  px-5 sm:px-10 md:p-0 max-w-xl mx-auto"
    >
      <div className="text-center">
        <H2>Sign Up</H2>
      </div>
      <div className="w-full flex text-center justify-center">{isLoading && <Loader />}</div>
      <div className="space-y-3 md:space-y-6 lg:space-y-7 w-full">
        {errorMessage && (
          <div className="py-2 bg-error-light text-error-dark flex justify-center items-center rounded-lg">
            {errorMessage}
          </div>
        )}
        <div className="flex flex-col gap-5">
          <InputField
            name="name"
            type="text"
            label="Name"
            placeholder="Your name"
            register={register}
            options={{
              required: { value: true, message: "Name is a required field" },
            }}
            errors={errors}
          />
          <InputField
            name="email"
            type="email"
            label="Email address"
            placeholder="example@gmail.com"
            register={register}
            options={{
              required: { value: true, message: "Email is a required field" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              }, // checks if the email follows the standard format.
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
              required: {
                value: true,
                message: "Password is a required field",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be 8+ characters with uppercase, lowercase, number, and special character.",
              }, // checks if password is valid
            }}
            errors={errors}
          />
          <InputField
            name="confirm-password"
            type="password"
            label="Confirm Password"
            placeholder="Re-enter password"
            register={register}
            options={{
              required: {
                value: true,
                message: "Password confirmation is a required field",
              },
              validate: (value: string) =>
                value === password || "Passwords do not match",
            }}
            errors={errors}
          />
        </div>
      </div>
      <Button size={ButtonSize.Large} type="submit">
        Sign Up
      </Button>
      <div className="flex gap-2">
        <span>Already have an account?</span>
        <Link to="/login" className="text-primary-dark">
          Login
        </Link>
      </div>
    </form>
  );
};

export default ApplicantSignup;
