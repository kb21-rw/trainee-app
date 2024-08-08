import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.NODEMAIL_EMAIL;
const pass = process.env.NODEMAIL_PASSWORD;

const generateRegisterMessage = (
  name: string,
  email: string,
  role: string,
  password: string
) => {
  const html = `<html>
      <head>
          <meta charset="UTF-8">
          <title>Welcome as ${role}</title>
      </head>
      <body>
          <div style="font-family: Arial, sans-serif; margin: 20px;">
              <h1>Hello ${name},</h1>
              <p>You are registered as ${role.toLowerCase()}</p>
              ${
                password
                  ? `<h3>Your credentials</h3>
              <div>
              <span>Your email: </span>
              <span>${email}</span>
              </div>
              <div>
              <span>Your password:   </span>
              <span>${password}</span>
              </div>`
                  : ""
              }
              <p>Sincerely,<br> The gym</p>
          </div>
      </body>
      </html>
      `;
  return html;
};

const generateVerificationMessage = (name: string, userId: string) => {
  const html = `<html>
      <head>
          <meta charset="UTF-8">
          <title>Email verification</title>
      </head>
      <body>
          <div style="font-family: Arial, sans-serif; margin: 20px;">
              <h1>Hello ${name},</h1>
              <div>
                <p>Click this <a href="${process.env.FRONTEND_URL}/applicant/verify?userId=${userId}">link</a> to verify your email.</p>
              </div>
              <p>Sincerely,<br> The gym</p>
          </div>
      </body>
      </html>
      `;
  return html;
};

export const sendEmail = async (
  emailTo: string,
  data:
    | { name: string; email: string; role: string; password: string }
    | { name: string; userId: string }
    | { name: string; password: string }
) => {
  const subject = "Welcome " + data.name;
  let message = "";
  if (
    "name" in data &&
    "email" in data &&
    "role" in data &&
    "password" in data
  ) {
    message = generateRegisterMessage(
      data.name,
      data.email,
      data.role,
      data.password
    );
  }

  if ("name" in data && "userId" in data) {
    message = generateVerificationMessage(data.name, data.userId);
  }

  if ("name" in data && "password" in data) {
    message = generateResetPasswordMessage(data.name, data.password);
  }

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
  await transporter.sendMail({
    from: `The GYM <thegym@gmail.com>`,
    to: emailTo,
    subject,
    html: message,
  });
};

export const generateResetPasswordMessage = (
  name: string,
  password: string
) => {
  const html = `<html>
      <head>
          <meta charset="UTF-8">
      </head>
      <body>
          <div style="font-family: Arial, sans-serif; margin: 20px;">
              <h1>Hello ${name},</h1>
              <h3>Your new password is: <span>${password}</span>
              </h3>
              <p>Sincerely,<br> The gym</p>
          </div>
      </body>
      </html>
      `;
  return html;
};
