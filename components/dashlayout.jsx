import { styles } from '../utils/style';
import { useContext, useEffect } from "react"
import Context from "../utils/context"
import Error from './error'
import imageUrl from '../assets/logout.png';

export default function Dashlayout({ children, title }) {
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
        <div className="bg-white rounded-3xl shadow-lg shadow-slate-800 min-h-[400px] mx-auto min-w-[600px] max-h-[600px] p-4 flex flex-col justify-between">
            <div className={styles.subTitle}>{title}</div>
            {children}
            {state.view !== 'dashboard' && <div className="flex justify-between items-end"><button className={styles.link} onClick={() => dispatch({ type: "SET_VIEW", param: "dashboard" })}>back home</button></div>}
            {state.view === 'dashboard' && <div className="mt-4"><img src={imageUrl} className="w-[50px] h-[50px] cursor-pointer" onClick={() => dispatch({type: "LOGOUT"})}/></div>}
            {state.error !== '' && <Error />}
        </div>
    )
}