import jwt from 'jsonwebtoken'
import {JWTPayload} from "@/utils/types";
import {serialize} from "cookie";

//Generate JWT Token
export function generateToken(jwtPayload: JWTPayload) :string{
    const privateKey =process.env.PRIVATE_JWT_KEY as string;
    const token =jwt.sign(jwtPayload,privateKey, {expiresIn: '30d'});
    return token
}

//Set Cookie with JWT
export function setCookies(jwtPayload: JWTPayload) :string {
    const token = generateToken(jwtPayload);
    const cookie = serialize('jwtToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 //30d
    });
    return cookie
}
