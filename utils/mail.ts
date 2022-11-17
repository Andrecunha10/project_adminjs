require('dotenv').config();
const nodemailer = require('nodemailer');

export class Mail {
    transporter: any;

    constructor(){
        this.transporter = nodemailer.createTransport({
            port: process.env.EMAIL_PORT,
            host: process.env.EMAIL_SMTP,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
            secure: true
        })
    }

    public async sendMail(name: string, email: string, pin: string): Promise<void>{
        //TODO: CRIAR TEMPLATE

        const url = process.env.URL_CONFIRM_EMAIL

        const mailOptions = {
            from:process.env.EMAIL,
            to: email,
            subject: 'Confirmar Email',
            text: `
            Olá ${name}, Conforme seu email no link abaixo:

            ${url}?pin=${pin}

           Caso não funcione, clique no link abaixo e informe o PIN: ${pin}
            
            ${url}`};

            try {
                await  this.transporter.sendMail(mailOptions);
                return
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        
}