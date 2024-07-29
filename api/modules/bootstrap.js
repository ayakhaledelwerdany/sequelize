import userRouter from "./user/user.routes.js"
import postRouter from "./post/post.routes.js"
import commentRouter from "./comment/comment.routes.js"
export const bootstrap = (app)=>{
    
app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)
}