import {z} from "zod";

// Create article schema
export const createArticleSchema = z.object({
    title: z.string(
        {required_error: 'Title is required', invalid_type_error: "Title should be of type string"},
    ).min(2, 'Title must be more than 2 chars').max(200, {message: 'Title must be less than 200 characters'}),
    description: z.string().optional(),
});
// Register schema
export const registerSchema = z.object({
    username: z.string().min(2, 'Username min length is 2 chars'), //.optional() if you need ,
    email: z.string().min(5, 'Email min length is 5 chars').max(200).email(),
    password: z.string().min(6, 'Password min length is 6 chars'),
})

// Login schema
export const loginSchema = z.object({
    email: z.string().min(5, 'Email min length is 5 chars').max(200).email(),
    password: z.string().min(6, 'Password min length is 6 chars'),
})
// Create Comment Schema
export const CommentSchema = z.object({
    text: z.string().min(2, 'Text min length is 5 chars').max(200),
    articleId: z.number()
})
//update profile schema
export const UpdateProfileSchema = z.object({
    username: z.string().min(2, 'Username min length is 2 chars').optional(),
    email: z.string().min(5, 'Email min length is 5 chars').max(200).email().optional(),
    password: z.string().min(6, 'Password min length is 6 chars').optional(),
})
