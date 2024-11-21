'use client';
import {useState} from 'react'
import {toast} from "react-toastify";
import {useRouter} from 'next/navigation';
import axios from "axios";
import {DOMAIN} from "@/app/utils/constants";
import {ApiError} from "@/app/utils/dtos";

interface AddCommentFormProps {
    articleId: number;
}

const AddCommentForm = ({articleId}: AddCommentFormProps) => {
    const router = useRouter();

    const [text, setText] = useState('');
    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) return toast.error("Please enter a valid comment");
        try {
            await axios.post(`${DOMAIN}/api/comments`, {text, articleId});
            router.refresh();
            setText('');
        } catch (e:unknown) {
            const error = e as ApiError;
            toast.error(error.response?.data?.message);
        }
    }
    return (
        <form onSubmit={formSubmitHandler}>
            <input type="search" className='w-full p-3 rounded
             text-xl border-none text-gray-900'
                   placeholder='Add Comment'
                   value={text}
                   onChange={(e) => setText(e.target.value)}
            />
            <button type='submit'
                    className='bg-green-700 text-white mt-2 p-1 w-min text-xl
                    rounded-lg hover::bg-green-900 transition'>Comment
            </button>
        </form>
    )
}

export default AddCommentForm;
