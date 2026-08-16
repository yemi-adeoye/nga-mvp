import { EmailMessage } from "../../auth.model.js";
import { IEmailService } from "../iemail.service.js";
import nodemailer from 'nodemailer'

export class MailPitEmailService implements IEmailService {
    private readonly transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false
    });

    async send(email: EmailMessage): Promise<boolean> {
        this.transporter.sendMail(email)
        console.log("Verification email sent")
        return true
    }

}