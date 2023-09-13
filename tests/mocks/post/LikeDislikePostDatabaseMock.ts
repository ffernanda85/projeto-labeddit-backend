import { BaseDatabase } from "../../../src/database/BaseDatabase";
import { PostLikeDislikeDBModel } from "../../../src/models/post/Post";

const likesDislikesPostMock: PostLikeDislikeDBModel[] = [
    {
        user_id: "id-mock-flavia",
        post_id: "post002",
        like: 1
    },
    {
        user_id: "id-mock-izabela",
        post_id: "post001",
        like: 0
    }
]

export class LikeDislikePostDatabaseMock extends BaseDatabase {
    TABLE_NAME = 'posts_likes_dislikes'

    public findLikesDislikes = async (id_post: string, id_user: string): Promise<PostLikeDislikeDBModel | undefined> => {
        return likesDislikesPostMock.filter(item => {
            item.post_id === id_post && item.user_id === id_user
        })[0]
    }

    public createLikesDislikes = async (input: PostLikeDislikeDBModel): Promise<void> => { }
    
    public deleteLikesDislikes = async (userId: string, postId: string): Promise<void> => { }
    
    public updateLikesDislikes = async ({ like, user_id, post_id }: PostLikeDislikeDBModel): Promise<void> => { }
    
}