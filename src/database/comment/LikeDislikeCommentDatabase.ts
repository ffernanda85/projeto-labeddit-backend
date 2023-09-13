import { CommentLikeDislikeDBModel } from "../../models/comments/Comment"
import { BaseDatabase } from "../BaseDatabase"

export class LikeDislikeCommentDatabase extends BaseDatabase {
    TABLE_NAME = 'comments_likes_dislikes'

    public findLikeDislike = async (user_id: string, comment_id: string): Promise<CommentLikeDislikeDBModel | undefined> => {
        const [likeDislikeDB]: CommentLikeDislikeDBModel[] | undefined = await BaseDatabase.connection(this.TABLE_NAME)
            .where({ user_id })
            .andWhere({ comment_id })
        return likeDislikeDB
    }

    public insertLikeDislike = async (input: CommentLikeDislikeDBModel): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).insert(input)
      }

    public updateLikeDislike = async ({ user_id, comment_id, like }: CommentLikeDislikeDBModel): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
            .update({ like })
            .where({ user_id })
            .andWhere({ comment_id })
    }

    public deleteLikeDislike = async (user_id: string, comment_id: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
            .del()
            .where({ user_id })
            .andWhere({ comment_id })
    }
}