import { useRef, useState } from "react";
import  roundTable  from '../assets/roundTable.png';
import Image from 'next/image';
import Draggable from 'react-draggable';

export default function roundTableComponent (props) {
  const { current_seats, guests_in_table, max_seats, subject, x, y, onUpdateCoordinates } = props
  const refImage = useRef(null)
  const divRef = useRef(null)
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: x, y: y });
  let dx = 0, dy = 0;

  const handleMouseDown = (event) => {
    event.preventDefault();
    setDragging(true);
    dx = 0
    dy = 0
  };

  const handleMouseMove = (event, { deltaX, deltaY }) => {
    if (!dragging) return;
    dx += deltaX
    dy += deltaY
  };
  


  const handleMouseUp = () => {
    setDragging(false);
    const parentRect = divRef.current.parentNode.getBoundingClientRect();

    let newX =position.x + dx;
    let newY =position.y + dy;

    if (newX < 0) newX = 0;
    if (newX > parentRect.width) newX = parentRect.width;
    if (newY < 0) newY = 0;
    if (newY > parentRect.height) newY = parentRect.height;
  
    setPosition({ x: newX, y: newY });
    onUpdateCoordinates({ x: (newX/parentRect.width)*100, y: (newY/parentRect.height)*100 });
  };

  const containerStyle = {
    position: 'absolute',
    left: `${x - 50}px`,
    top: `${y - 50}px`,
  };

  return (
    <Draggable onStart={handleMouseDown} onDrag={handleMouseMove} onStop={handleMouseUp} bounds="parent"  >
      <div ref={divRef} className="cursor-pointer absolute flex flex-col items-center justify-center font-bold my-1" style={ containerStyle }>
          <Image src={roundTable} ref={refImage} alt="pic" style={{ width: '100px', height: '100px' }}/>
          <div className="absolute mb-1">
            {current_seats}/{max_seats}
          </div>
          <div className="absolute mt-[100px]">
          {subject}
          </div>
      </div>
    </Draggable>
  )
}