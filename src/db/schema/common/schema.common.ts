import { timestamp } from 'drizzle-orm/mysql-core'

export const auditColumns = {
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp()
}