import { CommentDatabase } from "../../database/comment/CommentDatabase";
import { PostDatabase } from "../../database/post/PostDatabase";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../../dtos/comment/createComment.dto";
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../../dtos/comment/deleteComment.dto";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../../dtos/comment/editComment.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import { Comment, CommentModelDB } from "../../models/comments/Comment";
import { PostModelDB } from "../../models/post/Post";
import { TokenPayload, USER_ROLES } from "../../models/user/User";
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
        //alimentando a tabela comments DB
        await this.commentDatabase.insertCommentDB(newComment.commentToDBModel())
        //incrementando a coluna comments na tabela de posts referenciando o id do post
        await  this.postDatabase.incrementComments(newComment.getPostId())

        const output: CreateCommentOutputDTO = {
            message: "comment created",
            comment: newComment.commentToBusinessModel(payload.name)
        }
        return output
    }

    public editComment = async (input: EditCommentInputDTO): Promise<EditCommentOutputDTO> => {
        const { id: commentId, token, content } = input

        //verificar se o token é válido
        const payload: TokenPayload | null = this.tokenManager.getPayload(token)
        if (payload === null) throw new BadRequestError("invalid token");
        
        //verificar se o comentário existe no DB pelo ID
        const commentDB: CommentModelDB | undefined = await this.commentDatabase.findCommentById(commentId)
        if(!commentDB) throw new NotFoundError("Id Comment not found");
        
        //verificar se o token é do criador do comentário
        if (payload.id !== commentDB.creator_id) throw new BadRequestError("only the creator can edit the comment");
                        
        await this.commentDatabase.updateComment(content, commentId)
        
        const output: EditCommentOutputDTO = {
            message: "updated comment"
        }
        return output
    }

    public deleteComment = async (input: DeleteCommentInputDTO): Promise<DeleteCommentOutputDTO> => {
        const { id: commentId, token } = input

        //verificando se o token é válido
        const payload: TokenPayload | null = this.tokenManager.getPayload(token)
        if (payload === null) throw new BadRequestError("invalid token");
        
        //verificando se o commentId existe no DB
        const commentDB: CommentModelDB | undefined = await this.commentDatabase.findCommentById(commentId)
        if (!commentDB) throw new NotFoundError("Id comment not found");

        //verificando se o token é de ADMIN ou creator
        if (payload.id !== commentDB.creator_id && payload.role !== USER_ROLES.ADMIN) throw new BadRequestError("you aren't authorized for this action");
        //deletando o comentário no DB
        await this.commentDatabase.deleteCommentById(commentId)
        //decrementando a coluna comments da tabela posts
        await this.postDatabase.decrementComments(commentDB.post_id)
        
        const output: DeleteCommentOutputDTO = {
            message: "comment deleted"
        }
        return output
    }
}