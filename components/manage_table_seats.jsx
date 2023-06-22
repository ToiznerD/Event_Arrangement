import { useRef, useState, useEffect } from "react";
import Context from "../utils/context";
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

        fetchData()
        fetchDataTables()
    }, [])

    const handleRowClick = (rowId) => {
        if(rowId === selectedRow)
            setSelectedRow(null)
        else
            setSelectedRow(rowId);
        console.log(rowId)
    };

    const addGuest = (index) => {
        if(tables[index].current_seats === tables[index].max_seats) {
            console.log("Table is full")
            return
        }

        if(selectedRow !== null && !tables[index].guests.includes(selectedRow)) {
            tables[index].guests.push(selectedRow)
            tables[index].current_seats += 1
            guests.guests[selectedRow].table = index
            setSelectedRow(null)
            console.log(tables[index].guests)
        }
    }

   

    return (
        <Layout w="95vw">
            <div className="flex justify-between relative">
                <div className="w-screen">
                {Array.isArray(tables) && tables.map((table, index) => {
                    if(table === null)
                        return null
                    return(
                        <RoundTableComponent addGuest={() => addGuest(index)} key={index} current_seats={table.current_seats} guests_in_table={table.guests_in_table} max_seats={table.max_seats} subject={table.subject}  />
                    )
                })}
                </div>
                <div className=" w-[550px] h-[full] overflow-y-auto">
                    <table className="w-full border-gray-500 border-4">
                        <thead>
                            <tr>
                                <th className={styles.td}>Name</th>
                                <th className={styles.td}>Amount</th>
                                <th className={styles.td}>Category</th>
                                <th className={styles.td} >Table</th>
                            </tr>
                        </thead>
                        <tbody>
                        {guests !== null && guests.guests.map((guest, index) => {
                        if (guest === null)
                            return null
                        return(
                            <tr key={index} onClick={() => handleRowClick(index)} className={selectedRow === index ? styles.selectedRow : guest.table !== 0 ? styles.normalRowDisabled : styles.normalRow}>
                                <td className={styles.td}>{guest.name}</td>
                                <td className={styles.td}>{guest.amount}</td>
                                <td className={styles.td}>{guest.category}</td>
                                <td className={styles.td}>{guest.table}</td>
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