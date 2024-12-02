import nodemailer from "nodemailer";

export default async function sendMail(mail){
    const transport = nodemailer.createTransport({
        port: 587,
        secure: false,
        host: "sandbox.smtp.mailtrap.io",
        auth: {
            user: process.env.ADMIN_USER,
            pass: process.env.ADMIN_PASSWORD
        }
    });

    const mailInfo = await transport.sendMail({
        from: "Slice Rush <slicerush@gmail.com>",
        to: mail.to,
        subject: mail.subject,
        html: mail.content
    })
    
    console.log("EMAIL SENT TO ADMIN: ", mailInfo);
}