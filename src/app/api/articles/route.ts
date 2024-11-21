import {NextRequest, NextResponse} from "next/server";
import {createArticleSchema} from "@/app/utils/validationSchemas";
import {CreateArticleDto} from "@/app/utils/dtos";
import {Article} from '@prisma/client'
import prisma from "@/app/utils/db";
import {ARTICLE_PER_PAGE} from "@/app/utils/constants";
import {verifyToken} from "@/app/utils/verifyToken";

/**
 * @method GET
 * @route ¬/api/articles
 * @desc Get  articles by pageNumber
 * @access public
 */
export async function GET(request: NextRequest) {
    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
        const [articles, count] = await Promise.all([prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
            take: ARTICLE_PER_PAGE,
            orderBy:{createdAt:'desc'}
        }),
            prisma.article.count()]);
        const response = {
            count: count,
            articles: articles,
        };
        return NextResponse.json(response, {status: 200})
    } catch  {
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}

/**
 * @method POST
 * @route ¬/api/articles
 * @desc Create new article
 * @access private (only admin)
 */
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (!user?.isAdmin) {
            return NextResponse.json({message: 'only admin can access,access denied'}, {status: 403});
        }
        const body = (await request.json()) as CreateArticleDto;
        const validation = createArticleSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400});
        }
        const newArticle: Article = await prisma.article.create({
            data: {title: body.title, description: body.description},
        });
        return NextResponse.json(newArticle, {status: 201})
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}
