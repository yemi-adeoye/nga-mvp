export interface IFeedUseCase {
    execute(postId: number): Promise<any>
}