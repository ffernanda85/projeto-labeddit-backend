import { CommentModel, CommentModelDB } from "../../models/comments/Comment"
import { BaseDatabase } from "../BaseDatabase"

export class CommentDatabase extends BaseDatabase {
    TABLE_NAME = 'comments'

    public insertCommentDB = async (newComment: CommentModelDB): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).insert(newComment)
    }

    public findCommentById = async (id: string): Promise<CommentModelDB | undefined> => {
        const [commentDB]: CommentModelDB[] | undefined = await BaseDatabase.connection(this.TABLE_NAME).where({ id })
        return commentDB
    }

    public updateComment = async (content: string, id: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).update({ content, updated_at: new Date().toISOString() }).where({ id })
    }

    public deleteCommentById = async (id: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).del().where({ id })
    }

    public getCommentsByPostId = async (postId: string): Promise<CommentModel[]> => {
        const commentsDB: CommentModel[] = await BaseDatabase.connection(this.TABLE_NAME)
            .select(
                "comments.id",
                "posts.id as postId",
                "comments.creator_id",
                "comments.content",
                "comments.likes",
                "comments.dislikes",
                "comments.created_at",
                "comments.updated_at",
                "users.name as creatorName"
            )
            .innerJoin("posts", "posts.id", "comments.post_id")
            .innerJoin("users", "users.id", "comments.creator_id").where("comments.post_id","=", `${postId}`)
        
        return commentsDB
    }

    public incrementLikeComment = async (commentId: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
            .increment("likes")
            .where({ commentId })
    }

    public decrementLikeComment = async (commentId: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
            .decrement("likes")
            .where({ commentId })
    }

    public incrementDislikeComment = async (commentId: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
            .increment("dislikes")
            .where({ commentId })
    }

    public decrementDislikeComment = async (commentId: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
            .decrement("dislikes")
            .where({ commentId })
    }

    public reverseDislikeUpComment = async (commentId: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
            .increment("dislikes")
            .decrement("likes")
            .where({ commentId })
    }

    public reverseLikeUpComment = async (commentId: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
            .increment("likes")
            .decrement("dislikes")
            .where({ commentId })
    }
}