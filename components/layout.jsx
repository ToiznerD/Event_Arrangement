import { styles } from '../utils/style';
import { useContext, useEffect, useState } from "react"
import Context from "../utils/context"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Dropdown from './dropDown'
import Head from 'next/head'
import Error from './error'

export default function Layout({ children, title }) {
    const { state, dispatch } = useContext(Context)
    const router = useRouter()
    const [isUser, setIsUser] = useState(false)

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


    return (
        <>
        <Head>
            <title>{title}</title>
        </Head>
        <div className="mt-[200px]">
            <div className="border-2 border-white rounded-3xl shadow-lg shadow-slate-500 min-h-[300px] mx-auto min-w-[500px] overflow-hidden">
                <nav className={styles.navigationBar}>
                    <ul className="flex space-x-5">
                        <li><Link href="/" className={styles.navigationLink}>Home</Link></li>
                        <li><Link href="about" className={styles.navigationLink}>About</Link></li>
                        <li><Link href="gallery" className={styles.navigationLink}>Gallery</Link></li>
                        <li><Link href="contact" className={styles.navigationLink}>Contact</Link></li>
                            
                        </ul>
                        <div className="flex justify-center">
                                    <div className={styles.navigationLink + " font-bold cursor-pointer"} onClick={handleClick}>
                                        {isUser ? `My Account` : `Login`}
                                    </div>
                                    {isUser ? <Dropdown /> : null}
                                </div>
                    
                </nav>
                <div className="p-4">
                    {children}
                </div>
                {/*{state.view !== 'home' && <div class="mt-4"><button class={styles.link} onClick={() => { dispatch({ type: "SET_VIEW", param: "home" }); state.view !== "register" ? dispatch({type: "SET_USER", param: null}) : null}}>back home</button></div>}*/}
                    {state.error !== '' && <Error />}
            </div>
            </div>
            </>
    )
}