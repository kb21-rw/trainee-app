import React from "react";
import { useSignupMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Form/InputField";
import Button from "../../components/ui/Button";
import { H1 } from "../../components/ui/Typography";
import Loader from "../../components/ui/Loader";

const ApplicantSignup = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cookies = new Cookies();
  const navigate = useNavigate();

  const onSubmit = async (userData: any) => {
    const result = await signup({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    if (result.data.userId) {
      cookies.set("jwt", result.data.userId, { maxAge: 1800 });
      return navigate("/login");
    }
  };

  const errorMessage: any =
    errors.email?.message ||
    errors.password?.message ||
    error?.userData?.errorMessage;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-screen justify-center gap-5 md:gap-16 items-center px-5 sm:px-10 md:p-0 max-w-xl mx-auto"
    >
      <H1>Sign Up</H1>
      {isLoading && <Loader />}
      <div className="space-y-3 md:space-y-6 lg:space-y-10 w-full">
        {errorMessage && (
          <div className="py-2 bg-error-light text-error-dark flex justify-center items-center rounded-lg">
            {errorMessage}
          </div>
        )}

        <InputField
          name="name"
          type="text"
          label="Name"
          placeholder="Your name"
          register={register("name", {
            required: { value: true, message: "Name is a required field" },
          })}
        />
        <InputField
          name="email"
          type="email"
          label="Email address"
          placeholder="example@gmail.com"
          register={register("email", {
            required: { value: true, message: "Email is a required field" },
          })}
          errors={errors}
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          placeholder="password"
          register={register("password", {
            required: { value: true, message: "Password is a required field" },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters long and include :uppercase, lowercase, number, and special character.",
            },
          })}
          errors={errors}
        />
      </div>

      <Button>Sign Up</Button>
      <div className="">
        Already have an account?{" "}
        <Link to="/applicant/signin" className="text-primary-dark">
          Login
        </Link>
      </div>
    </form>
  );
};

export default ApplicantSignup;
