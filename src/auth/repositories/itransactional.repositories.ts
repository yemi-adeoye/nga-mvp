import { IMediaRepository } from "../../social/repositories/imedia.repository.js";
import { IPostRepository } from "../../social/repositories/ipost.repository.js";
import { IMediaPostRepository } from "../../social/repositories/ipostmedia.repository.js";
import { ITagRepository } from "../../social/repositories/itag.repository.js";
import { ITagPostRepository } from "../../social/repositories/itagpost.repository.js";
import { IProfileRepository } from "./iprofile.repository.js";
import { IUserRepository } from "./iuser.repository.js";
import { IVerificationTokenRepository } from "./iverification-token.repository.js";

export interface ITransactionalRepositories {
    user: IUserRepository
    profile: IProfileRepository
    verificationToken: IVerificationTokenRepository
    post: IPostRepository
    media: IMediaRepository
    mediaPost: IMediaPostRepository,
    tag: ITagRepository,
    tagPost: ITagPostRepository
}