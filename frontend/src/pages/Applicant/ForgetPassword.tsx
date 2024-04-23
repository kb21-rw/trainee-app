import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ForgetPassword() {
  const form = useRef();
  const message = "http://localhost:5173/applicant/new-password";

  const sendEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    emailjs
      .sendForm("service_egqrsix", "template_jdke2xu", form.current, {
        publicKey: "xNwIllhD04zyoPZWm",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <section className="signup min-h-screen flex items-center justify-center lg:py-10">
      <div className="md:px-36 px-16 flex flex-col items-center gap-10 pt-10 pb-10 shadow-2xl">
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
          <input
            type="text"
            name="to_name"
            className="bg-gray-50 border border-gray-300 w-72 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
          />
          <textarea value={message} name="message" className="hidden" />
          <input
            type="submit"
            value="Send"
            className="bg-primary-dark text-white py-3.5 font-medium text-base flex  justify-center rounded-lg cursor-pointer"
          />
        </form>
        <div className="flex flex-col gap-5"></div>
      </div>
    </section>
  );
}
