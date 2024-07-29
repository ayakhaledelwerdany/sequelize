import { where } from "sequelize"
import { postModel } from "../../database/models/post.model.js"
import { userModel } from "../../database/models/user.model.js"


const getPosts = async (req, res) => {
    try {
      const posts = await postModel.findAll({
        include: { model: userModel, attributes: ['username', 'email'] }
      });
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve posts', error });
    }
  };
const createPost = async (req, res) => {
    const { title, content, authorId } = req.body;
  
    try {
      const author = await userModel.findByPk(authorId);
  
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }
  
      const newPost = await postModel.create({ title, content, authorId });
  
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      res.status(500).json({ message: 'Post creation failed', error });
    }}
    const getPostById = async (req, res) => {
        const { id } = req.params;
      
        try {
          const post = await postModel.findByPk(id, {
            include: { model: userModel, attributes: ['username', 'email'] }
          });
      
          if (!post) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          res.status(200).json(post);
        } catch (error) {
          res.status(500).json({ message: 'Failed to retrieve post', error });
        }
      };
      const updatePost = async (req, res) => {
        const { id } = req.params;
        const { title, content } = req.body;
      
        try {
          const post = await postModel.findByPk(id);
      
          if (!post) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          post.title = title;
          post.content = content;
          await post.save();
      
          res.status(200).json({ message: 'Post updated successfully', post });
        } catch (error) {
          res.status(500).json({ message: 'Post update failed', error });
        }
      };
      const softDeletePost = async (req, res) => {
        const { id } = req.params;
      
        try {
          const post = await postModel.findByPk(id);
      
          if (!post || post.deletedAt !== null) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          post.deletedAt = new Date();
      
          await post.save();
      
          res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting post', error });
        }
      };
const getPostWithAuthor = async (req, res) => {
        const { id } = req.params;
      
        try {
          const post = await postModel.findOne({
            where: { id },
            include: {
              model: userModel,
              attributes: ['id', 'username', 'email']
            }
          });
      
          if (!post) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          res.status(200).json({ post });
        } catch (error) {
          res.status(500).json({ message: 'Error fetching post', error });
        }
      };
  export  {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    softDeletePost,
    getPostWithAuthor
  }