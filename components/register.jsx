import { useContext, useEffect, useRef, useState} from "react"
import Context from "../utils/context"
import Layout from "./layout"
import { styles } from "../utils/style"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Register() {
    const { state, dispatch } = useContext(Context)
    const nameRef = useRef()
    const passwordRef = useRef()
    const cpasswordRef = useRef()
    const emailRef = useRef()
    const today = new Date();

    const [selectedDate, setSelectedDate] = useState(null)

    function handleSubmit() {

    }
    return (
        <Layout title="Register">
                <div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.label}>Username</div>
                    <div><input type="text" className={styles.textInput} required ref={nameRef} /></div>
                    <div className={styles.label}>Password</div>
                    <div><input type="password" className={styles.textInput} required ref={passwordRef} /></div>
                    <div className={styles.label}>Confirm Password</div>
                    <div><input type="password" className={styles.textInput} required ref={cpasswordRef} /></div>
                    <div className={styles.label}>Email</div>
                    <div><input type="text" className={styles.textInput} required ref={emailRef} /></div>
                    <div className={styles.label}>Event Date</div>
                    <div><DatePicker selected={selectedDate} minDate={today} onChange={(date) => setSelectedDate(date) } /></div>
                    <div className="mt-4 mb-2 flex justify-between items-center">
                        <button type="submit" className={styles.button}>Register</button>
                    </div>
                </form>
                </div>
        </Layout>
    );
}