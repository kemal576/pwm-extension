export class Login {
    id: number
    url: string
    identity: string
    password: string
    created_at: Date
    updated_at: Date
    userId: number


    constructor(id: number, url: string, identity: string, password: string,
        createdAt: Date, updatedAt: Date, userId: number) {
        this.id = id,
        this.url = url,
        this.identity = identity,
        this.password = password,
        this.created_at = createdAt,
        this.updated_at = updatedAt,
        this.userId = userId
    }
}