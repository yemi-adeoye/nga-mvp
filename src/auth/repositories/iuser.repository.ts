import { NewUser } from "../../db/schema/auth/schema.users.js";
import { User } from "../auth.model.js";

export interface IUserRepository {
    create(user: NewUser): Promise<number>;

    findById(id: number): Promise<User | null>;

    findByUsername(username: string): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    findByPhone(phone: string): Promise<User | null>;

    phoneExists(phone: string): Promise<boolean>

    emailExists(email: string): Promise<boolean>

    update(user: User): Promise<void>;
}