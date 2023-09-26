import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { login } from "../services/api";
import Cookies from "universal-cookie";

export const action = async ({ request }) => {
  const cookies = new Cookies();
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const response = await login({ email, password });
  if (response.status === 200) {
    const accessToken = response.result.accessToken;
    cookies.set("jwt", accessToken);
    return redirect("/");
  }
  return response.result;
};

const Login = () => {
  const error = useActionData();
  return (
    <Form method="post">
      <input className="border outline-none" type="email" name="email" />
      <input className="border outline-none" type="password" name="password" />
      <button>Login</button>
    </Form>
  );
};

export default Login;