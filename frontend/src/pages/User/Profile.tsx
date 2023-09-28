import { Form, Link, redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { H1 } from "../../components/ui/Typography";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { updateUserProfile } from "../../services/api";
import React from "react";

export const action = async ({ request }: any) => {
  try {
    const cookies = new Cookies();
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await updateUserProfile(cookies.get("jwt"), {
      name,
      email,
      password
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const Profile = () => {
  return (
    <Form
      method="post"
      className="flex flex-col h-full justify-center gap-5 md:gap-16 items-center px-5 sm:px-10 md:p-0 md:w-2/3 lg:w-2/5 mx-auto"
    >
      <H1>Profile settings</H1>
      <div className="space-y-3 md:space-y-6 lg:space-y-10 w-full">
        <InputField
          styles="!flex justify-between"
          name="name"
          type="text"
          label="Name"
          placeholder=""
        />
        <InputField
          styles="!flex justify-between"
          name="email"
          type="email"
          label="Email"
          placeholder=""
        />
        <InputField
          styles="!flex justify-between"
          name="password"
          type="password"
          label="Password"
          placeholder=""
        />
      </div>

      <Button>Save</Button>
    </Form>
  );
};

export default Profile;
