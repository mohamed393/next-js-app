import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/utils/db";

/**
 * @method GET
 * @route ¬/api/articles/search/searchText=value
 * @desc Get articles by search text
 * @access public
 */
export async function GET(request: NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get('searchText');
        console.log('searchText', searchText)
        let articles;
        if (searchText) {
            console.log('exist')
            articles = await prisma.article.findMany({
                where: {
                    title: {
                        startsWith: searchText.trim(),
                        mode: "insensitive"
                    }
                }
            });
            console.log('articles', articles)
        } else {
            articles = await prisma.article.findMany({take: 6});
        }
        return NextResponse.json(articles, {status: 200});
    } catch  {
        return NextResponse.json({message: 'internal server error'}, {status: 500});
    }
}
