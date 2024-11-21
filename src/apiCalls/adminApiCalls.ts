import {Comment} from '@prisma/client'
import {DOMAIN} from "@/app/utils/constants";

export async function getAllComments(token?: string): Promise<Comment[]> {
    const response = await fetch(`${DOMAIN}/api/comments`,{headers:{Cookie:`jwtToken=${token}`}});
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return response.json();

}
