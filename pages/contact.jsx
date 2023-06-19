import Context from "../utils/context";
import { useEffect, useState, useContext } from "react";
import { pages } from "../utils/pages";

export default function Contact() {
  const { state, dispatch } = useContext(Context);
  const [appVisible, setAppVisible] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_VIEW", param: "contact" });
    setAppVisible(true);
  }, []);

  return (
    <>
      {pages[state.view]}
    </>
  );
}
