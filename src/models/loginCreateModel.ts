export class LoginCreateModel {
    URL: string
    Identity: string
    Password: string
    UserId: number


    constructor(url: string, identity: string, password: string, userId: number) {
        this.URL = url,
        this.Identity = identity,
        this.Password = password,
        this.UserId = userId
    }
}