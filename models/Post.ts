import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
    postId: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    date: {type: Date, required: true}
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;