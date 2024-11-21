import {NextRequest, NextResponse} from "next/server";
import {UpdateArticleDto} from "@/app/utils/dtos";
import prisma from "@/app/utils/db";
import {verifyToken} from "@/app/utils/verifyToken";

interface Props {
    params: { id: string }
}

/**
 * @method GET
 * @route ¬/api/articles
 * @desc Get article by id
 * @access public
 */
export async function GET(request: NextRequest, {params}: Props) {
    try {
        console.log('Single Be')
        const article = await prisma.article.findUnique({
            where: {id: parseInt(params.id)},
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true
                            }
                        }
                    }, orderBy: {createdAt: 'desc'}
                }
            }
        });
        if (!article) {
            console.log('no article found')
            return NextResponse.json({message: 'article not found'}, {status: 404});
        }
        console.log('article found', article);
        return NextResponse.json(article, {status: 200});
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }

}

/**
 * @method PUT
 * @route ¬/api/articles
 * @desc Update article by id
 * @access private (only admin can update article)
 */
export async function PUT(request: NextRequest, {params}: Props) {
    try {
        const user = verifyToken(request);
        if (!user?.isAdmin) {
            return NextResponse.json({message: 'only admin can access,access denied'}, {status: 403});
        }
        const article = await prisma.article.findUnique({where: {id: parseInt(params.id)}});
        if (!article) {
            return NextResponse.json({message: 'article not found'}, {status: 404});
        }
        const body = await request.json() as UpdateArticleDto;
        const updatedArticle = await prisma.article.update({
            where: {id: parseInt(params.id)}, data: {
                title: body.title,
                description: body.description,
            }
        });
        return NextResponse.json(updatedArticle, {status: 200});
    } catch  {
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}

/**
 * @method DELETE
 * @route ¬/api/articles
 * @desc Delete article by id
 * @access private (only admin can delete article)
 */
export async function DELETE(request: NextRequest, {params}: Props) {
    try {
        const user = verifyToken(request);
        if (!user?.isAdmin) {
            return NextResponse.json({message: 'only admin can access,access denied'}, {status: 403});
        }
        const article = await prisma.article.findUnique({
            where: {id: parseInt(params.id)},
            include: {comments: true}
        });
        if (!article) {
            return NextResponse.json({message: 'article not found'}, {status: 404});
        }
        await prisma.article.delete({where: {id: parseInt(params.id)}});
        return NextResponse.json({message: 'article deleted'}, {status: 200});
    } catch  {
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}
