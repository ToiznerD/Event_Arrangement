import { useRef, useState, useContext, useEffect } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style'
import Cookies from 'js-cookie'

export default function Dashboard() {
  const { state, dispatch } = useContext(Context);
  let user = JSON.parse(Cookies.get("token"))
  console.log(user)
  const title = "Welcome back " + user.username


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
