import mongoose, { Schema } from 'mongoose';

const BodySchema = new Schema({
   title:  {type: String, required: true},
   postBody: {type: String, required: true}
});

const PostSchema = new Schema({
    postId: {type: String, required: true},
    eng: BodySchema,
    nor: BodySchema,
    date: {type: Date, required: true}
});
PostSchema.set('toJSON', {virtuals: true});
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;