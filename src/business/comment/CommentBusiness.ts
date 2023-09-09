import { CommentDatabase } from "../../database/comment/CommentDatabase";
import { PostDatabase } from "../../database/post/PostDatabase";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../../dtos/comment/createComment.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import { Comment } from "../../models/comments/Comment";
import { PostModelDB } from "../../models/post/Post";
import { TokenPayload } from "../../models/user/User";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenManager } from "../../services/TokenManager";

export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private postDatabase: PostDatabase
    ){}

    public createComment = async (input: CreateCommentInputDTO): Promise<CreateCommentOutputDTO> => {
        const { token, content, post_id } = input

        const payload: TokenPayload | null = this.tokenManager.getPayload(token)
        if (payload === null) throw new BadRequestError("invalid token");

        const postDB: PostModelDB | undefined = await this.postDatabase.getPostById(post_id)
        if (!postDB) throw new NotFoundError("post not found");

        const id = this.idGenerator.generate()
        
        const newComment = new Comment(
            id,
            post_id,
            payload.id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )
        
        await this.commentDatabase.insertCommentDB(newComment.commentToDBModel())

        const output: CreateCommentOutputDTO = {
            message: "comment created",
            comment: newComment.commentToBusinessModel(payload.name)
        }
        return output
    }
}