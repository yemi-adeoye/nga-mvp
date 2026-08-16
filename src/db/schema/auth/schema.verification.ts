import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { index, int, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { VERIFICATION_TOKEN_TYPES } from '../../../constants/constants.js'
import { userTable } from './schema.users.js'

export const verificationTokenTable = mysqlTable("verification_tokens", {
    id: int().primaryKey().autoincrement(),
    userId: int().notNull().references(() => userTable.id),
    type: mysqlEnum(VERIFICATION_TOKEN_TYPES).notNull(),
    tokenHash: varchar({ length: 256 }).notNull(),
    expiresAt: timestamp().notNull(),
    usedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull()

},
    (mysqlTable) => [
        index("idx_verification_tokens_user_type")
            .on(mysqlTable.userId, mysqlTable.type),
    ]
)

export type VerificationToken =
    InferSelectModel<typeof verificationTokenTable>;

export type NewVerificationToken =
    InferInsertModel<typeof verificationTokenTable>;