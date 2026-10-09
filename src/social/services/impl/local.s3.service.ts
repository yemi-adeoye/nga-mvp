import { CreateBucketCommand, PutObjectCommand, S3Client, waitUntilBucketExists } from "@aws-sdk/client-s3";
import { IMediaStorageService } from "../istorage.service.js";
import { SOCIAL_BUCKET } from "../../constants/constants.js";
import { createReadStream } from "node:fs";

export class LocalS3Service implements IMediaStorageService {

    private readonly s3Client;
    constructor() {
        this.s3Client = new S3Client({
            endpoint: 'http://192.168.40.146:8333',
            region: 'us-east-1',
            credentials: {
                accessKeyId: 'ngsadmin',
                secretAccessKey: 'ngsdevsecret'
            },
            forcePathStyle: true
        })
    }
    readFileFromRequest(): void {
        throw new Error("Method not implemented.");
    }

    async readFile(path: string): Promise<void> {
        // return file
        throw new Error("Method not implemented.");
    }


    upload(file: string, type: string, key: string): Promise<void>;
    // upload(files: string[], key: string): Promise<void>;
    async upload(path: string, type: string, key: string): Promise<void> {
        const command = new PutObjectCommand({
            Bucket: SOCIAL_BUCKET,
            Key: key,
            Body: createReadStream(path),
            ContentType: type
        })

        const response = await this.s3Client.send(command)

    }

    async createBucket(bucketName: string) {
        try {
            const { Location } = await this.s3Client.send(
                new CreateBucketCommand({
                    Bucket: bucketName
                })
            )

            await waitUntilBucketExists({ client: this.s3Client, maxWaitTime: 4000 }, { Bucket: bucketName })
            console.log(`Bucket created with location: ${Location}`)
        } catch (error) {
            console.log(error)
        }
    }

}