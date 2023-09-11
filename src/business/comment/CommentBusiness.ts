import { CommentDatabase } from "../../database/comment/CommentDatabase";
import { PostDatabase } from "../../database/post/PostDatabase";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../../dtos/comment/createComment.dto";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../../dtos/comment/editComment.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import { Comment, CommentModelDB } from "../../models/comments/Comment";
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

    public editComment = async (input: EditCommentInputDTO): Promise<EditCommentOutputDTO> => {
        const { id, token, content } = input

        //verificar se o token é válido
        const payload: TokenPayload | null = this.tokenManager.getPayload(token)
        if (payload === null) throw new BadRequestError("invalid token");
        
        //verificar se o comentário existe no DB pelo ID
        const commentDB: CommentModelDB | undefined = await this.commentDatabase.findCommentById(id)
        if(!commentDB) throw new NotFoundError("Id Comment not found");
        
        //verificar se o token é do criador do comentário
        if (payload.id !== commentDB.creator_id) throw new BadRequestError("only the creator can edit the comment");
                        
        await this.commentDatabase.updateComment(content, id)
        
        const output: EditCommentOutputDTO = {
            message: "updated comment"
        }
        return output
    }
}