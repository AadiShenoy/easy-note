/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : setup the mail operation
 * @file            : mailer.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

var nodemailer = require("nodemailer");
class nodeMailer {
  mailer = (email, token) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aadishenoy123@gmail.com",
        pass: process.env.password,
      },
    });

    var mailOptions = {
      from: "aadishenoy123@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      html: `<a href='http://localhost:3000/reset/${token}'>click here</a>`,
      text: "password reset",
    };

    return transporter
      .sendMail(mailOptions)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  };
}

module.exports = new nodeMailer();
