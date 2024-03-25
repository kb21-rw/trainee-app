import React from "react";
import Google from "../../assets/Google";

export default function SignUp() {
  return (
    <section className="signup min-h-screen flex items-center justify-center">
      <div className="px-36 flex flex-col items-center gap-24 pt-10 pb-20 shadow-2xl">
        <h1 className="text-2xl font-semibold">Applicant Sign Up</h1>
        <div>
          <Google title={"Sign up with Google"} />
        </div>
      </div>
    </section>
  );
}
