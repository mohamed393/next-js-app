import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/utils/db";
import {verifyToken} from "@/app/utils/verifyToken";
import {UpdateCommentDto} from "@/app/utils/dtos";

interface Props {
    params: { id: string }
}

/**
 * @method PUT
 * @route ¬/api/comments/:id
 * @desc Update Comment
 * @access private (only owner of comment)
 */
export async function PUT(request: NextRequest, {params}: Props) {
    try {
        const comment = await prisma.comment.findUnique({where: {id: parseInt(params.id)}});
        if (!comment) {
            return NextResponse.json({message: 'comment not found'}, {status: 404});
        }
        const user = verifyToken(request);
        if (!user || user.id !== comment.userId) {
            return NextResponse.json({message: 'you are not allowed ,access denied'}, {status: 403});
        }
        const body = await request.json() as UpdateCommentDto;
        const updatedComment = await prisma.comment.update({
            where: {id: parseInt(params.id)}, data: {
                text: body.text
            }
        });
        return NextResponse.json(updatedComment, {status: 200});
    } catch  {
        return NextResponse.json({message: 'internal server error', status: 500});
    }
}

/**
 * @method DELETE
 * @route ¬/api/comments/:id
 * @desc Delete Comment
 * @access private (only admin or owner of comment)
 */

export async function DELETE(request: NextRequest, {params}: Props) {
    try {
        const comment = await prisma.comment.findUnique({where: {id: parseInt(params.id)}});
        if (!comment) {
            return NextResponse.json({message: 'comment not found'}, {status: 404});
        }
        const user = verifyToken(request);
        console.log('user 52',user);
        console.log('comment 52',comment);
        if (!user || user.id !== comment.userId) {
            return NextResponse.json({message: 'you are not allowed ,access denied'}, {status: 403});
        }
        if (user.isAdmin ||user.id == comment.userId){
            await prisma.comment.delete({where: {id: parseInt(params.id)}});
            return NextResponse.json({onmessage:'Successfully Deleted'}, {status: 200});
        }
        return NextResponse.json({message:'you are not allowed ,access denied'}, {status: 403});

    } catch (e) {
        console.log('e',e)
        return NextResponse.json({message: 'internal server error', status: 500});
    }
}
