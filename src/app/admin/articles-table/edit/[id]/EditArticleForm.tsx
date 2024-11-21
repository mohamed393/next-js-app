'use client';
import {useState} from 'react'
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import axios from "axios";
import {DOMAIN} from "@/app/utils/constants";
import {Article} from "@prisma/client";
import {ApiError} from "@/app/utils/dtos";

interface ArticleProps {
    article: Article
}

const EditArticleForm = ({article}: ArticleProps) => {
    const router = useRouter();
    const [title, setTitle] = useState(article.title);
    const [description, setDescription] = useState(article.description);
    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title) return toast.error("Please enter a valid Title");
        if (!description) return toast.error("Please enter a valid Description");
        try {
            await axios.put(`${DOMAIN}/api/articles/${article.id}`, {title, description});
            toast.success('Article updated successfully');
            router.refresh();
        } catch (e) {
            const error = e as ApiError;
            toast.error(error.response?.data?.message);
        }
    }
    return (
        <form onSubmit={formSubmitHandler} className='flex flex-col'>
            <input type="text" className='mb-4 border rounded p-2 text-xl'
                   placeholder='Enter your title'
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
            />
            <textarea className='mb-4 rounded p-2 lg:text-xl resize-none'
                      value={description} rows={5}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder='Enter your Description'></textarea>
            <button type='submit'
                    className='text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold'>
                Edit
            </button>
        </form>
    )
}

export default EditArticleForm
