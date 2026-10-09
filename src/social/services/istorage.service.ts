export interface IMediaStorageService {
    upload(file: string, type: string, key: string): Promise<void>
    // upload(files: string[], key: string): Promise<void>
    createBucket(bucketName: string): Promise<void>
    readFile(path: string): void
    readFileFromRequest(): void
}