'use client';
import {useState} from 'react'
import {toast} from "react-toastify";
import axios from "axios";
import {DOMAIN} from "@/app/utils/constants";
import {useRouter} from "next/navigation";
import LoadingLoginSpinner from "@/app/(user)/login/LoadingLoginSpinner";
import {ApiError} from "@/app/utils/dtos";
const RegisterForm = () => {
        const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username)return toast.error('Please enter username');
        if (!email) return toast.error("Please enter a valid email");
        if (!password) return toast.error("Please enter a valid password");
        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/users/register`, {email, password,username});
            router.replace('/');
            router.refresh();
            setLoading(false);
        } catch (e:unknown) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                const error = e as ApiError;
                toast.error(error.response?.data?.message);
                setLoading(false)
            }
        }
        console.log({username,email, password});
    }
    return (
        <form onSubmit={formSubmitHandler} className='flex flex-col'>
            <input type="text" className='mb-4 border rounded p-2 text-xl'
                   placeholder='Enter your username'
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
            />
            <input type="email" className='mb-4 border rounded p-2 text-xl'
                   placeholder='Enter your email address'
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" className='mb-4 border rounded p-2 text-xl'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder='Enter your password'/>
            <button type='submit' className='text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold'>
                {loading ? <LoadingLoginSpinner/> : 'Register'}
            </button>
        </form>
    )
}

export default RegisterForm
