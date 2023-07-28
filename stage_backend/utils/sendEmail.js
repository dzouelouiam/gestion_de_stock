const nodemailer = require("nodemaimer");
// create email transporter
const sendEmail = async (subject, message, send_to, sent_from, reply_to)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 567,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    // option for sendin email
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }

    // send email
    transporter.sendMail(options, function (err, info){
        if(err){
            console.log(err);
        }
        console.log(info);
    })
};

module.exports= sendEmail;