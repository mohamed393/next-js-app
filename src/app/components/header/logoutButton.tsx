'use client';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {toast} from "react-toastify";
import {DOMAIN} from "@/app/utils/constants";

const LogoutButton = () => {
    const router = useRouter();
    const logOutHandler = async () => {
        try {
            await axios.get(`${DOMAIN}/api/users/logout`);
            router.push('/');
            router.refresh();
        } catch (e) {
           toast.warning('something went wrong!');
            console.log('eoor',e)
        }
    }
    return (<button onClick={logOutHandler} className='bg-gray-700 text-gray-200 px-1 rounded'>Logout</button>)
}
export default LogoutButton
