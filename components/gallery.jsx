import { useContext} from "react"
import Context from "../utils/context"
import Layout from "./layout"
import Carousel from './carousel'
import { roundtable } from '../assets/roundTable.png'
export default function Gallery() {
    const { state, dispatch } = useContext(Context)

    return(
        <Layout title="Event Management" w="700px">
          <Carousel images={['/guests_manager.png', '/myaccount.png', 'drag.gif'] } />
        </Layout>
    )
}