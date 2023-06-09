import { useContext} from "react"
import Context from "../utils/context"
import Layout from "./layout"
import { styles } from '../utils/style'
import Image from 'next/image'
import hamburger from '../assets/burger-menu.png'
import table from '../assets/seatwise.png'
export default function Home() {
    const { state, dispatch } = useContext(Context)

    return(
      <Layout title="Seat Wise">
         <Image src={table} width={300} height={150} alt="logo" className="mx-auto"/>
          <div className={styles.content}>
          Use a wedding seating tool to plan where your guests are seated. Super easy! 
        </div>
        <div className={styles.content}>
          Create your personalized wedding plan. No hidden fees! 
         </div>
        </Layout>
    )
}