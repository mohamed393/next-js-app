import {Article} from "@prisma/client";
import {getArticlesBasedOnSearch} from "@/apiCalls/articleApiCall";
import ArticleItem from "@/app/components/Articles/articleItem";
import NoDataFound from "@/app/components/NoData/noDataFound";

interface SearchArticlePageProps {
    searchParams: { searchText: string }
}

const SearchArticlePage = async ({searchParams}: SearchArticlePageProps) => {
    const articles: Article[] = await getArticlesBasedOnSearch(searchParams.searchText);
    return (
        <section className='container m-auto px-5'>
            {articles.length === 0 ? (
                <>
                    <h1 className='text-2xl font-bold mb-2 mt-7 text-gray-800'>Articles based on
                        <span className='ms-1 text-red-700 text-3xl font-bold'> {searchParams.searchText}</span></h1>
                    <NoDataFound title='articles'/>
                </>

            ) : (
                <>
                    <h1 className='text-2xl font-bold mb-2 mt-7 text-gray-800'>Articles based on
                        <span className='ms-1 text-green-700 text-3xl font-bold'> {searchParams.searchText}</span></h1>
                    <div className='flex items-center justify-center  flex-wrap gap-7'>
                        {articles.map(article => (
                            <ArticleItem article={article} key={article.id}/>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}

export default SearchArticlePage
