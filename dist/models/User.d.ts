export interface IUser {
    collabId: string;
    role: number;
    email: string;
    password: string | undefined;
    passwordSalt: string | undefined;
    created: string;
    active: boolean;
}
