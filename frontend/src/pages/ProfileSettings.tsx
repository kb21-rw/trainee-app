import React, {useContext} from "react";
import { ActionFunction, Form, useActionData, useNavigation } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { H1 } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import { authContext } from "../App";
import { updateProfile } from "../services/api";
import Cookies from "universal-cookie";
import Loader from "../components/ui/Loader";
import Alert from "../components/ui/Alert";
import { updateProfileSchema } from "../validations/userValidation";


export const action:ActionFunction = async ({ request }) => {
  try{
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
  const password = formData.get("password");
  const cookies = new Cookies();
  const jwt = cookies.get("jwt")
  const updatingData:any = {};
  if(name){
    updatingData.name= name
  }
  if(email){
    updatingData.email= email
  }
  if(password &&password.length>3){
    updatingData.password = password
  }
   console.log(updatingData)
  const response = await updateProfile(updatingData,jwt);
  return response;
}
catch(error){
  return error
}
};
const ProfileSettings = () => {
  const navigation = useNavigation()
  const response: any = useActionData()
  const {user} = useContext(authContext)
  return (
    <Form method="post" className="flex flex-col h-screen justify-c mt-24 gap-5 md:gap-16 items-center px-6 md:px-12 max-w-5xl mx-auto">
      <div className="max-w-lg mb-16 self-end flex w-full">
      <H1 className="">Profile settings</H1>
      </div>
      <div className="self-end max-w-lg w-full">
      {navigation.state === "submitting" && <Loader />}
      {response &&(response?.ok? <Alert type="success">Profile update succesfully</Alert>:<Alert type="error">{response?.message||"Failed to update the profile"}</Alert>)}</div>
      <InputField
        label="Names"
        placeholder="John Doe"
        name="name"
        type="text"
        variant="inline"
        defaultValue={user?.name}
      />
      <InputField
        label="Email address"
        placeholder="example@gmail"
        name="email"
        type="email"
        variant="inline"
        defaultValue={user?.email}
      />
      <InputField
        label="Password"
        placeholder="write your password"
        name="password"
        type="password"
        variant="inline"
      />
       
      <div className="max-w-lg w-full self-end">
      <Button>Save</Button>
      </div>
    </Form>
  );
};

export default ProfileSettings;
