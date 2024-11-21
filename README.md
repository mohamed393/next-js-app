-->Routing in Next is File base
-->event handler,hooks state work only on client component 
-->logs can't work in server component
-->we can send data from component to another throw props and also props contains all params and queryParams ||searchParams
-->error handlig is file base -->he search on error.tsx exist in app directory and must be client component 
-->you can overrid the global error.tsx page by a new one related to its directory route
als
-->also not-found.tsx is file base
-->import Image  from "next/image" Image from next reduce image size and by default work with lazy loading except you put priority=true
-->and if you need to add external image from remote sites you must define the protocol and hostname in next.config.js and you must put
the width and height


-->if you need to make nested route as user/login 
you must make a folder called user containing a login folder 
and you can call /login directly by making (user) as optional folder

--> if you need to create a css folder under app directory 
next will consider this folder as page route but you can make it private by putting underline 
before folder name (_css)

-->Next js has his own data cache system by default  and we can disable this by cache:'no-store'
-->await fetch('https://jsonplaceholder.typicode.com/posts', {cache:'no-store'});
--> also you can disable cache with specific time 50 second for example
--> next:{revalidate:50}

There exist two types of rendering pages 
1-Pre Rendered  as Next js (
next js can differ between routes or components who are SSG and SSR 
1- SSG 
2- SSR
)
2-Client-Side Rendering(CSR) as React,Angular 
---> SSR next by default use ssr but when you run npm run build 
the build will divided into  
1-SSG (Static side generation) prerendered as static content  (build by default جاهزه تلقائى ومش محتاج اروح اكلم السيرفر)
2- dynamic server side rendering on demand takes more time
---SEO like Pre Rendered page because of its file document on initial load have a lot of details 
---> we can change titles Meta data by adding the belows lines under each page
export const metadata: Metadata = {
title: "Admin Dashboard",
description: "this is admin dashboard",
};
--->we can make a global loader by adding loading.tsx at app root and its also a file base and we can override for each page 
---> we can navigate between pages using router hook .replace will forget last page ,.push will remember last page when 
click on browser's back arrow

In Backend we made all apis as file base also in directory called api 
-->to create online DB use Neon


-->download https://www.enterprisedb.com/downloads/postgres-postgresql-downloads 
then open pgadmin (GUI for dealing with database)
-->we use prisma as orm to deal with Database by writing this command (npm i -D prisma) prisma will be added as a dev dependency 
-->to add initial prisma DB Client   (npx prisma init) by this command will create prisma folder with .env file
-->to format model in prisma npx prisma format 

-->after preparing all schemas don't forget to write 
-->npx prisma migrate dev to transform prisma schemas to sql tables in DB 
--> npx prisma studio using this command  we can use prisma studio rather than bgAdmin as a GUI for dealing with DB 


----> middleware in next has matcher array which includes the routes we need to use this middleware for it
---->middleware has access on client and server  example exist already in this repo 
if token exist prevent user to login and register
--->onDelete cascade  will delete for example comments related to article 
----> Server component doesn't send cookies with each request because he has't privileges on browser's cookies


------------------Building ---------------------
to build 
next build 
next start to run the app on production at localhost 











This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
