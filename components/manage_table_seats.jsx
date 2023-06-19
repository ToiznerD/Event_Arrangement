import { useContext, useState, useEffect } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style';
import Draggable from 'react-draggable';
import Image from 'next/image';
import roundTable from '../assets/roundTable.png';
import RoundTableComponent from './roundTableComponent';

export default function ManageTableSeats() {
    const { state, dispatch } = useContext(Context);
    const [selectedRow, setSelectedRow] = useState(null);
    const [guests, setGuests] = useState({guests: [], amount: 0});
    const [isDragging, setIsDragging] = useState(false);
    const text1 = "Raz"

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

    const handleMouseDown = (event) => {
        event.preventDefault()
        setIsDragging(true);
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
      };


    const handleRowClick = (rowId) => {
        if(rowId === selectedRow)
            setSelectedRow(0)
        else
            setSelectedRow(rowId);
        console.log(rowId)
    };

    const addTable = () => {
        return(
            <Draggable onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} bounds="parent">
                <div className="absolute">
                    <Image className="cursor-pointer" src={roundTable}/>
                </div>
            </Draggable>
        )
    }
    
    return (
        <Layout w="100vw">
            <div className="flex justify-between relative">
                <div className="w-screen">
                <RoundTableComponent />
                </div>
                <div className=" w-[500px] h-[full] overflow-y-auto">
                    <table className="w-full border-gray-500 border-4">
                        <thead>
                            <tr>
                                <th className="py-2">Name</th>
                                <th className="py-2">Amount</th>
                                <th className="py-2">Category</th>
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