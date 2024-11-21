'use client';
import {FaEdit, FaTrash} from 'react-icons/fa';
import {CommentWithUser} from "@/utils/types";
import UpdateCommentModal from "@/app/components/comments/updateCommentModal";
import {useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {DOMAIN} from "@/app/utils/constants";
import {useRouter} from "next/navigation";
import {ApiError} from "@/app/utils/dtos";

interface CommentItemProps {
    comment: CommentWithUser,
    userId: number | undefined
}

const CommentItem = ({comment, userId}: CommentItemProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const commentDeleteHandler = async () => {
        try {
            if (confirm("Are you sure you want to delete this comment?")) {
                await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
                router.refresh();
            }

        } catch (e) {
            const error = e as ApiError;
            toast.error(error.response?.data?.message);
        }
    }
    return (
        <div className='mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300 '>
            <div className='flex items-center justify-between mb-2'>
                <strong className='text-gray-800 uppercase'>
                    {comment.user.username}
                </strong>
                <span
                    className='bg-yellow-700 px-1 rounded-lg text-white'>{new Date(comment.createdAt).toDateString()}</span>
            </div>
            <p className='text-gray-800 mb-2 '>{comment.text}</p>
            {userId && comment.userId == userId && (<div className='flex justify-end items-center'>
                <FaEdit onClick={() => setOpen(true)} className='text-green-600 text-xl cursor-pointer me-3'/>
                <FaTrash onClick={commentDeleteHandler} className='text-red-600 text-xl cursor-pointer '/>
            </div>)}

            {open && (<UpdateCommentModal setOpen={setOpen} commentId={comment.id} text={comment.text}/>)}

        </div>
    )
}

export default CommentItem;
