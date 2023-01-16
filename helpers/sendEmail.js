import nodemailer from "nodemailer";

export function sendEmail(recieverEmail, fullName, password, matricule) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mail_configs = {
      from: process.env.EMAIL,
      to: recieverEmail,
      subject: "Your Voter's account has been created",
      html: `<b>Hey ${fullName} </b><br> Your voters account has been successully created, sign in with the your credentials to vote.<br> <b>Matriclue:</b>${matricule}<br> <b>Password:</b>${password}<br>.<b>Note: this credentials are private, and hence should not be shared with a 3rd party.</b>`,
    };

    transporter.sendMail(mail_configs, (error, info) => {
      if (error) {
        console.log(error);
        return reject({ message: "An error occured" });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}
