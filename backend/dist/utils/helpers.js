"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = exports.sendEmail = exports.generateRandomPassword = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = process.env.NODEMAIL_EMAIL;
const pass = process.env.NODEMAIL_PASSWORD;
const generateRandomPassword = (length) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
};
exports.generateRandomPassword = generateRandomPassword;
const sendEmail = (name, email, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user,
            pass
        }
    });
    const info = yield transporter.sendMail({
        from: `${name} <${email}>`,
        to: email,
        subject,
        html: message
    });
    console.log("Message sent: " + info.messageId);
});
exports.sendEmail = sendEmail;
const generateMessage = (name, email, role, password) => {
    const html = `<html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome as ${role}</title>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; margin: 20px;">
            <h1>Hello ${name},</h1>
            <p>You are registered as ${role.toLowerCase()}</p>
            ${password ? `<h3>Your credentials</h3>
            <div>
            <span>Your email: </span>
            <span>${email}</span>
            </div>
            <div>
            <span>Your password:   </span>
            <span>${password}</span>
            </div>` : ""}
            <p>Sincerely,<br> The gym</p>
        </div>
    </body>
    </html>
    `;
    return html;
};
exports.generateMessage = generateMessage;
