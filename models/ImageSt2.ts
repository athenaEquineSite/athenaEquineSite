import mongoose, { Schema } from 'mongoose';

const ImageSt2Schema = new Schema({
    cloudinaryId: {type: String, required: true},
    cloudinaryUrl: {type: String, required: true},
    createdAt: {type: Date, required: true}
});
ImageSt2Schema.set('toJSON', {virtuals: true});
const ImageSt2 = mongoose.models.ImageSt2 || mongoose.model('ImageSt2', ImageSt2Schema);

export default ImageSt2;