import { readFileSync, writeFileSync } from "fs";
import { join } from "node:path";
import { CustomError } from "../../utils/custom-error";
import { Post } from "../../models/post/post.model";
import { StatusCodes } from "../../models/enums/status.enum";
import { errorLogStream } from "../../middlewares/middleware";

export class PostService {
    private posts: Post[] = [];
    private fullFilePath: string = "";

    constructor(public filename: string) {
        this.fullFilePath = join(__dirname, "../../data", filename);
        try {
            const fileContent: string = readFileSync(
                this.fullFilePath,
                "utf-8"
            );
            this.posts = JSON.parse(fileContent);
        } catch (error) {
            errorLogStream.write(`${error.message}\n`);
            this.posts = [];
        }
    }

    persist = (): void => {
        try {
            writeFileSync(this.fullFilePath, JSON.stringify(this.posts));
        } catch (error) {
            errorLogStream.write(`${error.message}\n`);
            throw new CustomError(
                StatusCodes.SERVER_ERROR,
                `Cannot write json file: ${this.filename}`,
                error.message
            );
        }
    };

    getAllPosts = (): Post[] => {
        return this.posts;
    };

    getPostById = (id: string): Post => {
        const post: Post = this.posts.find((e) => e.id === id) as Post;
        if (!post) {
            errorLogStream.write(`Not found post with id: ${id}\n`);
            throw new CustomError(
                StatusCodes.NOT_FOUND,
                `Not found post with id: ${id}`
            );
        }
        return post;
    };

    addPost = (post: Post): Post => {
        this.posts = [...this.posts, post];
        this.persist();
        return post;
    };

    votedPostById = (id: string, votes: number): Post | null => {
        let post: Post | null = null;
        this.posts = this.posts.map((e) => {
            if (e.id === id) {
                e.vote = votes;
                post = e;
            }
            return e;
        });

        if (!post) {
            errorLogStream.write(`Not found post with id: ${id}\n`);
            throw new CustomError(
                StatusCodes.NOT_FOUND,
                `Not found post with id: ${id}`
            );
        }

        this.persist();
        return post;
    };
}
