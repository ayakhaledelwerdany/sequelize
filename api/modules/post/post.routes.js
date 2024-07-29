import { Router } from "express"

import { getPosts ,createPost,getPostById,updatePost,softDeletePost,getPostWithAuthor} from "./post.controller.js"

const postRouter = Router()
postRouter.get('/posts',getPosts)
postRouter.post('/createPost',createPost)
postRouter.get('/getPostById/:id',getPostById)
postRouter.put('/updatePost/:id',updatePost)
postRouter.delete('/softDeletePost/:id',softDeletePost)
postRouter.get('/posts/:id/author',getPostWithAuthor)





export default postRouter