import { useContext, useEffect, useRef} from "react"
import Context from "../utils/context"
import Layout from "./layout"
import { styles } from "../utils/style"
import { database } from "../utils/firebase"

export default function Login() {
  const { state, dispatch } = useContext(Context)
  const nameRef = useRef()
  const passwordRef = useRef()
  let userData = null

  useEffect(() => {
    nameRef.current.focus()
    passwordRef.current.focus()
}, [])

  const searchUser = async (username) => {
    const snapshot = await database.ref('Users').orderByChild('username').equalTo(username).once('value');
    if (snapshot.exists()) {
      // User exists in the database
      console.log(snapshot.val())
      if (Array.isArray(snapshot.val())) {
        // Multiple users with the same username, extract the second element
        userData = snapshot.val()[1];
      } else {
        // Single user with the given username
        userData = Object.values(snapshot.val())[0];
      }
    }
  }
  
const handleSubmit = async (e) => {
  try {
    e.preventDefault()
    await searchUser(nameRef.current.value)
    if(userData != null){
      console.log('User data:', userData)
      if (passwordRef.current.value === userData.password) {
        dispatch({ type: "SET_USER", param: userData })
        dispatch({ type: "SET_VIEW", param: "dashboard" })
        
      } else {
        dispatch({type: "SET_ERROR", param: "Wrong password"})
      }
    } else {
        // User does not exist in the database
        dispatch({type: "SET_ERROR", param: "No such user exists: " + nameRef.current.value})
      }
  } catch (error) {
    console.error(error);
  }
};
 
    return (
      <Layout title="Event Management">
             
          <form onSubmit={handleSubmit}>
            <div className="mt-4 flex justify-center items-center flex-col">
                <div className={styles.label}>Username</div>
                <input type="text" className={styles.textInput} required ref={nameRef} />
                <div className={styles.label}>Password</div>
                <input type="password" className={styles.textInput} required ref={passwordRef} />
                
                <button type="submit" className={styles.buttonLogin}>Login</button>
                <button onClick={() => dispatch({ type: "SET_VIEW", param: "register" })} className={styles.link + " ml-3"}>You don't have an account ? Sign Up!</button>
              </div>
           </form>
           
        </Layout>
    );
}