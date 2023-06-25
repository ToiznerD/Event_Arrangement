import { useContext} from "react"
import Context from "../utils/context"
import Layout from "./layout"
import { styles } from "../utils/style"

export default function About() {
    const { state, dispatch } = useContext(Context)

    return(
      <Layout title="Event Management" w="1000px">
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 max-h-[600px] p-3">
          <div className={styles.Title}>About</div>
          <div className={styles.subTitle}>Table layout diagram</div>
            <div className={styles.content}>
            Tables and guests can be easily placed on the wedding seating chart template by simply dragging and dropping the mouse. Tables can be of various shapes and an arbitrary number of seats. 
          </div>
          <div className={styles.subTitle}>Convenient seating scheme for guests</div>
            <div className={styles.content}>
            If your guest list changes, you can easily tweak your previously created seating chart with a few clicks. The schema is stored on the server and is accessible from anywhere.
          </div>
          <div className={styles.subTitle}>Easy and simple planning</div>
            <div className={styles.content}>
            Using our online wedding seating chart is easy and convenient. It allows you to save your time and nerves. The intuitive and straightforward interface will enable you to place guests at tables effortlessly.
          </div>
          <div className={styles.subTitle}>No installation required</div>
            <div className={styles.content}>
            Create a wedding seating chart, edit, export, and print the result directly from your browser. You don't need to install anything on your computer. Start planning right away, and that's it.
          </div>
          
         </div>
     </Layout>
    )
}