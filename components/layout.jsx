import { styles } from '../utils/style';
import { useContext, useEffect, useState } from "react"
import Context from "../utils/context"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Dropdown from './dropDown'
import Head from 'next/head'
import Error from './error'
import Image from 'next/image'
import hamburger from '../assets/burger.png'
import backButton from '../assets/back.png'

export default function Layout({ children, title, w, back}) {
    const { state, dispatch } = useContext(Context)
    const router = useRouter()
    const [isUser, setIsUser] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null)
    useEffect(() => {
        setIsUser(localStorage.getItem("user") !== null)
        setUser(localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null)
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
        console.log("YOOHOO")
        localStorage.removeItem('user');
        const currentPath = router.pathname;
        
         if (currentPath === '/myaccount') {
           dispatch({ type: "SET_VIEW", param: "myaccount" });
         }
        console.log(currentPath)
        if (currentPath === '/') {
            window.location.reload();
          } else {
            router.push('/');
          }
        
    };
    
    const getWidthStyle = () => {
        if (typeof window !== 'undefined' && window.innerWidth >= 845) {
          return { width: w };
        }
        return {};
      };

    return (
        <>
        <Head>
                <title>{title}</title>
            </Head>
            <div className="border-2 border-white rounded-3xl shadow-lg shadow-slate-500 md:min-h-[300px] w-screen md:w-[600px] mx-auto overflow-hidden" style={getWidthStyle()}>
                <nav className="flex items-center justify-between bg-gradient-to-r from-blue-400 to-blue-300 p-4 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        
                    <ul className={`flex ${isMenuOpen ? 'flex-col' : 'space-x-5'}`}>
                                <div className="cursor-pointer md:hidden" onClick={() => setMenuOpen(!isMenuOpen)}>
                                    <Image src={hamburger} width={45} height={44} alt="burger"></Image>
                                 </div>
                                <li className={isMenuOpen ? 'block' : 'md:block hidden'}>
                                    <Link href="/" className={styles.navigationLink}>Home</Link>
                                </li>
                                <li className={isMenuOpen ? 'block' : 'md:block hidden'}>
                                    <Link href="about" className={styles.navigationLink}>About</Link>
                                </li>
                                <li className={isMenuOpen ? 'block' : 'md:block hidden'}>
                                    <Link href="gallery" className={styles.navigationLink}>Gallery</Link>
                                </li>
                                <li className={isMenuOpen ? 'block' : 'md:block hidden'}>
                                    <Link href="contact" className={styles.navigationLink}>Contact</Link>
                                </li>
                                <li className={isMenuOpen ? 'block md:hidden' : 'hidden'}>
                                    <div onClick={handleClick} className={styles.navigationLink}>{isUser ? 'My Account' : 'Login'}</div>
                                </li>
                                <li className={isMenuOpen ? 'block md:hidden' : 'hidden'}>
                                    {isUser && <span onClick={() => dispatch({type: "SET_VIEW", param: "update_profile"})} className={styles.navigationLink}>Update Profile</span>}
                                </li>
                                <li className={isMenuOpen ? 'block md:hidden' : 'hidden'}>
                                        {isUser && <span onClick={() => logout()} className={styles.navigationLink}>Logout</span>}
                                </li>
                            </ul>

                        
                    </div>
                    <div id="yaniv" className="md:block hidden justify-end">
                        <div className="relative inline-flex">
                            <div onClick={handleClick} className={styles.navigationLink}>{isUser ? 'My Account' : 'Login'}</div>
                            {isUser && <Dropdown className="absolute mt-1 left-full"/>}
                        </div>
                   </div>
                </nav>

                <div className="px-1">
                    {back && <Image src={backButton} onClick={() => dispatch({ type: 'SET_VIEW', param: back })} alt="back" className="py-2 md:hidden  w-[32px] h-auto md:w-[40px] md:h-auto" />}
                    {children}
                    {back && <Image src={backButton} onClick={() => dispatch({type:'SET_VIEW', param: back}) } alt="back" className="py-2 hidden md:block w-[32px] h-auto md:w-[40px] md:h-auto" />}
                </div>
                {/*{state.view !== 'home' && <div class="mt-4"><button class={styles.link} onClick={() => { dispatch({ type: "SET_VIEW", param: "home" }); state.view !== "register" ? dispatch({type: "SET_USER", param: null}) : null}}>back home</button></div>}*/}
                    {state.error !== '' && <Error />}
                </div>
            </>
    )
}