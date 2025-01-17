import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  tags: [{
    type: String
  }],
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);
