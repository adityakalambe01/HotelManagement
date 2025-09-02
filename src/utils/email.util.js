const nodemailer = require("nodemailer");
const { smtp } = require("../config");

exports.sendEmail = async (to, subject, html) => {
    let transporter;

    if (smtp.provider === "gmail") {
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: smtp.email,
                pass: smtp.password
            }
        });
    } else if (smtp.provider === "titan") {
        transporter = nodemailer.createTransport({
            host: "smtp.titan.email",
            port: 587,
            secure: false, // STARTTLS
            auth: {
                user: smtp.email,
                pass: smtp.password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    } else if (smtp.provider === "custom") {
        transporter = nodemailer.createTransport({
            host: smtp.host,
            port: Number(smtp.port),
            secure: smtp.secure,
            auth: {
                user: smtp.email,
                pass: smtp.password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    } else {
        throw new Error("Unsupported SMTP provider: " + smtp.provider);
    }

    await transporter.sendMail({
        from: `"Taskmate" <${smtp.email}>`,
        to,
        subject,
        html
    });
};