var nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ioservicestatus@gmail.com',
            pass: 'io$ervicemailer'
        }
    });
// export module
module.exports = {
    report: function(serv_id, serv_title, serv_msg) {
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'auto-mailer', // sender address
            to: 'ioservicestatus@gmail.com', // list of receivers
            subject: '[id:' + serv_id + '][' + serv_title + '] Status: ' + serv_msg, // Subject line
            html: '' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }
};