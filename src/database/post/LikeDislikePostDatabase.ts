import { PostLikeDislikeDBModel } from "../../models/post/Post";
import { BaseDatabase } from "../BaseDatabase";

export class LikeDislikePostDatabase extends BaseDatabase{
    TABLE_NAME = 'posts_likes_dislikes';

    public findLikesDislikes = async (id_post: string, id_user: string): Promise<PostLikeDislikeDBModel | undefined> => {
        const [likesDislikesDB]: PostLikeDislikeDBModel[] | undefined = await BaseDatabase.connection(this.TABLE_NAME).where({ post_id: id_post }).andWhere({ user_id: id_user })
        
        return likesDislikesDB
    }

    public createLikesDislikes = async (input: PostLikeDislikeDBModel): Promise<void> => {
      await BaseDatabase.connection(this.TABLE_NAME).insert(input)
    }

    public deleteLikesDislikes = async (userId: string, postId: string): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).del().where({ user_id : userId }).andWhere({ post_id : postId })
    }

    public updateLikesDislikes = async ({ like, user_id, post_id }: PostLikeDislikeDBModel): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).update({ like }).where({ user_id }).andWhere({ post_id })
    }
}