var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aadishenoy123@gmail.com',
    pass: 'ADIthya@123'
  }
});

var mailOptions = {
  from: 'aadishenoy123@gmail.com',
  to: 'adithyashenoy6@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});