import { useContext, useEffect, useRef, useState} from "react"
import Context from "../utils/context"
import Layout from "./layout"
import { styles } from "../utils/style"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import  MessageDialog  from './message_dialog'

export default function Register() {
    const { state, dispatch } = useContext(Context)
    const nameRef = useRef()
    const passwordRef = useRef()
    const cpasswordRef = useRef()
    const emailRef = useRef()
    const today = new Date();
    const dateRef = useRef()
    const [message, setMessage] = useState("")
    const [type, setType] = useState("confirm")
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null)
    async function handleSubmit(e) {
        e.preventDefault()
        let username = nameRef.current.value
        let password = passwordRef.current.value
        let cpassword = cpasswordRef.current.value
        let email = emailRef.current.value
    
        const day = selectedDate.getDate()
        const month = selectedDate.getMonth() + 1
        const year = selectedDate.getFullYear()
        const formattedDate = `${day}/${month}/${year}`

        if (cpassword !== password) {
            dispatch({ type: 'SET_ERROR', param: 'Passwords does not match!' })
            return
        }
        try {
            const response = await fetch('/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password, email: email, eventDate: formattedDate})
            })
            if (response.ok) {
                let res = await response.json()
                setMessage(res.message)
                setType('confirm')
                setIsConfirmDialogOpen(true)
                //dispatch({ type: 'SET_VIEW', param: 'login'})
            
                nameRef.current.value = ""
                passwordRef.current.value = ""
                cpasswordRef.current.value = ""
                emailRef.current.value = ""
                setSelectedDate(null)
            }
            else {
                let res = await response.json()
                setMessage(res.message)
                setType('error')
                setIsConfirmDialogOpen(true)
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Layout title="Register" back='login'>
            <div className="ml-3">
                <form onSubmit={handleSubmit}>
                    <div className={styles.subTitle}>Username</div>
                    <div><input type="text" className={styles.textInput} required ref={nameRef} /></div>
                    <div className={styles.subTitle}>Password</div>
                    <div><input type="password" className={styles.textInput} required ref={passwordRef} /></div>
                    <div className={styles.subTitle}>Confirm Password</div>
                    <div><input type="password" className={styles.textInput} required ref={cpasswordRef} /></div>
                    <div className={styles.subTitle}>Email</div>
                    <div><input type="text" className={styles.textInput} required ref={emailRef} /></div>
                    <div className={styles.subTitle}>Event Date</div>
                    <div><DatePicker selected={selectedDate} minDate={today} required onChange={(date) => setSelectedDate(date)} ref={dateRef} /></div>
                    <div className="mt-4 mb-2 flex justify-between items-center">
                        <button type="submit" className={styles.buttonReg}>Register</button>
                    </div>
                </form>
            </div>
            {isConfirmDialogOpen && <MessageDialog type={type} message={message} onCancel={() => setIsConfirmDialogOpen(false)} />}
        </Layout>
    );
}