import express from 'express'
import { PostController } from '../../controller/post/PostController'
import { PostBusiness } from '../../business/post/PostBusiness'
import { TokenManager } from '../../services/TokenManager'
import { PostDatabase } from '../../database/post/PostDatabase'
import { IdGenerator } from '../../services/IdGenerator'
import { LikeDislikePostDatabase } from '../../database/post/LikeDislikePostDatabase'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new TokenManager(),
        new PostDatabase(),
        new IdGenerator(),
        new LikeDislikePostDatabase()
    )
)

/************* Endpoints Posts **************/

/*=================== Create Post =========================*/
postRouter.post("/", postController.createPost)
/*=================== Get Posts ============================*/
postRouter.get("/", postController.getPosts)
/*=================== Get Post By Id ============================*/
postRouter.get("/:id", postController.getPostById)
/*=================== Edit Post ===========================*/
postRouter.put("/:id", postController.editPost)
/*=================== Delete Post =========================*/
postRouter.delete("/:id", postController.deletePost)
/*=================== Like and Dislike Post ===============*/
postRouter.put("/:id/like", postController.likeDislike)
