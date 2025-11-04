export class LoggedInUser {
    user?: {
        id: number,
        username: string,
        email: string
    };
    access_token?: string;
}