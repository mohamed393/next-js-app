import {Article, Comment, User} from "@prisma/client";

// export type Article = {
//     id: number;
//     userId: number;
//     title: string;
//     body: string;
// }
export type JWTPayload = {
    id: number,
    isAdmin: boolean,
    username: string
}

export interface ArticleDetails {
    articles: Article[],
    count: number
}

export type CommentWithUser = Comment & { user: User };
export type SingleArticle = Article & { comments: CommentWithUser[] };
// export interface ErrorResponse {
//     response?: {
//         data?: {
//             message?: string;
//         };
//     };
// }
