import "body-parser"
import { createTransport } from "nodemailer"

export default async function handler(req, res) { 
    const { name, email, message } = req.body;

    const transporter = createTransport({
        // Specify your email provider details here
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'seatwise@outlook.com',
            pass: 'Sw!@#456'
        }
    });
    
    const mailOptionsDor = {
        from: "seatwise@outlook.com",
        to: 'toiznerd@gmail.com', // Replace with your email address
        subject: 'New message from SeatWise',
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `
    };

    const mailOptionsRaz = {
        from: "seatwise@outlook.com",
        to: 'raz228822@gmail.com', // Replace with your email address
        subject: 'New message from SeatWise',
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `
    };

    const sendMailWithDelay = (mailOptions, timeout, callback) => {
        setTimeout(() => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              callback(false); // Pass false to the callback if there's an error
            } else {
              console.log('Email sent:', info.response);
              callback(true); // Pass true to the callback if email sent successfully
            }
          });
        }, timeout);
      };
      
      // Use Promise.all to wait for both emails to be sent
      Promise.all([
        new Promise((resolve) => sendMailWithDelay(mailOptionsDor, 0, resolve)),
        new Promise((resolve) => sendMailWithDelay(mailOptionsRaz, 2000, resolve)),
      ])
        .then((results) => {
          const allEmailsSent = results.every((result) => result === true);
          if (allEmailsSent) {
            res.statusCode = 200;
            res.json({ message: "Emails sent successfully" });
          } else {
            res.statusCode = 500;
            res.json({ message: "Error sending emails" });
          }
        })
        .catch((error) => {
          console.error('Error sending emails:', error);
          res.statusCode = 500;
          res.json({ message: "Error sending emails" });
        });
   

    
}