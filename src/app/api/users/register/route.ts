import {NextRequest, NextResponse} from "next/server";
import {RegisterUserDto} from "@/app/utils/dtos";
import {registerSchema} from "@/app/utils/validationSchemas";
import prisma from "@/app/utils/db";
import bcrypt from "bcryptjs";
import {JWTPayload} from "@/utils/types";
import {setCookies} from "@/app/utils/generateToken";


/**
 * @method POST
 * @route ¬/api/users/register
 * @desc Create New User
 * @access public
 */
export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as RegisterUserDto;
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400});
        }
        const user = await prisma.user.findUnique({where: {email: body.email}});
        if (user) {
            return NextResponse.json({
                message: 'this user already exists',
                status: 400
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword
            },
            select: {username: true, id: true, isAdmin: true}
        });
        const jwtPayload: JWTPayload = {id: newUser.id, username: newUser.username, isAdmin: newUser.isAdmin}
        const cookie = setCookies(jwtPayload);
        return NextResponse.json({...newUser}, {
            status: 201,
            headers: {"Set-Cookie": cookie}
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}
