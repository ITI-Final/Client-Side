interface IChat {
    id?: number;
    message?: string;
    date?: string;
    time?: string;
    sender_ID?: number;
    receiver_ID?: number;
}
export class Chat implements IChat {
    id?: number;
    message?: string;
    date?: string;
    time?: string;
    sender_ID?: number;
    receiver_ID?: number;


    constructor(message: string, date: string, time: string, sender_ID: number, receiver_ID: number) {
        this.message = message;
        this.date = date;
        this.time = time;
        this.sender_ID = sender_ID;
        this.receiver_ID = receiver_ID;
    }
}