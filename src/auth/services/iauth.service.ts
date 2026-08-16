export interface IAuthService {
    ensureEmailIsAvailable(email: string): Promise<boolean>;
    ensureUsernameIsAvailable(username: string): Promise<boolean>;
    userIsOldEnough(dateOfBirth: Date): Promise<boolean>
}