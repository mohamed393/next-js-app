import {NextRequest, NextResponse} from 'next/server';
import prisma from "@/app/utils/db";
import {verifyToken} from "@/app/utils/verifyToken";
import {UpdateUserDto} from "@/app/utils/dtos";
import bcrypt from "bcryptjs";
import {UpdateProfileSchema} from "@/app/utils/validationSchemas";

interface Props {
    params: { id: string }
}

/**
 * @method DELETE
 * @route ¬/api/users/profile/:id
 * @desc Delete Profile
 * @access private
 */
export async function DELETE(request: NextRequest, {params}: Props) {
    try {
        console.log('params', params);
        const user = await prisma.user.findUnique({where: {id: parseInt(params.id)}});
        if (!user) {
            return NextResponse.json({message: 'user not found'}, {status: 404});
        }

        const userFromToken = verifyToken(request);
        if (userFromToken && (userFromToken.id == user.id)) {
            await prisma.user.delete({where: {id: parseInt(params.id)}});
            return NextResponse.json({message: 'User deleted successfully'}, {status: 200});
        }
        return NextResponse.json({
            message: 'only user himself can delete profile ,forbidden',
            status: 403
        })

    } catch (e) {
        console.log('e', e)
        return NextResponse.json({message: 'internal server error', status: 500});
    }
}

/**
 * @method GET
 * @route ¬/api/users/profile/:id
 * @desc Get Profile By Id
 * @access Private (only user himself can get his account)
 */
export async function GET(request: NextRequest, {params}: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: {id: parseInt(params.id)}, select: {
                id: true, email: true, username: true, isAdmin: true
            }
        },);
        if (!user) {
            return NextResponse.json({message: 'user not found'}, {status: 404});
        }
        const userFromToken = verifyToken(request);
        if (!userFromToken || (userFromToken.id !== user.id)) {
            return NextResponse.json({message: 'You are not allowed,access denied '}, {status: 403});
        }
        return NextResponse.json(user, {status: 200});
    } catch (e) {
        console.log('e',e)
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}

/**
 * @method PUT
 * @route ¬/api/users/profile/:id
 * @desc Update Profile By Id
 * @access Private (only user himself can update his account)
 */

export async function PUT(request: NextRequest, {params}: Props) {
    try {
        const user = await prisma.user.findUnique({where: {id: parseInt(params.id)}});
        if (!user) {
            return NextResponse.json({message: 'user not found'}, {status: 404});
        }
        const userFromToken = verifyToken(request);
        if (!userFromToken || (userFromToken.id !== user.id)) {
            return NextResponse.json({message: 'You are not allowed,access denied '}, {status: 403});
        }
        const body = await request.json() as UpdateUserDto;
        const validation = UpdateProfileSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400});
        }
        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }
        const updatedUser = await prisma.user.update({
            where: {id: parseInt(params.id)}, data: {
                username: body.username, email: body.email, password: body.password
            },
            select: {username: true, isAdmin: true, email: true,id:true}
        });
        return NextResponse.json({updatedUser}, {status: 200});

    } catch {
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}
