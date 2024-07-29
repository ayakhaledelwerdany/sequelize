import { where } from "sequelize";
import { userModel } from "../../database/models/user.model.js";
import { postModel } from "../../database/models/post.model.js";
import { commentModel } from "../../database/models/comment.model.js";
import bcrypt from 'bcrypt'

const register = async(req,res)=>{
    const { username, email, password } = req.body;

    try {
      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'email already exist' });
      }
  
      const hashedPassword = await bcrypt.hashSync(password, 10); //10: عدد مرات الهاش
      const user = await userModel.create({ username, email, password: hashedPassword });
  
      res.status(201).json({ message: 'user registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  
}
const login = async(req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ where: { email } });
    
        if (!user) {
          return res.status(400).json({ message: 'user not exist' });
        }
    
        const isPasswordValid = await bcrypt.compareSync(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid  password' });
        }
    
        const loginStatus = await user.update({loginStatus:true})
            res.status(200).json({ message: 'Logged in successfully',user });
        
      } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
      }

}
const logout = async(req,res)=>{
    const {id}= req.query;
    const loginStatus = await user.update({loginStatus:false}, {where:{id}})
    res.json({message: "user logged out successfully", loginStatus})
}
const getUserWithPostAndComment = async (req, res) => {
    const { userId, postId } = req.params;
  
    try {
      const user = await userModel.findOne({
        where: { id: userId },
        include: {
          model: postModel,
          where: { id: postId },
          include: {
            model: commentModel,
            attributes: ['id', 'content', 'userId', 'postId']
          }
        }
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User or Post not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
  };


export {
    register,
    login,
    logout,
    getUserWithPostAndComment
}