import Link from 'next/link'
import React from 'react'
import styles from './header.module.css';
import Navbar from './navbar';
import {cookies} from "next/headers";
import {verifyTokenForPagesClient} from "@/app/utils/verifyToken";
import LogoutButton from "@/app/components/header/logoutButton";

const Header = () => {
    const token = cookies().get('jwtToken')?.value || '';
    const payload = verifyTokenForPagesClient(token);
    return (
        <header className={styles.header}>
            <Navbar isAdmin={payload?.isAdmin ||false}/>
            <div className={styles.right}>
                {payload ?
                    (<> <strong className='text-blue-800 md:text-xl capitalize'>{payload?.username}</strong>
                            <LogoutButton/>
                        </>
                    ) : (<>
                            <Link className={styles.btn} href='/login'>Login
                            </Link>
                            <Link className={styles.btn} href='/register'>Register</Link>
                        </>
                    )
                }
            </div>
        </header>
    )
}

export default Header
