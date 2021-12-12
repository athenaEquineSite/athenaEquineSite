import { NextApiRequest, NextApiResponse } from 'next';
import { cloudinaryUpload } from '../../../utils/cloudinary';
import { upload } from '../../../utils/multer';
import { formatBufferTo64 } from '../../../utils/data-uri';
import ImageSt1 from '../../../models/ImageSt1';
import ImageSt2 from '../../../models/ImageSt2';
import dbConnect from '../../../utils/dbConnect';

export type NextApiRequestWithFile = NextApiRequest & {
    file: unknown
}

async function uploadImage(req: NextApiRequestWithFile, res: NextApiResponse) {
    await dbConnect();
        upload.single('image')(req, {}, async err => {
            const folderName = req.body.selection;
            
            let image1loaded, image2loaded;
            if(!req.file) return res.status(422).json({message: "Upload failed", success: false});
            if(err) return res.status(422).json(err.message);
            
            const file64 = formatBufferTo64(req.file);
            const uploadResult = await cloudinaryUpload(file64.content, folderName);

            const imageOptions = {
                cloudinaryId: uploadResult.public_id,
                cloudinaryUrl: uploadResult.secure_url,
                createdAt: new Date()
            }
            
            if(folderName === 'Stall_Kolbjornrud_Hestepensjonat') { 
                image1loaded = await ImageSt1.create(imageOptions);
            }
            if(folderName === 'Solberg_Gard') { 
                image2loaded = await ImageSt2.create(imageOptions);
            }
            return res.json({cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url, kolbjornrud: image1loaded, solberg: image2loaded, message: "Upload successful", success: true})
        });
}

export default uploadImage;

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
