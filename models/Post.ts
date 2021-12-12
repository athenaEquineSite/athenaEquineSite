import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
    postId: {type: String, required: true},
    eng: {
        title: {type: String, required: true},
        postBody: {type: String, rrequired: true}
    },
    nor: {
        title: {type: String, required: true},
        postBody: {type: String, rrequired: true}
    },
    cloudinaryId: {type: String},
    cloudinaryUrl: {type: String},
    date: {type: Date, required: true}
});
PostSchema.set('toJSON', {virtuals: true});
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;