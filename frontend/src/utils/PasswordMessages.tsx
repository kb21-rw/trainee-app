import React from "react";
import {
  digitRegex,
  lowercaseRegex,
  specialCharRegex,
  uppercaseRegex,
} from "./validatePassword";

interface Password {
  user: { password: string };
}

function PasswordMessages(prop: Password) {
  return (
    <div id="message">
      <h3 className="font-bold">Password must contain the following:</h3>
      <div className="px-5">
        <p
          className={
            uppercaseRegex.test(prop.user.password)
              ? `text-green-500`
              : `text-red-500`
          }
        >
          A <b>capital (uppercase)</b> letter
        </p>
        <p
          className={
            lowercaseRegex.test(prop.user.password)
              ? `text-green-500`
              : `text-red-500`
          }
        >
          A <b>lowercase</b> letter
        </p>
        <p
          className={
            digitRegex.test(prop.user.password)
              ? `text-green-500`
              : `text-red-500`
          }
        >
          A <b>number</b>
        </p>
        <p
          className={
            specialCharRegex.test(prop.user.password)
              ? `text-green-500`
              : `text-red-500`
          }
        >
          A <b>special character</b>
        </p>
        <p
          className={
            prop.user.password.length >= 8 ? `text-green-500` : `text-red-500`
          }
        >
          Minimum <b>8 characters</b>
        </p>
      </div>
    </div>
  );
}

export default PasswordMessages;
