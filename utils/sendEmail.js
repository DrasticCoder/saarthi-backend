import { createTransport } from "nodemailer";

export const sendEmail = async (data) => {
  let transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: 465, //TODO: fetch this from env
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  transporter.verify((err, res) => {
    if (err) {
      console.log("Nodemailer error: ", err);
    }
    console.log("Server is ready to take our messages");
  });

  let info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    ...data,
  });
  return info;
};
