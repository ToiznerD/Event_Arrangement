import Head from "next/head";
import styles from "../styles/Home.module.css";
import Context from "../utils/context";
import { useReducer, useEffect, useState, useContext } from "react";
import { pages } from "../utils/pages";
import { database } from "../utils/firebase";
import Cookies from 'js-cookie'

export default function MyAccount({ user }) {
  const { state, dispatch } = useContext(Context);
  const [appVisible, setAppVisible] = useState(false);

  useEffect(() => {
    if (Cookies.get("token") === undefined) {
      dispatch({ type: "SET_VIEW", param: "login" })
    } else {
      dispatch({ type: "SET_VIEW", param: "dashboard" })
    }
    setAppVisible(true);
  }, []);

  return (
    <div
      className={`app-container transition-opacity duration-1500 ${
        appVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {pages[state.view]}
    </div>
  );
}