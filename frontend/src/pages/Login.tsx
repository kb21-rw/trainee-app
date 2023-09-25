import React from "react";
import { Form, useActionData } from "react-router-dom";

export const action = async ({request})=>{

  const data = await request.formData()
  console.log(data.get("email"))
  return {error:"dfdsfdsfdsf"}
}


const Login = () => {
  const error = useActionData()
  return (
    <Form method="post">
   <input className="border outline-none" type="email" name="email"/>
   <input className="border outline-none" type="password" name="password"/>
   <button>Login</button>
    </Form>
  )
}

export default Login