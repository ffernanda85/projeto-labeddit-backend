import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { CommentModelDB, CommentModel } from "../../../src/models/comments/Comment"

const commentsMock: CommentModelDB[] = [
    {
        id: "c001",
        post_id: "post01",
        creator_id: "id-mock-flavia",
        content: "string",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "c002",
        post_id: "post01",
        creator_id: "id-mock-flavia",
        content: "string",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "c003",
        post_id: "post01",
        creator_id: "id-mock-izabela",
        content: "string",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
]

export class CommentDatabaseMock extends BaseDatabase {
    TABLE_NAME = "comments"

    public insertCommentDB = async (newComment: CommentModelDB): Promise<void> => { }

    public findCommentById = async (id: string): Promise<CommentModelDB | undefined> => {
        return commentsMock.filter(comment => comment.id === id)[0]
    }

    public updateComment = async (content: string, id: string): Promise<void> => { }

    public deleteCommentById = async (id: string): Promise<void> => { }

    public getCommentsByPostId = async (postId: string): Promise<CommentModel[]> => {
        const filterComments = commentsMock.filter(comment => comment.post_id === postId)

        return filterComments.map(comment => {
            return {
                id: comment.id,
                post_id: comment.post_id,
                creator_id: comment.creator_id,
                content: comment.content,
                likes: comment.likes,
                dislikes: comment.dislikes,
                created_at: comment.created_at,
                updated_at: comment.updated_at,
                creatorName: "name"
            }
        })
    }

    public incrementLikeComment = async (commentId: string): Promise<void> => { }
    
    public decrementLikeComment = async (commentId: string): Promise<void> => { }
    
    public incrementDislikeComment = async (commentId: string): Promise<void> => { }
    
    public decrementDislikeComment = async (commentId: string): Promise<void> => { }
    
    public reverseDislikeUpComment = async (commentId: string): Promise<void> => { }
    
    public reverseLikeUpComment = async (commentId: string): Promise<void> => { }
}