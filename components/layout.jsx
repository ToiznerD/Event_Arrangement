import { styles } from '../utils/style';
import { useContext, useEffect } from "react"
import Context from "../utils/context"
import Error from './error'
import Link from 'next/link'

export default function Layout({ children, title }) {
    const { state, dispatch } = useContext(Context)

    useEffect(() => {
        if (state.error !== '') {
            const timer = setTimeout(() => {
                dispatch({ type: 'SET_ERROR', param: '' })
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [state.error])

    return (
        <div>
            <div className="border-2 border-white rounded-3xl shadow-lg shadow-slate-500 min-h-[300px] mx-auto w-[500px] overflow-hidden">
                <nav className={styles.navigationBar}>
                    <ul className="flex space-x-5">
                        <li><Link href="/" className={styles.navigationLink}>Home</Link></li>
                        <li><Link href="#" className={styles.navigationLink} onClick={() => dispatch({type: "SET_VIEW", param: "about"})}>About</Link></li>
                        <li><Link href="#" className={styles.navigationLink} onClick={() => dispatch({type: "SET_VIEW", param: "gallery"})}>Gallery</Link></li>
                        <li><Link href="#" className={styles.navigationLink} onClick={() => dispatch({type: "SET_VIEW", param: "contact"})}>Contact</Link></li>
                    </ul>
                    <Link href="/myaccount" className="text-white font-bold text-xl cursor-pointer">{state.user === null ? `Login` : `My Account`}</Link>
                </nav>
                <div className="p-4">
                    {children}
                </div>
                {/*{state.view !== 'home' && <div class="mt-4"><button class={styles.link} onClick={() => { dispatch({ type: "SET_VIEW", param: "home" }); state.view !== "register" ? dispatch({type: "SET_USER", param: null}) : null}}>back home</button></div>}*/}
                {/*state.error !== '' && <Error />*/}
            </div>
        </div>
    )
}