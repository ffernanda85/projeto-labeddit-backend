import express from 'express'
import { CommentController } from '../../controller/comment/CommentController'
import { CommentBusiness } from '../../business/comment/CommentBusiness'
import { CommentDatabase } from '../../database/comment/CommentDatabase'
import { TokenManager } from '../../services/TokenManager'
import { IdGenerator } from '../../services/IdGenerator'
import { PostDatabase } from '../../database/post/PostDatabase'
import { postRouter } from '../post/postRouter'

export const commentRouter = express.Router()

const commentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new PostDatabase()
    )
)

postRouter.post("/:id")