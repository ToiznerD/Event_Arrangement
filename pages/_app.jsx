import "../styles/globals.css";
import 'tailwindcss/tailwind.css'
import Context from "../utils/context";
import { useReducer, useEffect, useState } from "react";
import { initState, reducer } from "../utils/reducer";

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}
