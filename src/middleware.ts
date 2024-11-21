import {NextRequest, NextResponse} from "next/server";


export function middleware(request: NextRequest) {
    // const authToken = request.headers.get('authToken') as string;
    console.log('pathName', request.nextUrl.pathname)
    const authToken = request.cookies.get('jwtToken')?.value as string;
    if (!authToken) {
        if (request.nextUrl.pathname.startsWith('/api/users/profile')) {
            return NextResponse.json({message: 'no token provided from middleware'}, {status: 401});
        }
    } else {
        console.log('pathName', request.nextUrl.pathname)
        if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
}

export const config = {
    matcher: ["/api/users/profile/:path*", "/login", "/register"]
}
