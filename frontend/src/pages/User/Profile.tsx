import React, { useContext, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Cookies from "universal-cookie";
import { H1 } from "../../components/ui/Typography";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { updateUserProfile } from "../../services/api";
import { authContext } from "../../App";
import Loader from "../../components/ui/Loader";
import Alert from "../../components/ui/Alert";

export const action = async ({ request }: any) => {
  try {
    const cookies = new Cookies();
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const newData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && password.length > 3 && { password }),
    };

    const response = await updateUserProfile(cookies.get("jwt"), newData);

    return response;
  } catch (error) {
    console.log(error);
    console.error("Error:", error);
  }
};

const Profile = () => {
  const { user } = useContext(authContext);
  const navigation = useNavigation()
  const response: any = useActionData()
  console.log(response);

  return (
    <Form
      method="post"
      className="flex flex-col h-full justify-center gap-5 md:gap-16 items-center px-5 sm:px-10 md:p-0 md:w-2/3 lg:w-2/5 mx-auto"
    >
      {navigation.state === "submitting" && <Loader />}
      {response ? (
  response.ok ? (
    <Alert type="success">Profile update successfully</Alert>
  ) : (
    <Alert type="error">{response.message || "Failed to update the profile"}</Alert>
  )
) : (
"")}

      <H1>Profile settings</H1>
      <div className="space-y-3 md:space-y-6 lg:space-y-10 w-full">
        <InputField
          styles="!flex justify-between"
          name="name"
          type="text"
          label="Name"
          placeholder=""
          defaultValue={user?.name}
        />
        <InputField
          styles="!flex justify-between"
          name="email"
          type="email"
          label="Email"
          placeholder=""
          defaultValue={user?.email}
        />
        <InputField
          styles="!flex justify-between"
          name="password"
          type="password"
          label="Password"
          placeholder="password"
        />
      </div>
      <Button>Save</Button>
    </Form>
  );
};

export default Profile;
