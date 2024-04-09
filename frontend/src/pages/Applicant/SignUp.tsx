import React, { useState } from "react";
import Google from "../../assets/Google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import validatePassword from "../../utils/validatePassword";
// import { Icon } from "react-icons-kit";
// import { eyeOff } from "react-icons-kit/feather/eyeOff";
// import { eye } from "react-icons-kit/feather/eye";
interface userValidation {
  email: string;
  password: string;
  rePassword?: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useState<userValidation>({
    email: "",
    password: "",
    rePassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleUserInfo = () => {
    if (user.password === user.rePassword) {
      delete user.rePassword;
      axios
        .post("http://localhost:5000/applicants/signup", user)
        .then(() => {
          alert("User signed up successfully");
          setPasswordMessage("");
        })
        .catch((error) => console.log(error));
    } else {
      setPasswordMessage("Passwords do not match");
    }
  };

  return (
    <section className="signup min-h-screen flex items-center justify-center lg:py-10">
      <div className="md:px-36 px-16 flex flex-col items-center gap-10 pt-10 pb-10 shadow-2xl">
        <h1 className="text-2xl font-semibold">Applicant Sign Up</h1>
        <div className="flex flex-col gap-5">
          <form
            onSubmit={handleSubmit(handleUserInfo)}
            className="form grid gap-5"
          >
            <div className="email grid">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                placeholder="example@gmail.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="bg-gray-50 border border-gray-300 w-72 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
              />
              {errors.email && (
                <span className="error text-red-500">
                  Please enter a valid email
                </span>
              )}
            </div>
            <div className="password grid">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={user.password}
                {...register("password", { validate: validatePassword })}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
              />
              {errors.password && (
                <span className="error text-red-500">
                  {errors.password.message}
                </span> // Access the specific error message
              )}
            </div>
            <div id="message">
              <h3 className="font-bold">Password must contain the following:</h3>
              <div className="px-5">
                <p className="invalid">
                  A <b>lowercase</b> letter
                </p>
                <p className="invalid">
                  A <b>capital (uppercase)</b> letter
                </p>
                <p className="invalid">
                  A <b>number</b>
                </p>
                <p
                  className={
                    user.password.length >= 8
                      ? `text-green-500`
                      : `text-red-500`
                  }
                >
                  Minimum <b>8 characters</b>
                </p>
              </div>
            </div>
            <div className="rePassword grid">
              <label htmlFor="repassword" className="font-semibold">
                Confirm password
              </label>
              <input
                type="password"
                id="repassword"
                {...register("repassword", { required: true })}
                placeholder="Re-enter your password"
                value={user.rePassword}
                onChange={(e) =>
                  setUser({ ...user, rePassword: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
            <h1 className="text-red-500">{passwordMessage}</h1>
            <div className="flex justify-center">
              <button className="text-white bg-primary-dark w-2/6 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm auto px-2 py-2.5 text-center">
                Sign up
              </button>
            </div>
          </form>
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
