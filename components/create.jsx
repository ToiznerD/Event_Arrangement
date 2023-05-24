import Context from '../utils/context'
import { useContext, useRef, useEffect} from 'react'
import Layout from './layout'
import { styles } from '../utils/style'

export default function Create() {
    const { state, dispatch } = useContext(Context)
    const nameRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef()

    
    useEffect(() => {
        nameRef.current.focus()
    }, [])

    return (
        <Layout title="Create new wallet">
            <div>
            <form onSubmit={handleSubmit}>
                        <div className={styles.label}>Wallet name</div>
                        <div><input type="text" className={styles.textInput} required ref={nameRef} /></div>
                        <div className={styles.label}>Password</div>
                        <div><input type="password" className={styles.textInput} required ref={passwordRef} /></div>
                        <div className={styles.label}>Confirm password</div>
                        <div><input type="password" className={styles.textInput} required ref={confirmRef} /></div>
                        <div className="mt-4 mb-2">
                            <button type="submit" className={styles.button}>Create wallet</button>
                        </div>
                    </form>
            </div>
        </Layout>
    )
}