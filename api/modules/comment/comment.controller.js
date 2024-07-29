import { commentModel } from "../../database/models/comment.model.js";
import { userModel } from "../../database/models/user.model.js";
import { postModel } from "../../database/models/post.model.js";

// Create a new comment
 const createComment = async (req, res) => {
  const { content, postId, userId } = req.body;

  try {
    const post = await postModel.findByPk(postId);
    const user = await userModel.findByPk(userId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newComment = await commentModel.create({
      content,
      postId,
      userId
    });

    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error });
  }
};

// Get all comments
 const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.findAll({
      include: [
        {
          model: postModel,
          attributes: ['id', 'title']
        },
        {
          model: userModel,
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

// Get a comment by ID
 const getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await commentModel.findOne({
      where: { id },
      include: [
        {
          model: postModel,
          attributes: ['id', 'title']
        },
        {
          model: userModel,
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comment', error });
  }
};

// Update a comment
 const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await commentModel.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.content = content;

    await comment.save();

    res.status(200).json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

// Delete a comment by ID
 const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await commentModel.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await comment.destroy();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};
export{
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
}