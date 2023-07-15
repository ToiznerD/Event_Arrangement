import { useRef, useState, useContext, useEffect } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import MessageDialog from './message_dialog'

export default function UpdateProfile() {
  const { state, dispatch } = useContext(Context);
  const user = JSON.parse(localStorage.getItem("user"))
  const nameRef = useRef()
  const passwordRef = useRef()
  const cpasswordRef = useRef()
  const emailRef = useRef()
  const today = new Date();
  const dateRef = useRef()
  const [day, month, year] = user.date.split('/')
  const [selectedDate, setSelectedDate] = useState(new Date(year, month - 1, day))
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

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
          const response = await fetch('/api/update_profile', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ userID: user.userId, username: username, password: password, email: email, eventDate: formattedDate})
          })
          let res = await response.json()
          
        setIsConfirmDialogOpen(true)
        

          

      } catch (error) {
          console.error(error);
      }
  }
  return (
    <Layout title="Update Profile" w="600px" back="dashboard">
      <div className="mt-4 mb-2 flex flex-col items-center">
        <div className={styles.Title}>Update profile {user.username}</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.subTitle}>Username</div>
              <div><input type="text" className={styles.textInput} required disabled ref={nameRef} defaultValue={user.username} /></div>
            <div className={styles.subTitle}>New Password</div>
              <div><input type="password" className={styles.textInput} required ref={passwordRef} defaultValue={user.password} /></div>
            <div className={styles.subTitle}>Confirm Password</div>
            <div><input type="password" className={styles.textInput} required ref={cpasswordRef} defaultValue={user.password}/></div>
            <div className={styles.subTitle}>Email</div>
              <div><input type="text" className={styles.textInput} required ref={emailRef} defaultValue={user.email} /></div>
            <div className={styles.subTitle}>Event Date</div>
            <div><DatePicker selected={selectedDate} minDate={today} required onChange={(date) => setSelectedDate(date)} ref={dateRef} /></div>
            <div className="mt-4 mb-2 flex justify-between items-center">
                <button type="submit" className={styles.buttonReg}>Update Profile</button>
            </div>
      </form>
      {isConfirmDialogOpen && <MessageDialog type="confirm" message="The profile has been updated successfuly!" onCancel={() => setIsConfirmDialogOpen(false)} />}
    </Layout>
    
  )


}