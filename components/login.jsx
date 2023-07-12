import { useContext, useEffect, useRef} from "react"
import Context from "../utils/context"
import Layout from "./layout"
import { styles } from "../utils/style"


export default function Login() {
  const { state, dispatch } = useContext(Context)
  const nameRef = useRef()
  const passwordRef = useRef()
  let userData = null

  useEffect(() => {
    nameRef.current.focus()
    passwordRef.current.focus()
}, [])
  
const handleSubmit = async (e) => {
  e.preventDefault()
  let username = nameRef.current.value
  let password = passwordRef.current.value
  try {
    const response = await fetch('/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: {username: username, password: password}})
    })

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(await response.json()))
      dispatch({ type: "SET_VIEW", param: "dashboard" })
    }
    else {
      let res = await response.json()
      dispatch({type: "SET_ERROR", param: res.message})
    }

  } catch (error) {
    console.error(error);
  }
};
 
    return (
      <Layout title="Event Management">
             
          <form onSubmit={handleSubmit}>
            <div className="mt-4 flex justify-center items-center flex-col">
                <div className={styles.subTitle}>Username</div>
                <input type="text" className={styles.textInput} required ref={nameRef} />
                <div className={styles.subTitle}>Password</div>
                <input type="password" className={styles.textInput} required ref={passwordRef} />
                
                <button type="submit" className={styles.buttonLogin}>Login</button>
                <button onClick={() => dispatch({ type: "SET_VIEW", param: "register" })} className={styles.link + " ml-3"}>You don't have an account ? Sign Up!</button>
              </div>
           </form>
           
        </Layout>
    );
}