import { v4 as uuidv4 } from 'uuid';

interface IBody {
    title: String;
    postBody: String;
}

interface IPostImage {
    cloudinaryId: String;
    cloudinaryUrl: String;
    imageDimensions: {
        width: Number,
        height: Number
    }
}

export class PostModel {
    postId: string;
    eng: IBody;
    nor: IBody;
    postImage: IPostImage;
    date: number;

    constructor(eng: IBody, nor: IBody, postImage?: IPostImage) {
        this.postId = uuidv4();
        this.eng = eng;
        this.nor = nor;
        if(postImage) {
            this.postImage = postImage;
        }
        this.date = Date.now();
    }

    showPost() {
        if(this.postImage) {
            return {
                postId: this.postId,
                eng: this.eng,
                nor: this.nor,
                cloudinaryId: this.postImage.cloudinaryId,
                cloudinaryUrl: this.postImage.cloudinaryUrl,
                imageDimensions: this.postImage.imageDimensions,
                date: new Date(this.date)
            }
        }
        return {
            postId: this.postId,
            eng: this.eng,
            nor: this.nor,
            date: new Date(this.date)
        }
    }
}