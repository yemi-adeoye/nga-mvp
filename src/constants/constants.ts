export const PORT = 9000
export const USER = 'user'
export const MODERATOR = 'moderator'
export const ADMIN = 'admin'

export const VERIFICATION_PENDING = "verification pending"
export const ACTIVE = "active"
export const BANNED = "banned"
export const SUSPENDED = "suspended"

export const USER_STATUSES = [VERIFICATION_PENDING, ACTIVE, BANNED, SUSPENDED] as const
export const USER_ROLES = [USER, MODERATOR, ADMIN] as const
export const VERIFICATION_TOKEN_TYPES = [
    "EMAIL_VERIFICATION",
    "PHONE_VERIFICATION",
    "PASSWORD_RESET",
    "EMAIL_CHANGE",
] as const;

export type VerificationTokenType =
    typeof VERIFICATION_TOKEN_TYPES[number];
export type UserStatus = typeof USER_STATUSES[number]
export type UserRole = typeof USER_ROLES[number]

export const NGS_NO_REPLY_EMAIL = "noreply@naijagistsoccer.com"

export const MIN_USER_AGE = 13

export const ISSUER = "NGS"

export const ACCESS_TOKEN_TTL_SECONDS = '15m'