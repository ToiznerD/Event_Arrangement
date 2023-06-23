import { useRef, useState, useContext, useEffect } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style'
import { database } from '../utils/firebase'

export default function Dashboard() {
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState("Welcome back")
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  const [guestAmount,setGuestAmount] = useState(0)
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user")).username
    setTitle("Welcome back " + user)
    // const snapshot = await database.ref(`Guests/${user.userid}`).once('value');
    // if (snapshot.exists()) {
    //   guestAmount = JSON.parse(snapshot.val()).amount;
    // }
    // else {
    //   console.log("FAIL");
    // }
  }, [])
  
  

  return (
    <Layout title={title} w="600px">
      <div className="mt-4 mb-2 flex flex-col items-center">
        <div className={styles.subTitle}>Event date: {user.date}</div>
        <div className={styles.subTitle}>Email: { user.email }</div>
        <div className={styles.subTitle}>Guests Amount: {guestAmount}</div>
      </div>

      <div className="mt-4 mb-2 flex justify-between items-center">
        <button className={styles.button} onClick={() => dispatch({type: "SET_VIEW", param: "guests_manager"})}>Manage Guests</button>
        <button className={styles.button} onClick={() => dispatch({type: "SET_VIEW", param: "manage_table_seats"})}>Manage Table Seats</button>
      </div>
    </Layout>
  )


}