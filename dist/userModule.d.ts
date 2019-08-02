import { IUser } from "./models/User";
export declare function getUserByMail(token: string, pEmail: string, API_URL: string, API_KEY: string): Promise<IUser | undefined>;
export declare function createUser(token: string, pUser: IUser, API_URL: string, API_KEY: string): Promise<IUser | undefined>;
