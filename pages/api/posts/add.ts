import { NextApiResponse } from "next";
import Post from '../../../models/Post';
import dbConnect from "../../../utils/dbConnect";
import { PostModel } from '../../../models/postModel';
import { NextApiRequestWithFile } from '../gallery/upload';
import { cloudinaryUpload } from '../../../utils/cloudinary';
import { upload } from '../../../utils/multer';
import { formatBufferTo64 } from '../../../utils/data-uri';


export default async function addPost(req: NextApiRequestWithFile, res: NextApiResponse) {
    await dbConnect();
        upload.single('image')(req, {}, async err => {
            const folderName = req.body.selection;
            const {eng, nor} = JSON.parse(req.body.formTextData);
            
            if(err) return res.status(422).json(err.message);

            if(eng.title.length === 0 || nor.title.length === 0) throw new Error("Title cannot be empty.");
            if(eng.postBody.length === 0 || nor.postBody.length === 0) throw new Error("Body cannot be empty.");

            if(req.file) {
                const file64 = formatBufferTo64(req.file);
                const uploadResult = await cloudinaryUpload(file64.content, folderName);
    
                const imageOptions = {
                    cloudinaryId: uploadResult.public_id,
                    cloudinaryUrl: uploadResult.secure_url,
                }
                const newPost = new PostModel(eng, nor, imageOptions).showPost();
                
                const postImageLoaded = await Post.create(newPost);
                
                return res.status(200).json({postTextData: postImageLoaded, message: "Upload successful", success: true});
            }
    
            const newPost = new PostModel(eng, nor).showPost();
            const postToDb = await Post.create(newPost);
            
            return res.status(200).json({postTextData: postToDb, message: "Upload successful", success: true});

        });
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}