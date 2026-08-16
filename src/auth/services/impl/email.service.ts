import { EmailMessage } from "../../auth.model.js";
import { IEmailService } from "../iemail.service.js";

export class EmailService implements IEmailService {
    async send(email: EmailMessage): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}