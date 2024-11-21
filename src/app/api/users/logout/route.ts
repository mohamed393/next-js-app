/**
 * @method GET
 * @route ¬/api/users/logout
 * @desc Logout User
 * @access public
 */
import { NextResponse} from "next/server";
import {cookies} from "next/headers";


export function GET() {
    try {
        cookies().delete('jwtToken');
        return NextResponse.json({message: 'Successfully logged out.'}, {status: 200});
    } catch (err) {
        console.log('err',err)
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}
