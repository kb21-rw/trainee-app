import axios from "axios";

interface User {
  email: string;
  password: string;
  rePassword?: string;
}

export let errorMessage: string = "";

const registerUser = (user: User, setErrorMessage: any) => {
  axios
    .post("http://localhost:3000/applicants/signup", user)
    .then(() => {
      window.location.href = "http://localhost:5173/applicant/signin";
    })
    .catch((error) => {
      error.message = "User already exists";
      errorMessage = error.message;
      user.rePassword = user.password;
      return setErrorMessage(errorMessage);
    });
};

export default registerUser;
