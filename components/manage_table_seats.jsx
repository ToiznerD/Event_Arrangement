import { useContext, useState } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style';

export default function ManageTableSeats() {
    const { state, dispatch } = useContext(Context);
    const [selectedRow, setSelectedRow] = useState(null);
    
    const handleRowClick = (rowId) => {
        setSelectedRow(rowId);
        console.log(rowId)
    };
    
    return(
        <Layout >
            <div className="h-64 overflow-y-scroll">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Category</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr onClick={() => handleRowClick(1)} className={selectedRow === 1 ? styles.selectedRow : styles.normalRow}>
                            <td className={styles.td}>raz</td>
                            <td className={styles.td}>5</td>
                            <td className={styles.td}>family</td>
                        </tr>
                        <tr onClick={() => handleRowClick(2)} className={selectedRow === 2 ? styles.selectedRow : styles.normalRow}>
                            <td className={styles.td}>dor</td>
                            <td className={styles.td}>10</td>
                            <td className={styles.td}>friends</td>
                        </tr>
                        <tr>1</tr>
                        <tr>2</tr>
                        <tr>3</tr>
                        <tr>4</tr>
                        <tr>5</tr>
                        <tr>6</tr>
                        <tr>7</tr>
                        <tr>8</tr>

                    </tbody>
                </table>
            </div>
        </Layout>
    )

}