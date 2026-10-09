import { UserRole, UserStatus } from "../constants/constants.js"

export type LoginRequest = {
    username: string
    password: string
}

export type LoginResponse = {
    username?: string,
    message: string
    status: boolean
}

export type User = {
    id: number;
    username: string;
    email: string;
    emailVerified: boolean;
    phone: string | null;
    phoneVerified: boolean;
    passwordHash: string;
    lastLoginAt: Date | null;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type Profile = {
    userId: number,
    firstName: string,
    lastName: string,
    displayName: string
    dateOfBirth: Date
    countryCode: string | null,
    favoriteClub: string | null | undefined,
    bio: string | null,
    photoUrl: string | null,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,

}

export type Session = {
    userId: number,
    accessTokenExpireAt: Date,
    refreshTokenExpireAt: Date,
    revokedAt: Date | null,
    ipAddress: string,
    userAgent: string,
    refreshTokenHash: string,
    createdAt: Date
}

export type EmailMessage = {
    to: string;
    from: string;
    subject: string;
    text: string;
    html?: string;
}

export interface AuthenticatedUser {
    username: string,
    id: number,
    status: UserStatus
}