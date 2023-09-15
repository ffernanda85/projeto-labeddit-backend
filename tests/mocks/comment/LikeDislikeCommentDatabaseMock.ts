import { BaseDatabase } from "../../../src/database/BaseDatabase";
import { CommentLikeDislikeDBModel } from "../../../src/models/comments/Comment";

const likesDislikesCommentsMock: CommentLikeDislikeDBModel[] = [
    {
        user_id: "id-mock-flavia",
        comment_id: "c001",
        like: 1
    },
    {
        user_id: "id-mock-izabela",
        comment_id: "c002",
        like: 0
    }
]

export class LikeDislikeCommentDatabaseMock extends BaseDatabase {
    TABLE_NAME = 'comments_likes_dislikes'

    public findLikeDislike = async (user_id: string, comment_id: string): Promise<CommentLikeDislikeDBModel | undefined> => {
        return likesDislikesCommentsMock.filter(item => item.comment_id === comment_id && item.user_id === user_id)[0]
    }

    public insertLikeDislike = async (input: CommentLikeDislikeDBModel): Promise<void> => { }
    
    public updateLikeDislike = async ({ user_id, comment_id, like }: CommentLikeDislikeDBModel): Promise<void> => { }
    
    public deleteLikeDislike = async (user_id: string, comment_id: string): Promise<void> => { }
}