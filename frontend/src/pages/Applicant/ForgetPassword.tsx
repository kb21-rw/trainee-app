import React from "react";
import InputField from "../Form/InputField";
import Button from "../../components/ui/Button";

export default function ForgetPassword() {
  return (
    <section className="signup min-h-screen flex items-center justify-center lg:py-10">
      <div className="md:px-36 px-16 flex flex-col items-center gap-10 pt-10 pb-10 shadow-2xl">
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
        <div className="flex flex-col gap-5">
          <InputField
            type="email"
            id="email"
            label="Email"
            placeholder="Enter your email"
            htmlfor="email"
          />
        </div>
        <Button type="submit">Send</Button>
        <div className="flex flex-col gap-5"></div>
      </div>
    </section>
  );
}
