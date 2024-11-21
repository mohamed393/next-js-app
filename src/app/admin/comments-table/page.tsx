// import React from 'react'
import {getAllComments} from "@/apiCalls/adminApiCalls";
import {cookies} from "next/headers";
import DeleteButton from "@/app/admin/articles-table/DeleteButton";

const AdminCommentsPage = async () => {
    const token = cookies().get("jwtToken")?.value;
    //we send token here because this is a server compoent(has not access on browser's cookie)
    // and this api must has token to check the admin
    const comments = await getAllComments(token);

    return (
        <section className='p-5'>
            <h1 className='mb-7 text-2xl font-semibold text-gray-700'>Articles</h1>
            <table className='table w-full text-left'>
                <thead className='border-t-2 border-b-2 border-gray-500 lg:text-xl'>
                <tr>
                    <th className='p-1 lg:p-2'>Text</th>
                    <th className='hidden lg:inline-block'>Created At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {comments.map(comment => (
                    <tr className='border-b border-t border-gray-300' key={comment.id}>
                        <td className='p-3 text-gray-700'>{comment.text}</td>
                        <td className='hidden lg:inline-block text-gray-700 font-normal p-3'>
                            {new Date(comment.createdAt).toDateString()}
                        </td>
                        <td className='p-3'>
                            <DeleteButton id={comment.id} route='api/comments' title='comments'/>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            {/*<Pagination pageNumber={+searchParams.pageNumber} pages={pages} route='/admin/articles-table'/>*/}
        </section>
    )
}

export default AdminCommentsPage
