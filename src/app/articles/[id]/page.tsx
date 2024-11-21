import AddCommentForm from "@/app/components/comments/AddCommentForm";
import CommentItem from "@/app/components/comments/CommentItem";
import {getSingleArticle} from "@/apiCalls/articleApiCall";
import {SingleArticle} from "@/utils/types";
import NoDataFound from "@/app/components/NoData/noDataFound";
import {cookies} from "next/headers";
import {verifyTokenForPagesClient} from "@/app/utils/verifyToken";

interface SingleArticlePageProps {
    params: { id: string };
}

const SingleArticlePage = async ({params}: SingleArticlePageProps) => {
    const token = cookies().get('jwtToken')?.value || '';
    const payload = verifyTokenForPagesClient(token);
    const article: SingleArticle = await getSingleArticle(params.id);
    return (
        <section className='container m-auto w-full px-5 pt-8 md:w-3/4'>
            <div className='bg-white p-7 rounded-lg mb-7'>
                <h1 className='text-3xl font-bold text-gray-700 mb-2'>
                    {article.title}
                </h1>
                <div className='text-gray-400'>{new Date(article.createdAt).toDateString()}</div>
                <p className='text-gray-800 text-xl mt-5'>{article.description}</p>
            </div>
            {payload && (<AddCommentForm articleId={article.id}/>)}

            <h4 className='text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7'></h4>
            {article.comments.length > 0 ? (
                article.comments.map(comment => (
                    <CommentItem comment={comment} key={comment.id} userId={payload?.id}/>
                ))
            ) : (<NoDataFound title='comments'/>)}


        </section>
    )
}

export default SingleArticlePage
