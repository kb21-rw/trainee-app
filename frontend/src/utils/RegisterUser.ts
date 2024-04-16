import axios from "axios";

interface User{
    email: string;
    password: string;
}

const registerUser = (user:User)=>{
axios
  .post("http://localhost:5000/applicants/signup", user)
  .then(() => {
    alert("User signed up successfully");
  })
  .catch((error) => console.log(error));
}

export default registerUser