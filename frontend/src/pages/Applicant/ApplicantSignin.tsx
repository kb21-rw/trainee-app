import React from "react";
import { useLoginMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/ui/Loader";
import { H1 } from "../../components/ui/Typography";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

const ApplicantSignin = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirectTo") || "/apply";

  const onSubmit = async (userData: any) => {
    const result = await login({
      email: userData.email,
      password: userData.password,
    });
    if (result?.data?.accessToken) {
      cookies.set("jwt", result.data.accessToken, { maxAge: 1800 });
      return navigate(redirectUrl);
    }
  };

  const errorMessage: any =
    errors.email?.message ||
    errors.password?.message ||
    error?.userData?.errorMessage;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-screen justify-center gap-5 md:gap-16 items-center px-5 sm:px-10 md:p-0 max-w-md mx-auto"
    >
      <H1>Sign In</H1>
      {isLoading && <Loader />}
      <div className="space-y-3 md:space-y-6 lg:space-y-10 w-full">
        {errorMessage && (
          <div className="py-2 bg-error-light text-error-dark flex justify-center items-center rounded-lg">
            {errorMessage}
          </div>
        )}
        <div className="flex flex-col gap-5 mx-24">
          <InputField
            name="email"
            type="email"
            label="Email address"
            placeholder="example@gmail.com"
            register={register}
            options={{
              required: { value: true, message: "Email is a required field" },
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
            }}
            errors={errors}
          />
        </div>
      </div>
      <Button type="submit">Sign In</Button>
      <div>
        {`Don't have an account?`}
        <Link to="/applicant/signup" className="text-primary-dark">
          Sign Up
        </Link>
        <div className="flex gap-2">
          <span>Forgot password?</span>
          <Link to="/reset-password" className="text-primary-dark">
            Reset
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ApplicantSignin;
