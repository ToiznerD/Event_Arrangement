import Context from "../utils/context";
import { useEffect, useState, useContext } from "react";
import { pages } from "../utils/pages";

export default function MyAccount({ user }) {
  const { state, dispatch } = useContext(Context);
  const [appVisible, setAppVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      dispatch({ type: "SET_VIEW", param: "login" })
    } else {
      dispatch({ type: "SET_VIEW", param: "dashboard" })
    }
    setAppVisible(true);
  }, []);

  return (
    <>
      {pages[state.view]}
    </>
  );
}