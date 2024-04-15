import React from "react";
import Google from "../../components/ui/applicants/Google";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <section className="signup min-h-screen flex items-center justify-center lg:py-10">
      <div className="md:px-36 px-16 flex flex-col items-center gap-10 pt-10 pb-10 shadow-2xl">
        <h1 className="text-2xl font-semibold">Applicant Sign-In</h1>
        <div className="flex flex-col gap-5">
          <form action="" className="form grid gap-5">
            <div className="email grid">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="ApplicantEmail"
                required
                placeholder="example@gmail.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 w-72 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="password grid">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="ApplicantPassword"
                required
                placeholder="Enter your password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-primary-dark w-2/6 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm auto px-2 py-2.5 text-center"
              >
                Sign in
              </button>
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
