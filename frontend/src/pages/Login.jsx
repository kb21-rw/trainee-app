import { Form, Link, redirect } from "react-router-dom";
import { login } from "../services/api";
import Cookies from "universal-cookie";
import { H1 } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";

export const action = async ({ request }) => {
  const cookies = new Cookies();
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const response = await login({ email, password });
  const pathName = new URL(request.url).searchParams.get("redirectTo") || "/";
  if (response.status === 200) {
    const accessToken = response.accessToken;
    cookies.set("jwt", accessToken);
    return redirect(pathName);
  }
  return response.result;
};

const Login = () => {
  // const error = useActionData();
  return (
    <Form method="post" replace className="flex flex-col h-screen justify-center gap-5 md:gap-16 items-center px-5 sm:px-10 md:p-0 md:w-2/3 lg:w-2/5 mx-auto">
      <H1>Member login</H1>
      <div className="space-y-3 md:space-y-6 lg:space-y-10 w-full">
      <InputField name="email" type="email" label="Email" placeholder="example@gmail.com"/>
      <InputField name="password" type="password" label="Password" placeholder="password"/>
      </div>
    
      <Button>Login</Button>
      <div className="self-end">Forgot password? <Link to="/reset-password"  className="text-primary">
        Reset
      </Link></div>
    </Form>
  );
};

export default Login;
