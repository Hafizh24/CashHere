const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'vadittolk@gmail.com',
        pass:'ubiw niej uoci swae'
    },
    tls:{
        rejectUnauthorized: false
    }
})

module.exports = transporter;