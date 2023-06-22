import { useState, useEffect } from "react";
import Layout from "./layout";
import { styles } from '../utils/style';
import RoundTableComponent from './roundTableComponent';

export default function ManageTableSeats() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [guests, setGuests] = useState({guests: [], amount: 0});
    const [tables, setTables] = useState({tables: [], amount: 0});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        async function fetchData() {
          const response = await fetch('/api/guests', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: user.userId })
          })
    
          if (response.ok) {
            let res = await response.json();
            setGuests(res)
          }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        async function fetchDataTables() {
          const response = await fetch('/api/tables', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: user.userId })
          })
    
          if (response.ok) {
            let res = await response.json();
            setTables(res)
          }
        }
        fetchDataTables()
    }, [])

    const handleRowClick = (rowId) => {
        if(rowId === selectedRow)
            setSelectedRow(0)
        else
            setSelectedRow(rowId);
        console.log(rowId)
    };

    return (
        <Layout w="100vw">
            <div className="flex justify-between relative">
                <div className="w-screen">
                {Array.isArray(tables) && tables.map((table, index) => {
                    if(table === null)
                        return null
                    return(
                        <RoundTableComponent key={index} current_seats={table.current_seats} guests_in_table={table.guests_in_table} max_seats={table.max_seats} subject={table.subject} x={table.x} y={table.y} />
                    )
                })}
                </div>
                <div className=" w-[500px] h-[full] overflow-y-auto">
                    <table className="w-full border-gray-500 border-4">
                        <thead>
                            <tr>
                                <th className="py-2">Name</th>
                                <th className="py-2">Amount</th>
                                <th className="py-2">Category</th>
                                <th className="py-2">Table</th>
                            </tr>
                        </thead>
                        <tbody>
                        {guests !== null && guests.guests.map((guest, index) => {
                        if (guest === null)
                            return null
                        return(
                            <tr key={index} onClick={() => handleRowClick(index)} className={selectedRow === index ? styles.selectedRow : styles.normalRow}>
                                <td className={styles.td}>{guest.name}</td>
                                <td className={styles.td}>{guest.amount}</td>
                                <td className={styles.td}>{guest.category}</td>
                                <td className={styles.td}>0</td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            </Layout>
    )

}