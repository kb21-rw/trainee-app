import React from 'react'
import validatePassword, { emailRegex } from '../../../utils/validatePassword';

function FormValidation(prop:any) {
    if (!emailRegex.test(prop.email)){
        return prop.setMessage("Enter a valid email");
    }

    if (validatePassword(prop.password)){
        return prop.setMessage("Enter a valid password");
    }

    if (prop.password !== prop.rePassword) {
      return prop.setMessage("Passwords do not match");
    } else {
      prop.setMessage("");
      console.log(prop.email, prop.password);
    }

  return (
      <div>
        {prop.message}
      </div>
  )
}

export default FormValidation