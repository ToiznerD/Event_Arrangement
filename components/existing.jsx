import { useRef, useState, useContext, useEffect } from "react"
import Context from "../utils/context"
import Layout from './layout'
import { styles } from '../utils/style'

export default function Existing() {
    const { state, dispatch } = useContext(Context)
    const nameRef = useRef()
    const passwordRef = useRef()
    const [wallet, setWallet] = useState(null)

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    return (
        <Layout title="Enter existing wallet">
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.label}>Wallet name</div>
                        <div><input type="text" className={styles.textInput} required ref={nameRef} /></div>
                        <div className={styles.label}>Password</div>
                        <div><input type="password" className={styles.textInput} required ref={passwordRef} /></div>
                        <div className="mt-4 mb-2">
                            <button type="submit" className={styles.button}>Open wallet</button>
                        </div>
                    </form>
                </div>
            </div>
            {/*temp for wallet content*/}
            {wallet && <div>
                <pre>{JSON.stringify(wallet, null, 4)}</pre>
            </div>}
        </Layout>
    )
}