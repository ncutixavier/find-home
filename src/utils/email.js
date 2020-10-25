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
        subject: `${options.subject}`,
        html: `${options.message}`
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

