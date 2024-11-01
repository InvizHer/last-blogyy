import express from 'express';
import multer from 'multer';
import path from 'path';
import { auth } from '../middleware/auth.js';
import Post from '../models/Post.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create post
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const post = new Post({
      title,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      slug
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ]
      };
    }

    if (tag) {
      query.tags = tag;
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Get single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Update post
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.content = content;
    post.tags = tags ? tags.split(',').map(tag => tag.trim()) : [];
    if (req.file) {
      post.imageUrl = `/uploads/${req.file.filename}`;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

export default router;
