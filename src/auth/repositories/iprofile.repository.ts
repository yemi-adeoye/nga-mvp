import { NewProfile, ProfileRow } from "../../db/schema/auth/schema.profile.js";
import { Profile } from "../auth.model.js";

export interface IProfileRepository {
    create(profile: NewProfile): Promise<void>;

    findByUserId(userId: number): Promise<Profile | null>;

    update(profile: Profile): Promise<void>;
}