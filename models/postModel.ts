import { v4 as uuidv4 } from 'uuid';

export class PostModel {
    postId: string;
    title: string;
    body: string;
    date: number;
    constructor(title: string, body: string) {
        this.postId = uuidv4();
        this.title = title;
        this.body = body;
        this.date = Date.now();
    }

    showPost() {
        return {
            postId: this.postId,
            title: this.title,
            body: this.body,
            date: new Date(this.date)
        }
    }
}