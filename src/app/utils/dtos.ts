export interface CreateArticleDto {
    title: string;
    description: string;
}

export interface UpdateArticleDto {
    title?: string;
    description?: string;
}

export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    email?: string;
    password?: string;
    username?: string;
}

export interface CreateCommentDto {
    text: string;
    articleId: number;
}

export interface UpdateCommentDto {
    text: string;
}
export interface ApiError {
    response: {
        data: {
            message: string;
        };
    };
}

