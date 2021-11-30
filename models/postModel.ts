import { v4 as uuidv4 } from 'uuid';

interface IBody {
    title: String;
    postBody: String;
}

export class PostModel {
    postId: string;
    eng: IBody;
    nor: IBody;
    date: number;
    constructor(eng: IBody, nor: IBody) {
        this.postId = uuidv4();
        this.eng = eng;
        this.nor = nor;
        this.date = Date.now();
    }

    showPost() {
        return {
            postId: this.postId,
            eng: this.eng,
            nor: this.nor,
            date: new Date(this.date)
        }
    }
}