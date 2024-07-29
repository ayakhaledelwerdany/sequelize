import express from 'express'
import sequelize from './database/dbConnection.js'
import { bootstrap } from './modules/bootstrap.js'
import { postModel } from './database/models/post.model.js'
import { userModel } from './database/models/user.model.js'
import { commentModel } from './database/models/comment.model.js'
const app = express()
const port = process.env.port || 5000


sequelize.sync(
   {alter:true,
  //force:true
   }
)
app.use(express.json())
app.get('/',(req,res)=>{
   res.json({message:"hello world"})
})

bootstrap(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))