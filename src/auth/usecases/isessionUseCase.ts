import { SessionDetails, UserInfo } from "./impl/session.usecase.js";

export interface ISessionUseCase {
    createSession(userId: UserInfo): Promise<SessionDetails>
    verifyRefreshToken(refreshToken: string): Promise<number | boolean>
    refreshToken(refreshToken: string): Promise<string>
}