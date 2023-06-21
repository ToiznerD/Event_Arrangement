import { styles } from '../utils/style';
import { useContext, useEffect, useState } from "react"
import Context from "../utils/context"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Dropdown from './dropDown'
import Head from 'next/head'
import Error from './error'
import Image from 'next/image'
import hamburger from '../assets/burger-menu.png'

export default function Dashlayout({ children, title }) {
    const { state, dispatch } = useContext(Context)
    const router = useRouter()
    const [isUser, setIsUser] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setIsUser(localStorage.getItem("user") !== null)
    },[])

    useEffect(() => {
        if (state.error !== '') {
            const timer = setTimeout(() => {
                dispatch({ type: 'SET_ERROR', param: '' })
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [state.error])

    const handleClick = () => {
        if (localStorage.getItem('user') !== null)
            dispatch({ type: "SET_VIEW", param: "dashboard" })
        router.push("myaccount")
    }
    
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: "SET_VIEW", param: "myaccount" })
        router.push('/')
    }


    return (
        <>
        <Head>
            <title>{title}</title>
            </Head>
            <div className="border-2 border-white rounded-3xl shadow-lg shadow-slate-500 min-h-[300px] w-screen max-w-[1000px]  md:max-w-[1500px] overflow-hidden mx-1">
                <nav className="flex items-center justify-between bg-gray-800 p-4 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-5">
                                <ul className={`flex ${isMenuOpen ? 'flex-col' : 'space-x-5'}`}>
                                <div className="cursor-pointer md:hidden" onClick={() => setMenuOpen(!isMenuOpen)}>
                                    <Image src={hamburger} width={30} height={30} alt="burger"></Image>
                                 </div>
                                <li className={`md:block ${isMenuOpen ? 'block' : 'hidden'}  relative hover:bg-gray-400 transition duration-500 rounded-md`}>
                                    <Link href="/" className="text-white text-lg">Home</Link>
                                </li>
                                <li className={`md:block ${isMenuOpen ? 'block' : 'hidden'}  relative hover:bg-gray-400 transition duration-500 rounded-md`}>
                                    <Link href="about" className="text-white text-lg">About</Link>
                                </li>
                                <li className={`md:block ${isMenuOpen ? 'block' : 'hidden'}  relative hover:bg-gray-400 transition duration-500 rounded-md`}>
                                    <Link href="gallery" className="text-white text-lg">Gallery</Link>
                                </li>
                                <li className={`md:block ${isMenuOpen ? 'block' : 'hidden'}  relative hover:bg-gray-400 transition duration-500 rounded-md`}>
                                    <Link href="contact" className="text-white text-lg">Contact</Link>
                                </li>
                                <li className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} `}>
                                    <div onClick={handleClick} className="text-white text-lg ">{isUser ? 'My Account' : 'Login'}</div>
                                </li>
                                    <li className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                                        {isUser && <span onClick={() => logout()} className="text-white text-lg">Logout</span>}
                                </li>
                                    
                            </ul>
                            <div className="md:block hidden justify-end">
                                    <div className="relative inline-flex">
                                        <div onClick={handleClick} className="text-white text-lg relative hover:bg-gray-400 transition duration-500 rounded-md cursor-pointer">{isUser ? 'My Account' : 'Login'}</div>
                                        {isUser && <Dropdown className="absolute mt-1 left-0"/>}
                                    </div>
                            </div>
                            
                        </div>
                    </div>
                </nav>
                <div className="px-1">
                    {children}
                </div>
                {/*{state.view !== 'home' && <div class="mt-4"><button class={styles.link} onClick={() => { dispatch({ type: "SET_VIEW", param: "home" }); state.view !== "register" ? dispatch({type: "SET_USER", param: null}) : null}}>back home</button></div>}*/}
                    {state.error !== '' && <Error />}
            </div>
            </>
    )
}