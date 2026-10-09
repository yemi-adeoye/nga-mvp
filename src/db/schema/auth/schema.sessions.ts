import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { userTable } from "./schema.users.js";

export const sessionTable = mysqlTable("sessions", {
    id: int().notNull().primaryKey().autoincrement(),
    userId: int().references(() => userTable.id),
    refreshTokenHash: varchar({ length: 64 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    lastUsedAt: timestamp(),
    accessTokenExpireAt: timestamp().notNull(),
    refreshTokenExpireAt: timestamp().notNull(),
    revokedAt: timestamp(),
    ipAddress: varchar({ length: 128 }),
    userAgent: text()
},
    (mysqlTable) => [
        uniqueIndex("idx_verification_tokens_user_type")
            .on(mysqlTable.refreshTokenHash),
    ])

export type SessionRow = InferSelectModel<typeof sessionTable>;
export type NewSession = InferInsertModel<typeof sessionTable>