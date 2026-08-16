import { eq } from "drizzle-orm";

import { Database, Transaction } from "../../../db/index.js";

import {
    profileTable,
    NewProfile,
    ProfileRow,
} from "../../../db/schema/auth/schema.profile.js";

import { IProfileRepository } from "../iprofile.repository.js";
import { Profile } from "../../auth.model.js";

export class DrizzleProfileRepository implements IProfileRepository {

    constructor(
        private readonly db: Database | Transaction
    ) { }

    async create(profile: NewProfile): Promise<void> {

        await this.db
            .insert(profileTable)
            .values(profile);
    }

    async findByUserId(userId: number): Promise<Profile | null> {

        const result = await this.db
            .select()
            .from(profileTable)
            .where(eq(profileTable.userId, userId))
            .limit(1);

        return this.toDomain(result[0]);
    }

    async update(profile: Profile): Promise<void> {

        await this.db
            .update(profileTable)
            .set(this.toProfileRow(profile))
            .where(eq(profileTable.userId, profile.userId));
    }

    private toDomain(row?: ProfileRow): Profile | null {

        if (!row) {
            return null;
        }

        return {
            userId: row.userId,
            firstName: row.firstName,
            lastName: row.lastName,
            displayName: row.displayName,
            dateOfBirth: row.dateOfBirth,
            countryCode: row.countryCode,
            favoriteClub: row.favoriteClub,
            bio: row.bio,
            photoUrl: row.photoUrl,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            deletedAt: row.deletedAt,
        };
    }

    private toProfileRow(profile: Profile): NewProfile {

        return {
            userId: profile.userId,
            firstName: profile.firstName,
            lastName: profile.lastName,
            displayName: profile.displayName,
            dateOfBirth: profile.dateOfBirth,
            countryCode: profile.countryCode,
            favoriteClub: profile.favoriteClub,
            bio: profile.bio,
            photoUrl: profile.photoUrl,
        };
    }
}