import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

exports.sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,

        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_USER}`,
            pass: `${process.env.EMAIL_PASS}`
        }
    })

    const mailOptions = {
        from: `Find Home App <${process.env.EMAIL_USER}>`,
        to: `${options.email}`,
        subject: 'Message from Find Home',
        html: `
        <div style="font-size:15px;box-shadow:4px 4px 2px;padding:10px;color:#000">
        <h1 style="font-size:25px;color:#2E86C1;border-bottom: 4px solid #2E86C1;">Find Home App</h1>
        <p style="color:#000;font-size:17px">Thank you for registering on find-home, we're looking for you to be a good partner.
        You should use the credentials below to sign in:<p>

        Email: <b style="color:#2E86C1">${options.email}</b><br>
        Password: <b style="background-color:#2E86C1;color:#fff">${options.password}</b>
        </div>
        `
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return false
        } else {
            console.log('Email sent: ' + info.response);
            return true
        }
    })
}