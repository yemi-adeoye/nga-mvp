export interface IFeedRepository {
    getUserFeed(userId: number): Promise<any[]>
    getFeedByPostId(postId: number): Promise<any>
}