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
    let user = JSON.parse(localStorage.getItem("user"))
    setTitle("Welcome back " + user.username)
    async function fetchData() {
      const response = await fetch('/api/guests', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: user.userId })
      })

      if (response.ok) {
        let res = await response.json();
        
        setGuestAmount(res.amount)
      }
    }
    fetchData()
  }, [])
  
  

  return (
    <Layout title={title} w="600px">
      <div className="mt-4 mb-2 flex flex-col items-center">
        <div className={styles.Title}>Welcome back {user.username}!</div>
        <div className={"md:text-3xl text-2xl text-gray-600 my-5 "}>Event date: {user.date}</div>
        <div className={"md:text-3xl text-2xl text-gray-600 my-5 "}>Email: { user.email }</div>
        <div className={"md:text-3xl text-2xl text-gray-600 my-5 "}>Guests Amount: {guestAmount}</div>
      </div>

      <div className="mt-4 mb-2 flex justify-between items-center">
        <button className={styles.button} onClick={() => dispatch({type: "SET_VIEW", param: "guests_manager"})}>Manage Guests</button>
        <button className={styles.button} onClick={() => dispatch({type: "SET_VIEW", param: "manage_table_seats"})}>Manage Table Seats</button>
      </div>
    </Layout>
  )


}