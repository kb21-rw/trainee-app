import axios from "axios";

interface User {
  email: string;
  password: string;
  rePassword?: string;
}

export let errorMessage: string = "";

const newPassword = (user: User, setErrorMessage: any) => {
  axios
    .patch("http://localhost:3000/applicants/reset/:email", user)
    .then(() => {
      window.location.href = "http://localhost:5173/applicant/signin";
      console.log(user);
    })
    .catch((error) => {
      error.message = "Email does not exist";
      errorMessage = error.message;
      user.rePassword = user.password;
      return setErrorMessage(errorMessage);
    });
};

export default newPassword;
