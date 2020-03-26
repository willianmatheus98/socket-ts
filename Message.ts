export class Message {
    public userId: number;
    public message: string;

    constructor(userId: number, message: string){
        this.message = message;
        this.userId = userId;
    }
}