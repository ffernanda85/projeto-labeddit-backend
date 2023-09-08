import express from 'express'
import { PostController } from '../../controller/post/PostController'
import { PostBusiness } from '../../business/post/PostBusiness'
import { TokenManager } from '../../services/TokenManager'
import { PostDatabase } from '../../database/post/PostDatabase'
import { IdGenerator } from '../../services/IdGenerator'
import { LikeDislikeDatabase } from '../../database/post/LikeDislikeDatabase'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new TokenManager(),
        new PostDatabase(),
        new IdGenerator(),
        new LikeDislikeDatabase()
    )
)

postRouter.post("/", postController.createPost)
postRouter.get("/", postController.getPosts)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/:id/like", postController.likeDislike)