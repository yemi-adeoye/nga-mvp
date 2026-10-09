import { Database } from "../../../db/index.js";
import { profileTable } from "../../../db/schema/auth/schema.profile.js";
import { mediaPostTable, mediaTable } from "../../../db/schema/social/schema.media.js";
import { postTable } from "../../../db/schema/social/schema.post.js";
import { postTagTable, tagTable } from "../../../db/schema/social/schema.tag.js";
import { IFeedRepository } from "../ifeed.repository.js";
import { eq, exists, inArray } from 'drizzle-orm'

const postFields = ['content', 'userId', 'repostId']
const userFields = ['content', 'userId', 'repostId']

export class DrizzleFeedRepository implements IFeedRepository {
    constructor(private readonly db: Database) {

    }
    async getUserFeed(userId: number): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    async getFeedByPostId(postId: number): Promise<any> {
        const post = await this.db
            .select({ postId: postTable.id, content: postTable.content, userId: postTable.userId })
            .from(postTable)
            .where(eq(postTable.id, postId))

        const user = await this.db
            .select({
                firstName: profileTable.firstName,
                lastName: profileTable.lastName,
                club: profileTable.favoriteClub,
                displayName: profileTable.displayName

            }).from(profileTable)
            .where(eq(profileTable.userId, post[0].userId))

        const media = await this.db
            .select({ url: mediaTable.url })
            .from(mediaPostTable)
            .innerJoin(mediaTable, eq(mediaTable.id, mediaPostTable.mediaId))
            .where(eq(mediaPostTable.postId, postId))

        const tags = await this.db
            .select({ tag: tagTable.name })
            .from(postTagTable)
            .innerJoin(tagTable, eq(tagTable.id, postTagTable.tagId))
            .where(eq(postTagTable.postId, postId))

        console.log(media)

        return { post: post[0], user: user[0], media, tags }

    }
}