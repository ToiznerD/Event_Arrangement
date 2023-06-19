import Context from "../utils/context";
import { useEffect, useState, useContext } from "react";
import { pages } from "../utils/pages";

export default function Gallery() {
  const { state, dispatch } = useContext(Context);
  const [appVisible, setAppVisible] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_VIEW", param: "gallery" });
    setAppVisible(true);
  }, []);

  return (
    <>
      {pages[state.view]}
    </>
  );
}
