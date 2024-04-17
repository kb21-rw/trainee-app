import axios from "axios";

interface User {
  email: string;
  password: string;
  rePassword?: string;
}

export let errorMessage: string = "";

const registerUser = (user: User, setErrorMessage: any) => {
  axios
    .post("http://localhost:5000/applicants/signup", user)
    .then(() => {
      alert("User signed up successfully");
    })
    .catch((error) => {
      error.message = "User already exists";
      errorMessage = error.message;
      user.rePassword = user.password;
      return setErrorMessage(errorMessage);
    });
};

export default registerUser;
