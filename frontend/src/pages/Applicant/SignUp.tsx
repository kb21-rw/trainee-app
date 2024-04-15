import React, { useState } from "react";
import Google from "../../components/ui/applicants/Google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/ui/Button";
import InputField from "../Form/InputField";
import PasswordMessages from "../../utils/PasswordMessages";
import validatePassword, { emailRegex } from "../../utils/validatePassword";
interface userValidation {
  email: string;
  password: string;
  rePassword?: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState<userValidation>({
    email: "",
    password: "",
    rePassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleUserInfo = () => {
    if (!emailRegex.test(user.email))
      return setPasswordMessage("Enter a valid email");
    if (validatePassword(user.password))
      return setPasswordMessage("Enter a valid password");
    if (user.password !== user.rePassword) {
      return setPasswordMessage("Passwords do not match");
    } else {
      setPasswordMessage("");
      delete user.rePassword;
      axios
        .post("http://localhost:5000/applicants/signup", user)
        .then(() => {
          alert("User signed up successfully");
          setPasswordMessage("");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <section className="signup min-h-screen flex items-center justify-center lg:py-10">
      <div className="md:px-36 px-16 flex flex-col items-center gap-10 pt-10 pb-10 shadow-2xl">
        <h1 className="text-2xl font-semibold">Applicant Sign Up</h1>
        <div className="flex flex-col gap-5">
          <InputField
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={user.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, email: e.target.value })
            }
            label="Email"
            htmlfor="email"
            errorMessage="Please enter a valid email"
          />
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
            {passwordMessage.length > 1 ? passwordMessage : ""}
          </h1>
          <div className="flex justify-center">
            <Button type="submit" variant="small" clickHandler={handleUserInfo}>
              Signup
            </Button>
          </div>
          <Google title={"Sign up with Google"} />
          <h3 className="mx-auto">
            Already have an account?
            <span
              className="text-primary-dark cursor-pointer"
              onClick={() => navigate("/applicant/signin")}
            >
              {" "}
              Sign in
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}
