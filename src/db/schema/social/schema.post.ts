import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { index, int, mysqlTable, text, type AnyMySqlColumn } from "drizzle-orm/mysql-core";
import { userTable } from "../auth/schema.users.js";
import { auditColumns } from "../common/schema.common.js";

export const postTable = mysqlTable("posts", {
    id: int().primaryKey().autoincrement(),
    content: text(),
    userId: int().notNull().references(() => userTable.id),
    repostId: int().references((): AnyMySqlColumn => postTable.id),
    ...auditColumns
},
    (table) => [
        index("idx_posts_user_created")
            .on(table.userId, table.createdAt),

        index("idx_posts_repost")
            .on(table.repostId)
    ]
)

export type PostRow = InferSelectModel<typeof postTable>;
export type NewPost = InferInsertModel<typeof postTable>