import styles from "../styles/Home.module.css";
import Context from "../utils/context";
import { useEffect, useState, useContext } from "react";
import { pages } from "../utils/pages";

export default function About() {
  const { state, dispatch } = useContext(Context);
  const [appVisible, setAppVisible] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_VIEW", param: "about" });
    setAppVisible(true);
  }, []);

  return (
    <>
      {pages[state.view]}
    </>
  );
}
