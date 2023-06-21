
import Context from "../utils/context";
import { useEffect, useState, useContext } from "react";
import { pages } from "../utils/pages";
import { database } from "../utils/firebase";

export const dynamic = 'auto'
export const revalidate = 3

export default function Home() {
  const { state, dispatch } = useContext(Context);
  const [appVisible, setAppVisible] = useState(false);


  useEffect(() => {
    dispatch({ type: "SET_VIEW", param: "home" });
    setAppVisible(true);
  }, []);

  const setData = async () => {
    try {
      let user = { 1: { username: "dor", password: "123" } };
      await database.ref("Users").set(user);
      console.log("Data has been set.");
    } catch (error) {
      console.error(error);
    }
  };

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
