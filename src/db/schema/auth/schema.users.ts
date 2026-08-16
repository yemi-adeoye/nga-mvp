import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { boolean, int, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { USER, USER_ROLES, USER_STATUSES, VERIFICATION_PENDING } from '../../../constants/constants.js'
import { auditColumns } from '../common/schema.common.js'

export const userTable = mysqlTable("users", {
    id: int().primaryKey().autoincrement(),
    username: varchar({ length: 50 }).unique().notNull(),
    email: varchar({ length: 100 }).unique().notNull(),
    emailVerified: boolean().default(false).notNull(),
    phone: varchar({ length: 20 }).unique(),
    phoneVerified: boolean().default(false).notNull(),
    passwordHash: varchar({ length: 256 }).notNull(),
    lastLoginAt: timestamp(),
    role: mysqlEnum(USER_ROLES).default(USER).notNull(),
    status: mysqlEnum(USER_STATUSES).default(VERIFICATION_PENDING).notNull(),
    ...auditColumns


})

export type UserRow = InferSelectModel<typeof userTable>
export type NewUser = InferInsertModel<typeof userTable>

