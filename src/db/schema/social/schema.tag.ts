import { index, int, mysqlEnum, mysqlTable, primaryKey, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { auditColumns } from "../common/schema.common.js";
import { postTable } from "./schema.post.js";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { ARENA, POST } from "../../../social/constants/constants.js";

export const TAG_CATEGORIES = [
    POST,
    ARENA,
] as const;

export const tagTable = mysqlTable(
    "tags",
    {
        id: int().primaryKey().autoincrement(),
        name: varchar({ length: 50 }).notNull(),
        slug: varchar({ length: 60 }).notNull(),
        category: mysqlEnum("category", TAG_CATEGORIES)
            .notNull()
            .default(POST),
        ...auditColumns
    },
    (table) => [
        uniqueIndex("uq_tags_slug").on(table.slug)
    ]
);


export const postTagTable = mysqlTable(
    "post_tags",
    {
        postId: int()
            .notNull()
            .references(() => postTable.id),

        tagId: int()
            .notNull()
            .references(() => tagTable.id),

    },
    (table) => [
        primaryKey({
            columns: [table.postId, table.tagId]
        }),
        index("idx_post_tags_tag").on(table.tagId, table.postId),
    ]
);

export type TagRow = InferSelectModel<typeof tagTable>;
export type NewTag = InferInsertModel<typeof tagTable>

export type PostTagRow = InferSelectModel<typeof postTagTable>;
export type NewPostTag = InferInsertModel<typeof postTagTable>