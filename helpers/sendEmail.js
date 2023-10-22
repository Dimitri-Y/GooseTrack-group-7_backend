import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_EMAIL_FROM, UKR_NET_EMAIL_PASSWORD, BASE_URL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL_FROM,
    pass: UKR_NET_EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);
const sendEmail = (verificationCode, email) => {
   const verifyEmail = {
     from: UKR_NET_EMAIL_FROM,
     to: email,
     subject: "Verify email",
     html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click to verify email</a>`,
   };
  const letter = { ...verifyEmail };
  return transport.sendMail(letter);
};

export default sendEmail;
