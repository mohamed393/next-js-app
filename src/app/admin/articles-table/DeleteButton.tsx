'use client';
import {useRouter} from "next/navigation";
import axios from "axios";
import {DOMAIN} from "@/app/utils/constants";
import {toast} from "react-toastify";
import {ApiError} from "@/app/utils/dtos";

interface DeleteButton {
    id: number;
    route: string;
    title:string;
}

const DeleteButton = ({id,route,title}: DeleteButton) => {
    const router = useRouter();
    const deleteArticleHandler = async () => {
        try {
            if (confirm(`Are you sure you want to delete this ${title}?`)) {
                await axios.delete(`${DOMAIN}/${route}/${id}`);
                router.refresh();
                toast.success(`${title} deleted successfully`);
            }
        } catch (e) {
            console.log('error', e)
            const error = e as ApiError;
            toast.error(error.response?.data?.message);
        }
    }

    return (<div onClick={deleteArticleHandler}
                 className='bg-red-600 text-white rounded-lg cursor-pointer inline-block
                 text-center py-1 px-2 hover:bg-red-800 transition'>Delete</div>)
}

export default DeleteButton;
