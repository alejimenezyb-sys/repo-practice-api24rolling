import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.example.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

export const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendVerificationEmail = async (
  email,
  username,
  verificationCode,
) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verifica tu email en nuestra aplicación",
    html: `<h2>${username} - Bienvenido a nuestro sitio! </h2>
        <p> Ty código de verificación es: </p>
        <h1 style= "font-size: 32px; letter-spacing: 5px; color : #4CAF50; margin: 20px 0;
        ">${verificationCode}</h1>
        <p> Este código expira en 15 minutos. APRESURATE!! </p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error al enviar email", error);
  }
};
