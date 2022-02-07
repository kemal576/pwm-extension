export class TokenResponse {
    user_id: number
    email: string
    token: string

    constructor(userid:number, email:string, token:string) {
        this.user_id = userid
        this.email = email
        this.token = token
    }
}