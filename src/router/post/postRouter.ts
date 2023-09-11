import express from 'express'
import { PostController } from '../../controller/post/PostController'
import { PostBusiness } from '../../business/post/PostBusiness'
import { TokenManager } from '../../services/TokenManager'
import { PostDatabase } from '../../database/post/PostDatabase'
import { IdGenerator } from '../../services/IdGenerator'
import { LikeDislikeDatabase } from '../../database/post/LikeDislikeDatabase'
import { CommentController } from '../../controller/comment/CommentController'
import { CommentBusiness } from '../../business/comment/CommentBusiness'
import { CommentDatabase } from '../../database/comment/CommentDatabase'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new TokenManager(),
        new PostDatabase(),
        new IdGenerator(),
        new LikeDislikeDatabase()
    )
)

const commentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new PostDatabase()
    )
)

/************* Endpoints Posts **************/

/*=================== Create Post =========================*/
postRouter.post("/", postController.createPost)
/*=================== Get Post ============================*/
postRouter.get("/", postController.getPosts)
/*=================== Edit Post ===========================*/
postRouter.put("/:id", postController.editPost)
/*=================== Delete Post =========================*/
postRouter.delete("/:id", postController.deletePost)
/*=================== Like and Dislike Post ===============*/
postRouter.put("/:id/like", postController.likeDislike)

