import mongoose, { Schema } from 'mongoose';

const ImageSt1Schema = new Schema({
    cloudinaryId: {type: String, required: true},
    cloudinaryUrl: {type: String, required: true},
    createdAt: {type: Date, required: true}
});
ImageSt1Schema.set('toJSON', {virtuals: true});
const ImageSt1 = mongoose.models.ImageSt1 || mongoose.model('ImageSt1', ImageSt1Schema);
export default ImageSt1;