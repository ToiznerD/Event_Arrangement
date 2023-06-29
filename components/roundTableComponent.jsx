import React, { useRef, useState } from "react";
import roundTable  from '../assets/roundTable.png';
import Image from 'next/image';
import Draggable from 'react-draggable';
import TableDialog from "./table_dialog";

const RoundTableComponent = ({ table, addGuest, index, guests, removeGuest, x, y, onUpdateCoordinates, removeTable }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [guestsInTable, setGuests] = useState()
  const divRef = useRef()
  let dx = 0, dy = 0;

  const handleMouseDown = (event) => {
    event.preventDefault();
    addGuest()
    dx = 0
    dy = 0
  };

  const handleDoubleClick = () => {
    setGuests(getGuests())
    handleOpenDialog()
  }

  const handleOpenDialog = () => setIsDialogOpen(true)
  
  const handleCancelDialog = () => setIsDialogOpen(false)

  const handleMouseMove = (event, { deltaX, deltaY }) => {
    dx += deltaX
    dy += deltaY
  };
  


  const handleMouseUp = () => {
    const parentRect = divRef.current.parentNode.getBoundingClientRect();
    let newX =x + dx;
    let newY =y + dy;

    if (newX < 0) newX = 0;
    if (newX > parentRect.width) newX = parentRect.width;
    if (newY < 0) newY = 0;
    if (newY > parentRect.height) newY = parentRect.height;

    onUpdateCoordinates({ x: (newX / parentRect.width) * 100, y: (newY / parentRect.height) * 100 });
  };

  const getGuests = () => {
    let guestsInTable = {}
    
    table.guests.forEach(guestID => {
        guestsInTable[guestID] = {
          guestName: guests.guests[guestID].name,
          guestAmount: guests.guests[guestID].amount
        }
    })
    return guestsInTable
}

  const handleTouchStart = () => {
    touchTimeoutRef.current = setTimeout(() => {
      // Perform your single tap action
      console.log('Single tap');
    }, 300); // Adjust the duration as per your requirement
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;

      // Perform your double tap action
      console.log('Double tap');
    }
  };

  return (
    <>
    <Draggable onStart={handleMouseDown} onDrag={handleMouseMove} onStop={handleMouseUp} bounds="parent" position={{ x, y }}>
      <div ref={divRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick} className="cursor-pointer absolute flex flex-col items-center justify-center font-bold my-1">
          <Image src={roundTable} alt="pic" style={{ width: '100px', height: '100px' }}/>
          <div className="absolute mb-1">
            {table.current_seats}/{table.max_seats}
          </div>
          <div className="absolute mt-[100px]">
            {table.subject}
          </div>
      </div>
    </Draggable>
      {isDialogOpen && <TableDialog removeTable={removeTable} removeGuest={removeGuest} guestsInTable={guestsInTable} onCancel={handleCancelDialog} subject={table.subject} index={index} />}
      </>
  )
}

export default RoundTableComponent;