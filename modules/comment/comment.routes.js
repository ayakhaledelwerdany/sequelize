import { Router } from "express"

import { createComment, getAllComments,getCommentById,updateComment,deleteComment} from "./comment.controller.js"

const commentRouter = Router()
commentRouter.post('/createComment',createComment)
commentRouter.get('/getAllComments',getAllComments)
commentRouter.get('/getCommentById/:id',getCommentById)
commentRouter.put('/updateComment/:id',updateComment)
commentRouter.delete('/deleteComment/:id',deleteComment)





export default commentRouter