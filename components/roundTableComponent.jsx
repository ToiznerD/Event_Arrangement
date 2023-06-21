import { useRef } from "react";
import  roundTable  from '../assets/roundTable.png';
import Image from 'next/image';
import Draggable from 'react-draggable';

export default function roundTableComponent (props) {
    const { current_seats, guests_in_table, max_seats, subject, x, y} = props
    const refImage = useRef(null)
    const divRef = useRef(null)

    const handleMouseDown = (event) => {
      event.preventDefault()
    };


    return (
      <div className="h-full">
        <Draggable ref={divRef} onMouseDown={handleMouseDown} bounds="parent">
            <div className="cursor-pointer absolute flex flex-col items-center justify-center font-bold my-1" style={{ left: `${x}px`, top: `${y}px` }}>
                <Image src={roundTable} ref={refImage} alt="pic" style={{ width: '100px', height: '100px' }}/>
                <div className="absolute mb-4">
                  {current_seats}/{max_seats}
                </div>
                <div className="absoulute mt-[-10px]">
                {subject}
                </div>
            </div>
          </Draggable>
      </div>
    )
  }