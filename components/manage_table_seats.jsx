import { useContext, useState, useEffect } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style';
import Draggable from 'react-draggable';
import Image from 'next/image';
import roundTable from '../assets/roundTable.png';

export default function ManageTableSeats() {
    const { state, dispatch } = useContext(Context);
    const [selectedRow, setSelectedRow] = useState(null);
    const [guests, setGuests] = useState({guests: [], amount: 0});
    const [isDragging, setIsDragging] = useState(false);

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

    const handleMouseDown = () => {
        event.preventDefault();
        setIsDragging(true);
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
      };


    const handleRowClick = (rowId) => {
        setSelectedRow(rowId);
        console.log(rowId)
    };
    
    return (
        <Layout width="800">
            <div className="flex justify-between relative">
                <div>
                <Draggable onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} bounds="parent">
                    <div className="absolute" >
                                <Image className="cursor-pointer" src={roundTable} alt="table"></Image>
                                
                    </div>
                    </Draggable>
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