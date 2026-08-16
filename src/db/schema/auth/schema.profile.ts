import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { date, int, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'
import { auditColumns } from '../common/schema.common.js'
import { userTable } from './schema.users.js'

export const profileTable = mysqlTable("profiles", {
    userId: int().primaryKey().references(() => userTable.id),
    firstName: varchar({ length: 100 }).notNull(),
    lastName: varchar({ length: 100 }).notNull(),
    displayName: varchar({ length: 50 }).notNull(),
    dateOfBirth: date().notNull(),
    countryCode: varchar({ length: 2 }).default(""),
    favoriteClub: varchar({ length: 100 }).default(""),
    bio: text().default(""),
    photoUrl: varchar({ length: 512 }).default(""),
    ...auditColumns
}
)

export type ProfileRow = InferSelectModel<typeof profileTable>;
export type NewProfile = InferInsertModel<typeof profileTable>