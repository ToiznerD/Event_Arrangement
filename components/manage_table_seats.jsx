import { useState, useRef, useEffect, useCallback } from "react";
import Layout from "./layout";
import { styles } from '../utils/style';
import RoundTableComponent from './roundTableComponent';

export default function ManageTableSeats() {
    const [selectedRow, setSelectedRow] = useState(null)
    const [guests, setGuests] = useState({guests: [], amount: 0})
    const [tables, setTables] = useState({tables: [], amount: 0})
    const manage_table_seats = "Manage Tables Seats"
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
          setSelectedRow(null)
      else
          setSelectedRow(rowId);
  };

  const addGuest = (index) => {
    if (selectedRow) {
      if (
        tables[index].current_seats + guests.guests[selectedRow].amount >
        tables[index].max_seats
      ) {
        alert("Table is full");
        return;
      }

    if (selectedRow !== null && !tables[index].guests.includes(selectedRow)) {
      const updatedTables = [...tables];
      updatedTables[index] = {
        ...updatedTables[index],
        guests: [...updatedTables[index].guests, selectedRow],
        current_seats: updatedTables[index].current_seats + guests.guests[selectedRow].amount,
      };
      setTables(updatedTables);

      guests.guests[selectedRow].table = index

      setSelectedRow(null);
    }
  }
};

  const removeGuest = (tableNum, guestID) => {
    if(guestID !== null) {
      tables[tableNum].guests = tables[tableNum].guests.filter(element => element !== parseInt(guestID))
      tables[tableNum].current_seats -= guests.guests[guestID].amount

      const updatedGuests = { ...guests }
      updatedGuests.guests[guestID].table = 0
      setGuests(updatedGuests)
    }
  }

  const handleTableCoordinatesUpdate = (index, coordinates) => {
    setTables((prevTables) => {
      const updatedTables = [...prevTables]
      updatedTables[index] = {
        ...updatedTables[index],
        x: coordinates.x,
        y: coordinates.y
      };
      return updatedTables;
    });
  };

  const saveChanges = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    let response = await fetch('/api/update_table', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user.userId, tables: tables })
    })

    if (response.ok) {
      response = await fetch('/api/update_guests', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: user.userId, guests: guests })
      })

      if (response.ok) {
        let res = await response.json();
        alert('SUCCESS BITCHES')
      }
    }
  }

  const addTable = () => {
    const newTable = {
      current_seats: 0,
      max_seats: 15, // add a choosing option in the dialog
      subject: "New Table", // add subject input in the dialog
      guests: [],
      x: 0,
      y: 0
    };
    setTables([...tables, newTable]);
  }

  useEffect(() => {
    console.log(tables)
  },[tables])

  const removeTable = (index) => {
    reduceGuestsTable(index)
    setTables((prevTables) => {
      const updatedTables = [...prevTables]
      updatedTables[index].guests.forEach(element => {
        removeGuest(index,element)
      })
      updatedTables.splice(index, 1);
      return updatedTables;
    })
  }

  const reduceGuestsTable = (index) => {
    setGuests((prevGuests) => {
      const updatedGuests = {...prevGuests}
      updatedGuests.guests.forEach((element) => {
        if(element !== null){
          if(element.table > index)
            element.table = element.table - 1
        }
      })
      return updatedGuests
    })
  }

    return (
        <Layout title={manage_table_seats} w="75vw">
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
                            table={table}
                            removeGuest={removeGuest}
                            guests={guests}
                            index={index}
                            addGuest={() => addGuest(index)}
                            x={(parentWidth / 100) * table.x}
                            y={(parentHeight / 100) * table.y}
                            onUpdateCoordinates={(coordinates) => handleTableCoordinatesUpdate(index, coordinates)}
                            removeTable={removeTable}
                          />
                        );
                      })}
                </div>
                <div className=" w-[30%] h-[full] overflow-y-auto">
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
        <button onClick={() => saveChanges()}>Save</button>
        <button className="ml-5" onClick={() => addTable()}>Add table</button>
        </Layout>
    )

}