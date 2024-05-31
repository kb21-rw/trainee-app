import React, { FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ForgetPassword() {
  const formRef = useRef<HTMLFormElement>(null);
  const message = import.meta.env.EMAILMESSAGE;
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_egqrsix",
        "template_jdke2xu",
        formRef.current as HTMLFormElement,
        {
          publicKey: "xNwIllhD04zyoPZWm",
        }
      )
      .then(
        () => {
          alert("An email has been sent");
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
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            name="to_name"
            className="bg-gray-50 border border-gray-300 w-72 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
          />
          <textarea
            readOnly
            value={message}
            name="message"
            className="hidden"
          />
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
