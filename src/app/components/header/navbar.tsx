"use client";
import Link from "next/link"
import {GrTechnology} from "react-icons/gr"
import styles from './header.module.css';
import {useState} from "react";
import {AiOutlineMenu} from 'react-icons/ai';
import {IoMdClose} from 'react-icons/io'

interface NavbarProps {
    isAdmin: boolean;
}

const Navbar = (props: NavbarProps) => {
    const [toggle, setToggle] = useState(false);
    const toggleIcon = () => {
        setToggle(!toggle);
    }
    return (
        <nav className={styles.navbar}>
            <div>
                <Link href='/' className={styles.logo}>
                    CLOUD <GrTechnology/> HOSTING
                </Link>
            </div>
            <div className={styles.menu}>
                {toggle ? <IoMdClose onClick={toggleIcon}/> : <AiOutlineMenu onClick={toggleIcon}/>}
            </div>
            <div className={styles.navLinksWrapper}
                 style={{clipPath: toggle ? 'polygon(100% 0, 100% 100%, 0 100%, 0 0)' : ''}}>
                <ul className={styles.navLinks}>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href='/'>Home</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink}
                          href='/articles?pageNumber=1'>Articles</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href='/about'>About</Link>
                    {props.isAdmin && (
                        <Link onClick={() => setToggle(false)} className={styles.navLink} href='/admin'>Admin
                            Dashboard</Link>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Navbar
