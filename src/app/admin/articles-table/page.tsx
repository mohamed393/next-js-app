import {ArticleDetails} from "@/utils/types";
import {getArticles} from "@/apiCalls/articleApiCall";
import {ARTICLE_PER_PAGE} from "@/app/utils/constants";
import Link from "next/link";
import Pagination from "@/app/components/Articles/pagination";
import DeleteButton from "@/app/admin/articles-table/DeleteButton";

interface AdminArticlesTable {
    searchParams: { pageNumber: string }
}

const AdminArticlesTable = async ({searchParams}: AdminArticlesTable) => {
    const reslut: ArticleDetails = await getArticles(searchParams.pageNumber);
    const articles = reslut.articles;
    const pages = Math.ceil(reslut.count / ARTICLE_PER_PAGE);
    return (
        <section className='p-5'>
            <h1 className='mb-7 text-2xl font-semibold text-gray-700'>Articles</h1>
            <table className='table w-full text-left'>
                <thead className='border-t-2 border-b-2 border-gray-500 lg:text-xl'>
                <tr>
                    <th className='p-1 lg:p-2'>Title</th>
                    <th className='hidden lg:inline-block'>Created At</th>
                    <th>Actions</th>
                    <th className='hidden lg:inline-block'></th>
                </tr>
                </thead>
                <tbody>
                {articles.map(article => (
                    <tr className='border-b border-t border-gray-300' key={article.id}>
                        <td className='p-3 text-gray-700'>{article.title}</td>
                        <td className='hidden lg:inline-block text-gray-700 font-normal p-3'>
                            {new Date(article.createdAt).toDateString()}
                        </td>
                        <td className='p-3'>
                            <Link href={`/admin/articles-table/edit/${article.id}`}
                                  className='bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2
                            lg:me-3 hover:bg-green-800 transition'>Edit</Link>
                            <DeleteButton id={article.id} route='api/articles' title='articles'/>
                        </td>
                        <td className='hidden lg:inline-block p-3'>
                            <Link className='text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800'
                                  href={`/articles/${article.id}`}>Read More</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination pageNumber={+searchParams.pageNumber} pages={pages} route='/admin/articles-table'/>
        </section>
    )
}

export default AdminArticlesTable
