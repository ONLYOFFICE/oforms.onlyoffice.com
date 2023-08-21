import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_EMAIL_HOST,
      port: process.env.NEXT_PUBLIC_EMAIL_PORT,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_AUTH_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: `oforms.onlyoffice.com <${process.env.NEXT_PUBLIC_EMAIL_AUTH_USER}>`,
      to : [process.env.NEXT_PUBLIC_EMAIL_ACCOUNT_1, process.env.NEXT_PUBLIC_EMAIL_ACCOUNT_2],
      subject: "У вас новая форма из https://oforms.onlyoffice.com/form-submit",
      text: "У вас новая форма из https://oforms.onlyoffice.com/form-submit. Проверьте, пожалуйста.",
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send("Form submitted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred while submitting the form");
  };
};