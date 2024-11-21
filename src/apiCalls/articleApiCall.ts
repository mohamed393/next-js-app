import {Article} from "@prisma/client";
import {ArticleDetails} from "@/utils/types";
import {DOMAIN} from "@/app/utils/constants";


//Get Article based on page number
export async function getArticles(pageNumber: string | undefined): Promise<ArticleDetails> {
    const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
        {cache:'no-store'}
        // {next: {revalidate: 50}}
    );

    if (!response.ok) {
        throw new Error('Faild to load articles');
    }
    return response.json();
}
//Get Article based on searchText
export async function getArticlesBasedOnSearch(pageNumber: string ): Promise<Article[]> {
    const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${pageNumber}`,
        {next: {revalidate: 50}});

    if (!response.ok) {
        throw new Error('Faild to load articles');
    }
    return response.json();
}
//Get single article by id
export async function getSingleArticle(id: string) {
    console.log('id',id)
    const response = await fetch(`${DOMAIN}/api/articles/${id}`);
    if (!response.ok) {
        throw new Error('Failed to load article');
    }
    return response.json();
}
