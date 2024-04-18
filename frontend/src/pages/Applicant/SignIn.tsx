import React from "react";
import Google from "../../components/ui/applicants/Google";
import { useNavigate } from "react-router-dom";
import InputField from "../Form/InputField";
import Button from "../../components/ui/Button";

export default function SignIn() {
  const navigate = useNavigate();
  const handleUserInfo = () => {};

  return (
    <section className="signup min-h-screen flex items-center justify-center lg:py-10">
      <div className="md:px-36 px-16 flex flex-col items-center gap-10 pt-10 pb-10 shadow-2xl">
        <h1 className="text-2xl font-semibold">Applicant Sign-In</h1>
        <div className="flex flex-col gap-5">
          <InputField
            type="email"
            id="email"
            placeholder="example@gmail.com"
            label="Email"
            htmlfor="email"
          />
          <InputField
            type="password"
            id="password"
            placeholder="Enter your password"
            label="Password"
            htmlfor="password"
          />
          <div className="flex justify-center">
            <Button type="submit" variant="small" clickHandler={handleUserInfo}>
              Signin
            </Button>
          </div>
          <Google title={"Sign in with Google"} />
          <h3
            className="mx-auto cursor-pointer"
            onClick={() => navigate("/applicant/reset-password")}
          >
            <span className="text-primary-dark"> Forgot password?</span>
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
