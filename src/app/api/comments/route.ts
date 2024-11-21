/**
 * @method POST
 * @route ¬/api/comments
 * @desc Create New Comment
 * @access private (only logged in users)
 */
import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/app/utils/verifyToken";
import {CreateCommentDto} from "@/app/utils/dtos";
import {CommentSchema} from "@/app/utils/validationSchemas";
import prisma from "@/app/utils/db";


export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (!user) {
            return NextResponse.json({message: 'only logged in user,access denied'}, {status: 401});
        }
        const body = await request.json() as CreateCommentDto;
        const validation = CommentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400});
        }
        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: user.id,
            }
        });
        return NextResponse.json(newComment, {status: 201});

    } catch (err) {
        console.log('err',err)
        return NextResponse.json({message: 'internal server error'}, {status: 500});
    }
}

/**
 * @method GET
 * @route ¬/api/comments
 * @desc Get All Comments
 * @access private (only admin)
 */
export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (!user?.isAdmin) {
            return NextResponse.json({message: 'only admin can access,access denied'}, {status: 404});
        }
        const comments = await prisma.comment.findMany();
        return NextResponse.json(comments,{status: 200});
    } catch  {
        return NextResponse.json({message: 'internal server error'}, {status: 500});
    }
}
