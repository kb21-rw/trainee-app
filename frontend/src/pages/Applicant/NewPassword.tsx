import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/ui/Button";
import InputField from "../Form/InputField";
import PasswordMessages from "../../utils/PasswordMessages";
import validatePassword, { emailRegex } from "../../utils/validatePassword";
import { useSearchParams } from "react-router-dom";
import newPassword, { errorMessage } from "../../utils/newPassword";
interface userValidation {
  email: any;
  password: string;
  rePassword?: string;
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [user, setUser] = useState<userValidation>({
    email: email,
    password: "",
    rePassword: "",
  });

  const [errrorMessage, setErrorMessage] = useState("");

  const handleUserInfo = () => {
    if (!emailRegex.test(user.email))
      return setErrorMessage("Enter a valid email");
    if (validatePassword(user.password))
      return setErrorMessage("Enter a valid password");
    if (user.password !== user.rePassword) {
      return setErrorMessage("Passwords do not match");
    } else {
      delete user.rePassword;
      newPassword(user, setErrorMessage);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <section className="signup min-h-screen flex items-center justify-center lg:py-10">
      <div className="md:px-36 px-16 flex flex-col items-center gap-10 pt-10 pb-10 shadow-2xl">
        <h1 className="text-2xl font-semibold">New Password</h1>
        <div className="flex flex-col gap-5">
          <InputField
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, password: e.target.value })
            }
            label="Password"
            htmlfor="password"
            errorMessage="Please enter a valid email"
            icon={showPassword ? <FaEye /> : <FaEyeSlash />}
            showPassword={() => setShowPassword(!showPassword)}
          />
          {user.password && <PasswordMessages user={user} />}
          <InputField
            type={showPassword ? "text" : "password"}
            id="repassword"
            placeholder="Re-enter your password"
            value={user.rePassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, rePassword: e.target.value })
            }
            label="Confirm password"
            htmlfor="repassword"
            errorMessage="Please enter a valid email"
            icon={showPassword ? <FaEye /> : <FaEyeSlash />}
            showPassword={() => setShowPassword(!showPassword)}
          />
          <h1 className="text-red-500">
            {errrorMessage.length > 1 ? errrorMessage : ""}
          </h1>
          <div className="flex justify-center">
            <Button type="submit" variant="small" clickHandler={handleUserInfo}>
              Signup
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
