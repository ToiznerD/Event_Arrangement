import { useContext} from "react"
import Context from "../utils/context"
import Layout from "./layout"

export default function Gallery() {
    const { state, dispatch } = useContext(Context)

    return(
        <Layout title="Event Management">
              <div>
                This is Gallery page
              </div>
        </Layout>
    )
}