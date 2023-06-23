import { useRef, useState } from "react";
import  roundTable  from '../assets/roundTable.png';
import Image from 'next/image';
import Draggable from 'react-draggable';

export default function roundTableComponent (props) {
    const { current_seats, guests_in_table, max_seats, subject, x, y, onUpdateCoordinates } = props
    const refImage = useRef(null)
    const divRef = useRef(null)
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x, y });

    const handleMouseDown = (event) => {
      event.preventDefault();
      setDragging(true);
    };
  
    const handleMouseMove = (event, { deltaX, deltaY }) => {
      if (!dragging) return;
    
      const parentRect = divRef.current.parentNode.getBoundingClientRect();
      const offsetX = (deltaX / parentRect.width) * 100;
      const offsetY = (deltaY / parentRect.height) * 100;
    
      let newX = position.x + offsetX;
      let newY = position.y + offsetY;
    
      if (newX < 0) newX = 0;
      if (newX > 100) newX = 100;
      if (newY < 0) newY = 0;
      if (newY > 100) newY = 100;
    
      setPosition({ x: newX, y: newY });
    };
    
  
  
    const handleMouseUp = () => {
      setDragging(false);
      onUpdateCoordinates(position);
      console.log(position);
    };
  
    const containerStyle = {
      left: `${x}%`,
      top: `${y}%`,
    };

    return (
        <Draggable onStart={handleMouseDown} onDrag={handleMouseMove}  onStop={handleMouseUp} bounds="parent"  >
            <div ref={divRef} className="cursor-pointer absolute flex flex-col items-center justify-center font-bold my-1" style={containerStyle}>
                <Image src={roundTable} ref={refImage} alt="pic" style={{ width: '100px', height: '100px' }}/>
                <div className="absolute mb-4">
                  {current_seats}/{max_seats}
                </div>
                <div className="absolute mt-[-10px]">
                {subject}
                </div>
            </div>
          </Draggable>
    )
  }