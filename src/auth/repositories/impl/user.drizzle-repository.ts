import { eq, SQL } from "drizzle-orm";
import { Database, Transaction } from "../../../db/index.js";
import { NewUser, UserRow, userTable } from "../../../db/schema/auth/schema.users.js";
import { IUserRepository } from "../iuser.repository.js";
import { User } from "../../auth.model.js";

export class DrizzleUserRepository implements IUserRepository {

    constructor(private readonly db: Database | Transaction) { }

    update(user: Partial<User>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async create(user: User): Promise<number> {


        const result = await this.db
            .insert(userTable)
            .values(user)
            .$returningId();

        return result[0].id;
    }

    async findById(id: number): Promise<User | null> {

        const result = await this.db
            .select()
            .from(userTable)
            .where(eq(userTable.id, id))
            .limit(1)

        return this.toDomain(result[0]);
    }

    async emailExists(email: string): Promise<boolean> {
        const user = await this.findByEmail(email)

        return user !== null
    }

    async phoneExists(phone: string): Promise<boolean> {
        const user = await this.findByPhone(phone)

        return user != null;
    }

    async findByUsername(username: string): Promise<User | null> {

        const result = await this.db
            .select()
            .from(userTable)
            .where(eq(userTable.username, username))
            .limit(1)

        return this.toDomain(result[0]);
    }

    async findByEmail(email: string): Promise<User | null> {

        const result = await this.db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email))
            .limit(1)

        return this.toDomain(result[0]);
    }

    async findByPhone(phone: string): Promise<User | null> {

        const result = await this.db
            .select()
            .from(userTable)
            .where(eq(userTable.phone, phone))
            .limit(1)



        return this.toDomain(result[0]);
    }

    private toDomain(row?: UserRow): User | null {

        if (!row) {
            return null;
        }
        return {
            id: row.id,
            username: row.username,
            email: row.email,
            emailVerified: row.emailVerified,
            phone: row.phone,
            phoneVerified: row.phoneVerified,
            passwordHash: row.passwordHash,
            lastLoginAt: row.lastLoginAt,
            role: row.role,
            status: row.status,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            deletedAt: row.deletedAt,
        };
    }

    private toUserRow(user: User): NewUser {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            emailVerified: user.emailVerified,
            phone: user.phone,
            phoneVerified: user.phoneVerified,
            passwordHash: user.passwordHash,
            lastLoginAt: user.lastLoginAt,
            role: user.role,
            status: user.status,

        };
    }

    // TODO use this to DRY functions above
    private async findOne(
        predicate: SQL
    ): Promise<User | null> {

        const result = await this.db
            .select()
            .from(userTable)
            .where(predicate)
            .limit(1);

        return this.toDomain(result[0]);
    }
}
