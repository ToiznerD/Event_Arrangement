import { useRef, useState, useEffect } from "react";
import Layout from "./layout";
import { styles } from '../utils/style';
import RoundTableComponent from './roundTableComponent';

export default function ManageTableSeats() {
    const [selectedRow, setSelectedRow] = useState(null)
    const [guests, setGuests] = useState({guests: [], amount: 0})
    const [tables, setTables] = useState({tables: [], amount: 0})
    const manage_table_seats = "Manage Tables Seats"

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
        console.log(selectedRow)
    };

    const addGuest = (index) => {
        if(selectedRow) {
            if(tables[index].current_seats + guests.guests[selectedRow].amount > tables[index].max_seats) {
                console.log("Table is full")
                return
            }

            if(selectedRow !== null && !tables[index].guests.includes(selectedRow)) {
                tables[index].guests.push(selectedRow)
                tables[index].current_seats += guests.guests[selectedRow].amount
                guests.guests[selectedRow].table = index
                setSelectedRow(null)
                console.log(tables[index].guests)
            }
        }
    }

    const getGuests = (tableNum) => {
        const guestsInTable = []
        
        tables[tableNum].guests.forEach(guestNum => {
            const guest = {
                guestName: guests.guests[guestNum].name,
                guestAmount: guests.guests[guestNum].amount
            }
            guestsInTable.push(guest)
        })
        return guestsInTable
    }

    const removeGuest = (tableNum, guestID) => {
        tables[tableNum].guests = tables[tableNum].guests.filter(element => element !== parseInt(guestID))
        tables[tableNum].current_seats -= guests.guests[guestID].amount
        console.log(tables[tableNum])
    }

    return (
        <Layout w="95vw" title={manage_table_seats}>
            <div className="flex justify-between relative">
                <div className="w-screen">
                {Array.isArray(tables) && tables.map((table, index) => {
                    if(table === null)
                        return null
                    return(
                        <RoundTableComponent removeGuest = {removeGuest} guests={guests} addGuest={() => addGuest(index)} index={index} table={table}/>
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