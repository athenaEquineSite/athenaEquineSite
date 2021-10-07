import { NextApiRequest, NextApiResponse } from 'next';
import { cloudinaryUpload } from '../../../utils/cloudinary';
import { upload } from '../../../utils/multer';
import { formatBufferTo64 } from '../../../utils/data-uri';
import ImageSt1 from '../../../models/ImageSt1';
import ImageSt2 from '../../../models/ImageSt2';
import dbConnect from '../../../utils/dbConnect';

type NextApiRequestWithFile = NextApiRequest & {
    file: unknown
}

async function uploadImage(req: NextApiRequestWithFile, res: NextApiResponse) {
    await dbConnect();
        upload.single('image')(req, {}, async err => {
            const folderName = req.body.selection;

            if(!req.file) throw new Error('No file uploaded.');
            if(err) return res.status(422).json(err.message);

            const file64 = formatBufferTo64(req.file);
            const uploadResult = await cloudinaryUpload(file64.content, folderName);

            const imageOptions = {
                cloudinaryId: uploadResult.public_id,
                cloudinaryUrl: uploadResult.secure_url,
                createdAt: new Date()
            }
            
            if(folderName === 'stable1') { 
                await ImageSt1.create(imageOptions);
            }
            if(folderName === 'stable2') { 
                await ImageSt2.create(imageOptions);
            }
            return res.json({cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url})
        });
}

export default uploadImage;

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
