import { CommentModelDB } from "../../models/comments/Comment"
import { BaseDatabase } from "../BaseDatabase"

export class CommentDatabase extends BaseDatabase {
    TABLE_NAME = 'comments'

    public insertCommentDB = async (newComment: CommentModelDB): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).insert(newComment)
    }
}