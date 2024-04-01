import React from "react";
import Google from "../../assets/Google";

export default function SignUp() {
  return (
    <section className="signup min-h-screen flex items-center justify-center lg:py-10">
      <div className="md:px-36 px-16 flex flex-col items-center gap-10 pt-10 pb-10 shadow-2xl">
        <h1 className="text-2xl font-semibold">Applicant Sign Up</h1>
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
                className="bg-gray-50 border border-gray-300 w-72 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
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
            <div className="rePassword grid">
              <label htmlFor="repassword" className="font-semibold">
                Confirm password
              </label>
              <input
                type="password"
                id="repassword"
                name="ApplicantRePassword"
                required
                placeholder="Re-enter your password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-primary-dark w-3/6 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm auto px-2 py-2.5 text-center"
              >
                Sign up
              </button>
            </div>
          </form>
          <Google title={"Sign up with Google"} />
          <h3 className="mx-auto">
            Already have an account?
            <span className="text-primary-dark mx-auto"> Sign in</span>
          </h3>
        </div>
      </div>
    </section>
  );
}
