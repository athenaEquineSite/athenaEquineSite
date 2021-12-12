import { NextApiRequest, NextApiResponse } from "next";
import Post from '../../../models/Post';
import { NextApiRequestWithFile } from '../gallery/upload';
import { cloudinaryUpload, cloudinaryDelete } from '../../../utils/cloudinary';
import { upload } from '../../../utils/multer';
import { formatBufferTo64 } from '../../../utils/data-uri';

export default async function updatePost(req: NextApiRequestWithFile, res: NextApiResponse) {
        upload.single('image')(req, {}, async err => {

            const {postId, eng, nor, cloudinaryId} = JSON.parse(req.body.formTextUpdatedData);
            const folderName = req.body.selection;

            if(err) return res.status(422).json(err.message);
            if(!postId) throw new Error("No post to update.");
            if(eng.title.length === 0 || nor.title.length === 0) throw new Error("Title cannot be empty.");
            if(eng.postBody.length === 0 || nor.postBody.length === 0) throw new Error("Body cannot be empty.");
            
            if(req.file) {
                const file64 = formatBufferTo64(req.file);
                const uploadResult = await cloudinaryUpload(file64.content, folderName);

                if(cloudinaryId) {
                    const oldImage = await cloudinaryDelete(cloudinaryId);
                }
    
                const imageOptions = {
                    cloudinaryId: uploadResult.public_id,
                    cloudinaryUrl: uploadResult.secure_url,
                }
                
                const updatePost = await Post.findOneAndUpdate({postId: postId}, {
                    eng: {
                        title: eng.title,
                        postBody: eng.postBody
                    },
                    nor: {
                        title: nor.title,
                        postBody: nor.postBody
                    },
                    cloudinaryId: imageOptions.cloudinaryId,
                    cloudinaryUrl: imageOptions.cloudinaryUrl
                });
                
                return res.status(200).json({postTextData: updatePost, message: "Upload successful", success: true});
            }
            
            const updatePost = await Post.findOneAndUpdate({postId: postId}, {
                eng: {
                    title: eng.title,
                    postBody: eng.postBody
                },
                nor: {
                    title: nor.title,
                    postBody: nor.postBody
                }
            });
            return res.status(200).json({postTextData: updatePost, message: "Upload successful", success: true});
        });
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}