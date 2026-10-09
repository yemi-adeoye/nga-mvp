import { NewSession, SessionRow } from "../../db/schema/auth/schema.sessions.js";

export interface ISessionRepository {
    create(session: NewSession): Promise<void>
    findByUserId(userId: number): Promise<SessionRow | null>
    findByTokenHash(tokenHash: string): Promise<SessionRow | null>

}