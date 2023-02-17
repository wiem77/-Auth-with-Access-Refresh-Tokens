const nodemailer = require('nodemailer');

module.exports = async (email,subject,text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.PORT,
      service: process.env.SERVICE,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email send successfully ');
  } catch (error) {
    console.log('error ', error);
  }
};
