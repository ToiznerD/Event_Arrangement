import { useRef, useState, useContext, useEffect } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style'

export default function Dashboard() {
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState("Welcome back")
  
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user")).username
    setTitle("Welcome back " + user)
  }, [])
  


  return (
    <Layout title={title}>
      <div className="mt-4 mb-2 flex flex-col items-center">
          <div className={styles.label + "text-center"}>Event date: 12/5/23</div>
          <div className={styles.label + "text-center"}>Guests Amount: 275</div>
        </div>
        
        <div className="mt-4 mb-2 flex justify-between items-center">
        <button className={styles.button} onClick={() => dispatch({type: "SET_VIEW", param: "guests_manager"})}>Manage Guests</button>
        <button className={styles.button}>Manage Table Seats</button>
        </div>
    </Layout>
  )
}
