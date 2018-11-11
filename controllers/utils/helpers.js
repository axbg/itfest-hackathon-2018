const constants = require('./constants');
const nodemailer = require('nodemailer');

module.exports.sendMail = function (email, content) {

    try {
        let mailerInstance = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: constants.gmailAccount.username,
                pass: constants.gmailAccount.password
            }
        });

        let mailOptions = {
            from: constants.gmailAccount.username,
            to: email,
            subject: 'Welcome to neverlate!',
            text: content,
            html: content
        }

        mailerInstance.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
        })
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
