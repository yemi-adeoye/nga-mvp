import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { index, int, mysqlTable, primaryKey, text } from "drizzle-orm/mysql-core";
import { userTable } from "../auth/schema.users.js";
import { auditColumns } from "../common/schema.common.js";
import { postTable } from "./schema.post.js";

export const mediaTable = mysqlTable("media", {
    id: int().primaryKey().autoincrement(),
    url: text().notNull(),
    userId: int().notNull().references(() => userTable.id),
    ...auditColumns
},
    (table) => [
        index("idx_url")
            .on(table.userId),

    ]
)

export const mediaPostTable = mysqlTable("post_media", {
    postId: int().notNull().references(() => postTable.id),
    mediaId: int().notNull().references(() => mediaTable.id),
},
    (table) => [
        primaryKey({ columns: [table.postId, table.mediaId] }),
        index("idx_post_media_media").on(table.mediaId, table.postId),
    ]
)

export type MediaRow = InferSelectModel<typeof mediaTable>;
export type NewMedia = InferInsertModel<typeof mediaTable>

export type MediaPostRow = InferSelectModel<typeof mediaPostTable>;
export type NewMediaPost = InferInsertModel<typeof mediaPostTable>