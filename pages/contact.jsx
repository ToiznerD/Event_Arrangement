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
    <div
      className={`app-container transition-opacity duration-1500 ${
        appVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {pages[state.view]}
    </div>
  );
}
