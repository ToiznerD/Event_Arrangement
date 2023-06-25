import { useState, useRef, useEffect } from "react";
import Layout from "./layout";
import { styles } from '../utils/style';
import RoundTableComponent from './roundTableComponent';

export default function ManageTableSeats() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [guests, setGuests] = useState({guests: [], amount: 0});
    const [tables, setTables] = useState({tables: [], amount: 0});
    const parentRef = useRef(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);

  useEffect(() => {
    async function fetchData() {
      //Get user's guests list
      const user = JSON.parse(localStorage.getItem('user'))
      let response = await fetch('/api/guests', {
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
      
      //Get user's tables info
      response = await fetch('/api/tables', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: user.userId })
      })

      if (response.ok) {
        let res = await response.json();
        setTables(res)
        console.log(res)
      }
      

      //Handle different sizes of the window
      const handleResize = () => {
        if (parentRef.current) {
          const { width, height } = parentRef.current.getBoundingClientRect();
          setParentWidth(width);
          setParentHeight(height);
        }
      };

      handleResize(); // Initial measurement
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
    fetchData()
  }, [])

    const handleRowClick = (rowId) => {
        if(rowId === selectedRow)
            setSelectedRow(0)
        else
            setSelectedRow(rowId);
        console.log(rowId)
    };

  const handleTableCoordinatesUpdate = (index, coordinates) => {
    tables[index].x = coordinates.x
    tables[index].y = coordinates.y
  };

  const saveChanges = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const response = await fetch('/api/update_table', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user.userId, tables: tables })
    })

    if (response.ok) {
      let res = await response.json();
      alert('SUCCESS BITCHES')
    }
  }

    return (
        <Layout w="75vw">
            <div className="flex justify-between relative">
                <div ref={parentRef} className="w-[70%] h-[500px]">
                  {Array.isArray(tables) &&
                      tables.map((table, index) => {
                        if (table === null) return null;
                        const x = (parentWidth / 100) * table.x;
                        const y = (parentHeight / 100) * table.y;
                        return (
                          <RoundTableComponent
                            key={index}
                            current_seats={table.current_seats}
                            guests_in_table={table.guests_in_table}
                            max_seats={table.max_seats}
                            subject={table.subject}
                            x={x}
                            y={y}
                            onUpdateCoordinates={(coordinates) =>
                              handleTableCoordinatesUpdate(index, coordinates)
                            }
                          />
                        );
                      })}
                </div>
                <div className=" w-[30%] h-[full] overflow-y-auto">
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
        <button onClick={() => saveChanges()}>Save</button>
            </Layout>
    )

}