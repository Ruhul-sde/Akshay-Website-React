
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blogs
router.get('/all', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch blogs' });
  }
});

// Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    
    // Increment views
    const newViewCount = String(parseInt(blog.views) + 1);
    blog.views = newViewCount;
    await blog.save();
    
    res.json({ success: true, blog, views: newViewCount });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch blog' });
  }
});

// Like a blog
router.post('/:slug/like', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    
    blog.likes = String(parseInt(blog.likes) + 1);
    await blog.save();
    
    res.json({ success: true, likes: blog.likes });
  } catch (error) {
    console.error('Error liking blog:', error);
    res.status(500).json({ success: false, error: 'Failed to like blog' });
  }
});

module.exports = router;
