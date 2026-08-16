import { EmailMessage } from "../auth.model.js";

export interface IEmailService {
    send(email: EmailMessage): Promise<boolean>
}