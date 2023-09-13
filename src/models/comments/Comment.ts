export interface CommentModelDB {
    id: string,
    post_id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export interface CommentModel extends CommentModelDB {
    creatorName: string
}

export interface CommentModelOutput {
    id: string,
    postId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface CommentLikeDislikeDBModel {
    user_id: string,
    comment_id: string,
    like: number
}

export class Comment {
    constructor(
        private id: string,
        private postId: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string
    ) { }
    
    public getId() : string {
        return this.id
    }

    public getPostId(): string {
        return this.postId
    }

    public getCreatorId() : string {
        return this.creatorId
    }

    public getContent() : string {
        return this.content
    }
    public setContent(newContent : string) {
        this.content = newContent;
    }

    public getLikes() : number {
        return this.likes
    }
    public setLikes(newLikes : number) {
        this.likes = newLikes;
    }

    public getDislikes() : number {
        return this.dislikes
    }
    public setDislikes(newDislikes : number) {
        this.dislikes = newDislikes;
    }

    public getCreatedAt() : string {
        return this.createdAt
    }
    public setCreatedAt(newCreatedAt : string) {
        this.createdAt = newCreatedAt;
    }

    public getUpdatedAt() : string {
        return this.updatedAt
    }
    public setUpdatedAt(newUpdatedAt : string) {
        this.updatedAt = newUpdatedAt;
    }

    /* método para gerar o CommentDB a partir da instância de Comment */
    commentToDBModel = (): CommentModelDB => {
        return {
            id: this.id,
            post_id: this.postId,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        }
    }

    commentToBusinessModel = (creatorName: string): CommentModelOutput => {
        return {
            id: this.id,
            postId: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: creatorName
            } 
        }
    }
}