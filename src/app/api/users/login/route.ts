import {NextRequest, NextResponse} from 'next/server';
import {LoginUserDto} from "@/app/utils/dtos";
import {loginSchema} from "@/app/utils/validationSchemas";
import prisma from "@/app/utils/db";
import bcrypt from 'bcryptjs'
import {setCookies} from "@/app/utils/generateToken";
import {JWTPayload} from "@/utils/types";

/**
 * @method POST
 * @route ¬/api/users/login
 * @desc Login User
 * @access public
 */
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as LoginUserDto;
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400});
        }
        const user = await prisma.user.findUnique({where: {email: body.email}});
        if (!user) {
            return NextResponse.json({message: 'invalid email or password'}, {status: 400});
        }
        const isPasswordMatched = await bcrypt.compare(body.password, user.password);
        if (!isPasswordMatched) {
            return NextResponse.json({message: 'invalid email or password'}, {status: 400});
        }
        const jwtPayLoad: JWTPayload = {id: user.id, username: user.username, isAdmin: user.isAdmin};
        const cookie = setCookies(jwtPayLoad);
        return NextResponse.json(
            {message: 'Authenticated with successful token'},
            {status: 200, headers: {"Set-Cookie": cookie}})
    } catch  {
        return NextResponse.json({message: 'Internal server error', status: 500});
    }
}
