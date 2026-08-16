import { User } from "./auth.model.js";
import { IRepository } from "./auth.repository.interface.js";

const users = new Map<string, User>();

const user1: User = {
    username: 'yhemmi',
    id: 1,
    firstName: 'Yemi',
    lastName: 'Adeoye',
    fullName: 'Yemi Adeoye',
    password: 'letmein',
}

const user2: User = {
    username: 'yinkus',
    id: 1,
    firstName: 'Yemi',
    lastName: 'Adeoye',
    fullName: 'Yemi Adeoye',
    password: 'letmein',
}
users.set(user1.username, user1);
users.set(user2.username, user2);

export class AuthRepository implements IRepository {
    async findByUsername(username: string): Promise<User | null> {
        return users.get(username) ?? null
    }
}

