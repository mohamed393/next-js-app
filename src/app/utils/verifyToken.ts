import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";
import {JWTPayload} from "@/utils/types";

//Verify Token for API
export function verifyToken(request: NextRequest): JWTPayload | null {
    try {
        const jwtToken = request.cookies.get('jwtToken')?.value as string;
        if (!jwtToken) {
            return null
        }
        const privateKey = process.env.PRIVATE_JWT_KEY as string;
        return jwt.verify(jwtToken, privateKey) as JWTPayload;
    } catch  {
        return null
    }
}
//Verify Token for Client
export function verifyTokenForPagesClient(token: string): JWTPayload | null {
    try {
        const privateKey = process.env.PRIVATE_JWT_KEY as string;
        const userPayLoad = jwt.verify(token, privateKey) as JWTPayload;
        if (!userPayLoad) return null;
        return userPayLoad;
    } catch  {
        return null
    }
}
