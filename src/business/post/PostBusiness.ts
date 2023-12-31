import { LikeDislikePostDatabase } from "../../database/post/LikeDislikePostDatabase";
import { PostDatabase } from "../../database/post/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../../dtos/post/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../../dtos/post/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../../dtos/post/getPost.dto";
import { GetPostByIdInputDTO, GetPostByIdOutputDTO } from "../../dtos/post/getPostById.dto";
import { LikeDislikePostInputDTO, LikeDislikePostOutputDTO } from "../../dtos/post/likeDislikePost.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import { PostLikeDislikeDBModel, Post, PostModelDB, PostModel } from "../../models/post/Post";
import { TokenPayload, USER_ROLES } from "../../models/user/User";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenManager } from "../../services/TokenManager";

export class PostBusiness {

    constructor(
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private likeDislikePostDatabase: LikeDislikePostDatabase
    ) { }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { token, content } = input

        /* verificando token */
        const payload: TokenPayload | null = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("invalid token");
        }

        /* Gerando id aleatório */
        const id = this.idGenerator.generate()

        /* criando nova instância de Post */
        const newPost = new Post(
            id,
            payload.id,
            content,
            0,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            "baseline"
        )
        const newPostDB: PostModelDB = newPost.postToDBModel()
        await this.postDatabase.insertPostDB(newPostDB)
        const output: CreatePostOutputDTO = {
            message: "post created"
        }
        return output
    }

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input

        /* validação do token recebido no headers */
        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("invalid token");
        }
        /* Pegando postagens do DB */
        const postsDB = await this.postDatabase.getAllPosts()
        /* Instanciando as postagens e modelando com o método postToBusinessModel criado dentro da class Post */
        const posts = Promise.all(postsDB.map(async (post) => {
            
            //verificando se já existe o registro de like/dislike desse user neste post
            const findLike = await this.likeDislikePostDatabase.findLikesDislikes(post.id, payload.id)

            //definindo o liked
            let liked = "neutral" //definindo modo neutro (sem like e sem dislike)
            if (findLike) {
                //verificando se o arquivo guardado é um like ou dislike
                liked = findLike.like === 1 ? "like" : "dislike"
            }
            //criando a instância com o liked correto            
            const result = new Post(
                post.id,
                post.creator_id,
                post.content,
                post.likes,
                post.dislikes,
                post.comments,
                post.created_at,
                post.updated_at,
                liked
            )
            return result.postToBusinessModel(post.creatorId, post.creatorName)
        }))
        return posts
    }

    public getPostById = async (input: GetPostByIdInputDTO): Promise<GetPostByIdOutputDTO> => {
        const { id, token } = input

        /* validação do token recebido no headers */
        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("invalid token");
        }
        /* Pegando postagens do DB */
        const postDB: PostModel | undefined = await this.postDatabase.getPostById(id)
        if (!postDB) throw new NotFoundError("Id Not found");
        
        /* Instanciando a postagem e modelando com o método postToBusinessModel criado dentro da class Post */
        const post = new Post(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.comments,
                postDB.created_at,
                postDB.updated_at,
                ""
        )
        const output: GetPostByIdOutputDTO = post.postToBusinessModel(postDB.creatorName, postDB.creatorName)
        return output
    }

    public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {
        const { id, token, content } = input

        const payload: TokenPayload | null = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("invalid token");
        }
        /* Verificando se a postagem referente ao id enviado existe */
        const postDB = await this.postDatabase.getPostById(id)

        if (!postDB) {
            throw new NotFoundError("id not found");
        }
        /* Verificando se o token enviado é do criador da postagem */
        if (payload.id !== postDB.creator_id) {
            throw new BadRequestError("You are not creator of the post");
        }

        /* Criando uma nova instância de Post para inserir */
        const postToUpdate = new Post(
            postDB.id,
            postDB.creator_id,
            content,
            postDB.likes,
            postDB.dislikes,
            postDB.comments,
            postDB.created_at,
            postDB.updated_at,
            ""
        )
        const postToUpdateDB: PostModelDB = postToUpdate.postToDBModel()
        await this.postDatabase.updatePost(postToUpdateDB)
        const output: EditPostOutputDTO = {
            message: "updated post"
        }
        return output
    }

    public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const { token, id } = input

        /* Verificando de o token é válido */
        const payload: TokenPayload | null = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("invalid token");
        }
        /* verifcando no DB se o ID informado confere com alguma postagem */
        const postDB: PostModelDB = await this.postDatabase.getPostById(id)
        if (!postDB) {
            throw new NotFoundError("id not found");
        }
        /* verificando se o ID do criador da postagem bate com o do TOKEN informado ou se ele tem uma conta ADMIN*/
        if (postDB.creator_id !== payload.id && payload.role !== USER_ROLES.ADMIN) {
            throw new BadRequestError("Not Authorized!");
        }
        /* enviando o id da postagem como argumento para fazer a deleção no DB */
        await this.postDatabase.deletePostById(id)
        const output: DeletePostOutputDTO = {
            message: "post deleted"
        }
        return output
    }

    public likeDislike = async (input: LikeDislikePostInputDTO): Promise<LikeDislikePostOutputDTO> => {
        const { id: postId, token, like } = input

        /* Verificando se o token é válido */
        const payload: TokenPayload | null = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("invalid token");
        }

        /* Verificando se o post com o ID informado existe no DB */
        const postDB: PostModelDB | undefined = await this.postDatabase.getPostById(postId)
        if (!postDB) {
            throw new NotFoundError("id not found");
        }
        
        const { id: user_id } = payload

        /* Transformando o like em number */
        const likePost: number = Number(like)

        /* Criando o obj de likes_dislikes */
        const like_dislike: PostLikeDislikeDBModel = {
            user_id,
            post_id: postId,
            like: likePost
        }

        /* Verificar se existe registro em likes_dislikes (id_post + id_user) */
        const likesDislikesExists: PostLikeDislikeDBModel | undefined = await this.likeDislikePostDatabase.findLikesDislikes(postId, payload.id)

        /* Se não houver registro em likes_dislikes inserir na tabela */
        if (!likesDislikesExists) {
            await this.likeDislikePostDatabase.createLikesDislikes(like_dislike)
            /* se like for 1 incrementamos o likes, senão incrementamos o dislikes na posts */
            likePost === 1 ?
                await this.postDatabase.incrementLike(postId)
                :
                await this.postDatabase.incrementDislike(postId)

            /* Se houver registro */
        } else {
            //1) verificamos se o like enviado é o mesmo existente
            if (likesDislikesExists.like !== likePost) {
                //se o like enviado não for igual ao existente no registro, vamos precisar editar nosso registro no DB
                await this.likeDislikePostDatabase.updateLikesDislikes(like_dislike)

                likePost === 1 ?
                    await this.postDatabase.reverseLikeUp(postId)
                    :
                    await this.postDatabase.reverseDislikeUp(postId)

            } else {

                //nesse caso deletamos o registro existente
                await this.likeDislikePostDatabase.deleteLikesDislikes(user_id, postId)

                likePost === 1 ?
                    await this.postDatabase.decrementLike(postId)
                    :
                    await this.postDatabase.decrementDislike(postId)
            }
        }
        const output: LikeDislikePostOutputDTO = "success"
        return output
    }
}