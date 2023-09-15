import { BaseDatabase } from "../../../src/database/BaseDatabase";
import { PostModel, PostModelDB } from "../../../src/models/post/Post"
import { usersMock } from "../user/UserDatabaseMock";

const postsMock: PostModelDB[] = [
    {
        id: "post01",
        creator_id: "id-mock-flavia",
        content: "string",
        likes: 0,
        dislikes: 0,
        comments: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "post02",
        creator_id: "id-mock-flavia",
        content: "string2",
        likes: 0,
        dislikes: 0,
        comments: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "post03",
        creator_id: "id-mock-izabela",
        content: "string2",
        likes: 0,
        dislikes: 0,
        comments: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
]

export class PostDatabaseMock extends BaseDatabase {
    TABLE_NAME = "posts"

    public insertPostDB = async (newPostDB: PostModelDB): Promise<void> => {
       
    }

    public getAllPosts = async (): Promise<PostModel[]> => {
        const result: PostModel[] = postsMock.map(postMock => {
            const findUser = usersMock.find(user => user.id === postMock.creator_id)
            return {
                id: postMock.id,
                creator_id: postMock.creator_id,
                content: postMock.content,
                likes: postMock.likes,
                dislikes: postMock.dislikes,
                comments: postMock.comments,
                created_at: postMock.created_at,
                updated_at: postMock.updated_at,
                creatorId: postMock.creator_id,
                creatorName: findUser?.name as string
            }
        })
        return result
    }

    public getPostById = async (id: string): Promise<PostModelDB> => {
        return postsMock.filter(postMock => postMock.id === id)[0]
    }

    public updatePost = async (postUpdate: PostModelDB): Promise<void> => { }
    
    public deletePostById = async (id: string): Promise<void> => { }
    
    public incrementLike = async (id: string): Promise<void> => { }
    
    public decrementLike = async (id: string): Promise<void> => { }
    
    public incrementDislike = async (id: string): Promise<void> => { }
    
    public decrementDislike = async (id: string): Promise<void> => { }
    
    public incrementComments = async (id: string): Promise<void> => { }
    
    public decrementComments = async (id: string): Promise<void> => { }

    public reverseLikeUp = async (postId: string): Promise<void> => { }
    
    public reverseDislikeUp = async (postId: string): Promise<void> => { }
    
}