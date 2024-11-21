import { NextResponse} from "next/server";
import prisma from "@/app/utils/db";

/**
 * @method GET
 * @route ¬/api/articles/count
 * @desc Get articles Count
 * @access public
 */
export async function GET() {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({count}, {status: 200});
    } catch (err) {
        console.log('err',err)
        return NextResponse.json({
            message: 'internal server error'
        }, {status: 500})
    }
}
