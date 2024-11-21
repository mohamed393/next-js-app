import ArticleItem from '../components/Articles/articleItem';
import type {Metadata} from "next";
import SearchArticleInput from "@/app/components/Articles/SearchArticleInput";
import Pagination from "@/app/components/Articles/pagination";
import {getArticles} from "@/apiCalls/articleApiCall";
import {ArticleDetails} from "@/utils/types";
import {ARTICLE_PER_PAGE} from "@/app/utils/constants";

interface ArticlePageProps {
    searchParams: { pageNumber: string }
}

const ArticlesPage = async ({searchParams}: ArticlePageProps) => {
    const {pageNumber} = searchParams
    // await new Promise((resolve) => {setTimeout(resolve,4000)}) // to test loading page
    //to test global error page const response =await fetch('https://jsonplaceholder.typicode.com/posts/errorTest');

    const reslut: ArticleDetails = await getArticles(pageNumber);
    const articles = reslut.articles;
    const pages = Math.ceil(reslut.count / ARTICLE_PER_PAGE);
    return (
        <section className='container m-auto px-5'>
            <SearchArticleInput/>
            <div className='flex items-center justify-center flex-wrap gap-7'>
                {articles.map(item => (
                    <ArticleItem article={item} key={item.id}/>
                ))}
            </div>
            <Pagination pageNumber={parseInt(pageNumber)} route='/articles' pages={pages} />
        </section>
    )
}

export default ArticlesPage
export const metadata: Metadata = {
    title: "Articles Page",
    description: "this is articles page about programming",
};
