import { useContext} from "react"
import Context from "../utils/context"
import Layout from "./layout"
import { styles } from '../utils/style'
export default function Home() {
    const { state, dispatch } = useContext(Context)

    return(
      <Layout title="Event Management">
          <div className={styles.Title}>2Seat</div>
          <div className={styles.content}>
          Use a wedding seating tool to plan where your guests are seated. Super easy! 
        </div>
        <div className={styles.content}>
          Create your personalized wedding plan. No hidden fees! 
         </div>
        </Layout>
    )
}