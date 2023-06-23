import { useState } from "react";
import  roundTable  from '../assets/roundTable.png';
import Image from 'next/image';
import Draggable from 'react-draggable';
import TableDialog from "./table_dialog";

export default function roundTableComponent (props) {
    const { current_seats, guests_in_table, max_seats, subject, x, y, addGuest, index, guests} = props
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [guestsInTable, setGuests] = useState()

    const handleMouseDown = (event) => {
      event.preventDefault()
      if (event.button === 0) {
        addGuest()
      }
      // if (event.button === 2) {
      //   event.preventDefault()
      //   handleOpenDialog()
      // }
    }

    const handleDoubleClick = () => {
      setGuests(getGuests())
      handleOpenDialog()
    }
    

    const handleOpenDialog = () => setIsDialogOpen(true)
  
    const handleCancelDialog = () => setIsDialogOpen(false)

    const getGuests = () => {
      let guestsInTable = {}
      
      guests_in_table.forEach(guestID => {
          guestsInTable[guestID] = {
            guestName: guests.guests[guestID].name,
            guestAmount: guests.guests[guestID].amount
          }
      })
      return guestsInTable
  }
    
    return (
      <div className="h-full">
        <Draggable onMouseDown={handleMouseDown}  bounds="parent">
            <div onDoubleClick={handleDoubleClick} className="cursor-pointer absolute flex flex-col items-center justify-center font-bold my-1" style={{ left: `${x}px`, top: `${y}px` }}>
                <Image src={roundTable} alt="pic" style={{ width: '100px', height: '100px' }}/>
                <div className="absolute mb-4">
                  {current_seats}/{max_seats}
                </div>
                <div className="absoulute mt-[-10px]">
                {subject}({index})
                </div>
            </div>
        </Draggable>
        {isDialogOpen && <TableDialog guestsInTable = {guestsInTable} onCancel={handleCancelDialog} subject={subject} index={index} />}
      </div>
    )
  }