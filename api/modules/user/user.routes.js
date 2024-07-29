import { Router  } from "express";
import { userModel } from "../../database/models/user.model.js";
import { postModel } from "../../database/models/post.model.js";
import { commentModel } from "../../database/models/comment.model.js";
import { register, login, logout,getUserWithPostAndComment } from "./user.controller.js";
const userRouter = Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.patch('/logout',logout)
userRouter.get('/users/:userId/posts/:postId/comments',getUserWithPostAndComment)



export default userRouter